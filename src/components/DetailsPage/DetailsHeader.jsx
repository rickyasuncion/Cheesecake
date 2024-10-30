import React, { useEffect, useRef } from "react";
import { BsPauseFill } from "react-icons/bs";
import { BiPlay } from "react-icons/bi";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";

const DetailsHeader = ({
  movie,
  trailerVideo,
  setTrailerVideo,
  isFree,
  englishHomepage,
}) => {
  const videoRef = useRef(null);
  const [showTrailer, setShowTrailer] = React.useState(false);
  const [isPlaying, setIsPlaying] = React.useState(false);

  const handleVisitWebsite = () => {
    if (englishHomepage) {
      window.open(englishHomepage, "_blank");
    }
  };

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
    <div className="relative">
      {isFree && (
        <div className="absolute top-4 left-4 bg-red-600 text-white px-4 py-2 rounded">
          Free
        </div>
      )}
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
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
        ></iframe>
      )}
      <div className="p-4 flex gap-4 items-center justify-end">
        <button
          onClick={handlePlayPause}
          className="hover:border-neutral-300 hover:text-neutral-300 border-2 border-border rounded-full p-2 text-2xl m-0"
        >
          {isPlaying ? <BsPauseFill /> : <BiPlay />}
        </button>
        {englishHomepage ? (
          <Button
            className="rounded-full h-auto px-6 m-0 flex gap-1 items-center text-base"
            onClick={handleVisitWebsite}
          >
            Visit Website <ArrowRight className="size-5" />
          </Button>
        ) : (
          <Button
            className="rounded-full h-auto px-6 m-0 flex gap-1 items-center text-base"
            disabled
          >
            No official website available
          </Button>
        )}
      </div>
    </div>
  );
};

export default DetailsHeader;
