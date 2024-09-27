import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { RiHeartFill } from "react-icons/ri";
import { Separator } from "../ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { BiPlay } from "react-icons/bi";
import { BsPauseFill } from "react-icons/bs";

const MovieDetails = ({ id }) => {
  const videoRef = useRef(null);
  const [movie, setMovie] = useState(null);
  const [trailerVideo, setTrailerVideo] = useState(null);
  const { t, i18n } = useTranslation();
  const [isPlaying, setIsPlaying] = useState(false);
  const [showTrailer, setShowTrailer] = useState(false);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=bbd89781c7835917a2decb4989b56470&language=${i18n.language}`
        );
        const data = await response.json();
        setMovie(data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    const fetchMovieVideos = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}/videos?api_key=bbd89781c7835917a2decb4989b56470&language=${i18n.language}`
        );
        const data = await response.json();

        if (data.results.length === 0 && i18n.language !== 'en-US') {
          const fallbackResponse = await fetch(
            `https://api.themoviedb.org/3/movie/${id}/videos?api_key=bbd89781c7835917a2decb4989b56470&language=en-US`
          );
          const fallbackData = await fallbackResponse.json();
          setTrailerVideo(fallbackData.results.find(video => video.site === 'YouTube' && video.type === 'Trailer'));
        } else {
          setTrailerVideo(data.results.find(video => video.site === 'YouTube' && video.type === 'Trailer'));
        }
      } catch (error) {
        console.error("Error fetching movie videos:", error);
      }
    };

    fetchMovieDetails();
    fetchMovieVideos();
  }, [id, i18n.language]);

  useEffect(() => {
    if (showTrailer && trailerVideo && videoRef.current) {
      videoRef.current.src = `https://www.youtube.com/embed/${trailerVideo.key}?enablejsapi=1&modestbranding=1&controls=1&showinfo=0&rel=0&autoplay=1`;
    }
  }, [showTrailer, trailerVideo]);

  const handlePlayPause = (event) => {
    event.preventDefault(); // Prevent default action

    if (!showTrailer) {
      setShowTrailer(true); // Show the trailer
      setIsPlaying(true);
    } else {
      if (videoRef.current && videoRef.current.contentWindow) {
        const action = isPlaying ? 'pauseVideo' : 'playVideo';
        videoRef.current.contentWindow.postMessage(
          `{"event":"command","func":"${action}","args":""}`,
          '*'
        );
        setIsPlaying(!isPlaying);
      } else {
        console.error("Video reference is null or contentWindow is undefined");
      }
    }
  };

  if (!movie) {
    return <div className="min-h-screen flex items-center justify-center text-white">{t('Loading...')}</div>;
  }

  return (
    <div className="mx-auto bg-zinc-900 text-secondary">
      <div className="relative container p-0 overflow-hidden border border-zinc-700 rounded-md">
        <div className="relative">
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
              height="500px" // Adjust this to match your layout needs
              title="Movie Trailer"
              style={{ 
                border: 'none', 
                position: 'relative', 
                zIndex: 1,
              }}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
            ></iframe>
          )}
        </div>

        <div 
          className="p-4 flex gap-4 items-center" 
          style={{ zIndex: 2, justifyContent: "flex-start" }}
        >
              <Button className="rounded-full h-auto px-6 m-0 flex gap-1 items-center text-base" asChild>

                <Link to={movie.homepage} target="__blank">
                  {t('Visit Website')} <ArrowRight className="size-5" />
                </Link>

              </Button>
        
              <TooltipProvider delayDuration={100}>
            <Tooltip>
              <TooltipTrigger asChild>
                <button className="hover:border-neutral-300 hover:text-neutral-300 border-2 border-border rounded-full p-2 text-2xl m-0">
                  <RiHeartFill />
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{t('Add to favourites')}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <button
            onClick={handlePlayPause}
            className="hover:border-neutral-300 hover:text-neutral-300 border-2 border-border rounded-full p-2 text-2xl m-0"
          >
            {isPlaying ? <BsPauseFill /> : <BiPlay />}
          </button>
        </div>
        
        <h2 className="text-xl italic mb-4">{movie.tagline}</h2>
        <p className="mb-4">{movie.overview}</p>
        <div className="mb-4">
          <p>
            <strong>{t('Release Date')}</strong> {new Date(movie.release_date).toLocaleDateString()}
          </p>
          <p>
            <strong>{t('Runtime')}</strong> {movie.runtime} {t('minutes')}
          </p>
          <p>
            <strong>{t('Genres')}</strong> 
          </p>
          <p>
            <strong>{t('Budget')}</strong> ${movie.budget.toLocaleString()}
          </p>
          <p>
            <strong>{t('Revenue')}</strong> ${movie.revenue.toLocaleString()}
          </p>
          <p>
            <strong>{t('Vote Average')}</strong> {movie.vote_average} ({movie.vote_count} {t('votes')})
          </p>
        </div>
        {/* <a
          href={movie.homepage}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 underline mt-4 inline-block"
        >
          {t('Visit Official Homepage')}
        </a> */}
      </div>
    </div>
  );
};

export default MovieDetails;
