import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "./button";
import { FaHeart } from "react-icons/fa";
import { cn } from "./lib/utils";
import { useMovieTrailerContext } from "../../providers/MovieTrailerProvider";

const MovieCard = ({ id, media_type, title, name, poster_path, showFavButton = true, className }) => {
  const videoRef = useRef();
  const containerRef = useRef();
  const detailPath = `/details/${media_type}/${id}`;
  const [isFavourite, setIsFavourite] = useState(false);
  const [trailerPath, setTrailerPath] = useState(null);
  const { shouldPlayTrailer } = useMovieTrailerContext();

  async function getTrailer(movieId) {
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/${media_type}/${movieId}/videos?api_key=bbd89781c7835917a2decb4989b56470&language=en-US`
      );
      const data = await res.json();

      if (data.results) {
        const trailerPathFound = data.results.find(
          (video) => video.site === "YouTube" && video.type === "Trailer"
        );
        setTrailerPath(trailerPathFound || null);
      } else {
        setTrailerPath(null);
      }
    } catch (error) {
      console.error("Error fetching trailer:", error);
      setTrailerPath(null);
    }
  }

  useEffect(() => {
    const favouriteMovies = JSON.parse(localStorage.getItem("favouriteMovies")) || [];
    const favouriteTv = JSON.parse(localStorage.getItem("favouriteTv")) || [];

    const isAlreadyFavourite = favouriteMovies.includes(id) || favouriteTv.includes(id);
    if (isAlreadyFavourite) {
      setIsFavourite(true);
    }

    getTrailer(id);

    const handleVideoPause = () => {
      videoRef.current?.contentWindow.postMessage(
        `{"event":"command","func":"pauseVideo","args":""}`,
        "*"
      );
    };

    const handleVideoPlay = () => {
      videoRef.current?.contentWindow.postMessage(
        `{"event":"command","func":"playVideo","args":""}`,
        "*"
      );
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mouseleave', handleVideoPause);
      container.addEventListener('focusout', handleVideoPause);
      container.addEventListener('mouseenter', handleVideoPlay);
      container.addEventListener('focusin', handleVideoPlay);
    }

    return () => {
      if (container) {
        container.removeEventListener('mouseleave', handleVideoPause);
        container.removeEventListener('mouseenter', handleVideoPlay);
        container.removeEventListener('focusin', handleVideoPlay);
        container.removeEventListener('focusout', handleVideoPause);
      }
      if (shouldPlayTrailer) {
        getTrailer(id);
      }
    };
  }, [id, shouldPlayTrailer]);

  useEffect(() => {
    if (shouldPlayTrailer) {
      getTrailer(id);
    }
  }, [shouldPlayTrailer]);

  function addToFavourites(contentId) {
    const favouriteMovies = JSON.parse(localStorage.getItem("favouriteMovies")) || [];
    const favouriteTv = JSON.parse(localStorage.getItem("favouriteTv")) || [];

    if (isFavourite) {
      alert('Movie/TV show is already in favourites');
      return;
    }

    setIsFavourite(true);

    if (media_type === 'movie') {
      localStorage.setItem('favouriteMovies', JSON.stringify([...favouriteMovies, contentId]));
    } else if (media_type === 'tv') {
      localStorage.setItem('favouriteTv', JSON.stringify([...favouriteTv, contentId]));
    }
  }

  return (
    <div className={`relative max-w-[200px] group ${cn(className)}`} ref={containerRef}>
      {shouldPlayTrailer &&
        <div className="absolute border-8 border-black shadow-lg order hidden group-hover:block group-focus-within:block h-52 aspect-video -left-1/2 top-1/2 -translate-y-1/2 bg-green-200 z-40">

          {trailerPath ?
            <iframe
              ref={videoRef}
              src={`https://www.youtube.com/embed/${trailerPath.key}?enablejsapi=1&modestbranding=1&controls=1&showinfo=0&rel=0&autoplay=1`}
              className="w-full h-full"
              title="Movie Trailer"
              allow="accelerometer;clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
            ></iframe> : <span className="text-black">No Trailer found</span>
          }
        </div>

      }


      <Link to={detailPath}>
        <div className="rounded-md overflow-hidden">
          {poster_path && (
            <img
              src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
              alt={media_type === "movie" ? title : name}
              className="group-hover:scale-110 transition-transform duration-200"
            />
          )}
        </div>
        <h3 className="font-medium text-sm">{title || name}</h3>
      </Link>

      {showFavButton && (
        <Button
          onClick={() => addToFavourites(id)}
          className={`z-30 absolute top-2 right-2 p-1 h-fit shadow shadow-black text-red-900 ${isFavourite ? 'bg-green-600' : 'bg-red-400'}`}
        >
          <FaHeart />
        </Button>
      )}
    </div>
  );
};

export { MovieCard };
