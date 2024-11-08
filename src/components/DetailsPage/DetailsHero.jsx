import React, { useEffect, useRef } from "react";
import { BsPauseFill } from "react-icons/bs";
import { BiPlay } from "react-icons/bi";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";

const DetailsHero = ({ trailerVideo, setTrailerVideo, isFree, englishHomepage }) => {
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
    <>
      {/* Hero Section */}
      <div className="relative h-[600px] overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent" />
          <img
            src="/api/placeholder/1920/1080"
            alt="Movie hero"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content */}
        <div className="relative h-full container mx-auto px-6 flex items-end pb-16">
          <div className="max-w-3xl">
            <h1 className="text-6xl font-bold mb-4">{movieData.title}</h1>
            <p className="text-2xl text-gray-300 mb-6">{movieData.tagline}</p>
            <div className="flex items-center gap-6">
              <button className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-8 py-3 rounded-full font-semibold transition-colors">
                <Play size={20} />
                Watch Now
              </button>
              <div className="flex items-center gap-2">
                <Star className="text-yellow-400" fill="currentColor" />
                <span className="text-xl font-semibold">
                  {movieData.rating}
                </span>
                <span className="text-gray-400">/10</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailsHero;
