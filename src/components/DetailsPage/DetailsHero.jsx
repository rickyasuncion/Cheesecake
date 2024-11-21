import { Heart, Play, Star } from "lucide-react";
import React, { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";

const DetailsHero = ({ movie, trailerVideo }) => {
  const { t } = useTranslation();
  const videoRef = useRef(null);
  const [showTrailer, setShowTrailer] = React.useState(false);
  const [isPlaying, setIsPlaying] = React.useState(false);

  useEffect(() => {
    if (showTrailer && trailerVideo && videoRef.current) {
      videoRef.current.src = `https://www.youtube.com/embed/${trailerVideo.key}?enablejsapi=1&modestbranding=1&controls=1&showinfo=0&rel=0&autoplay=1`;
    }
  }, [showTrailer, trailerVideo]);

  const handlePlayPause = (event) => {
    event.preventDefault();
    if (!showTrailer) {
      setShowTrailer(true);
      setIsPlaying(true);
    } else {
      if (videoRef.current && videoRef.current.contentWindow) {
        const action = isPlaying ? "pauseVideo" : "playVideo";
        videoRef.current.contentWindow.postMessage(
          `{"event":"command","func":"${action}","args":""}`,
          "*"
        );
        setIsPlaying(!isPlaying);
      } else {
        console.error("Video reference is null or contentWindow is undefined");
      }
    }
  };

  return (
    <>
      <div className="relative h-[600px] overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent" />
          {!showTrailer && (
            <img
              src={`https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`}
              alt={movie.title}
              className="w-full rounded-md mb-4"
            />
          )}
          {showTrailer && trailerVideo && (
            <iframe
              ref={videoRef}
              width="100%"
              height="500px"
              title="Movie Trailer"
              style={{ border: "none", position: "relative", zIndex: 1 }}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
            ></iframe>
          )}
        </div>

        {/* Content */}
        <div
          className={`relative h-full container mx-auto px-6 flex items-end pb-16 transition-transform duration-500 ${
            showTrailer ? "translate-y-8 opacity-90 backdrop-blur-sm" : ""
          }`}
        >
          <div className="max-w-3xl">
            <h1 className="text-6xl font-bold mb-4">
              {movie.title || movie.name}
            </h1>
            <p className="text-2xl text-gray-300 mb-6">{movie.tagline}</p>
            <div className="flex items-center gap-6">
              <button
                onClick={handlePlayPause}
                className="flex items-center gap-2 bg-yellow-600 hover:bg-yellow-700 px-8 py-3 rounded-full font-semibold transition-colors"
              >
                <Play size={20} />
                {isPlaying ? "Pause" : t("Watch Trailer")}
              </button>
              <div className="flex items-center gap-2">
                <Star className="text-yellow-400" fill="currentColor" />
                <span className="text-xl font-semibold">
                  {movie.vote_average && movie.vote_average.toFixed(2)}
                </span>
                <span className="text-gray-400">/10</span>
                <button>
                  <Heart />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailsHero;
