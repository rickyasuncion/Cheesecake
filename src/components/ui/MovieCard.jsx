import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "./button";
import { FaHeart } from "react-icons/fa";
import { cn } from "./lib/utils";


const MovieCard = ({ id, media_type, title, name, poster_path, showFavButton = true, className }) => {

  const videoRef = useRef();
  const containerRef = useRef();

  const detailPath = `/details/${media_type}/${id}`;
  const [isFavourite, setIsFavourite] = useState(false);
  const [trailerPath, setTrailerPath] = useState(null);

  async function getTrailer(movieId) {
    const res = await fetch(
      `https://api.themoviedb.org/3/${media_type}/${movieId}/videos?api_key=bbd89781c7835917a2decb4989b56470&language=en-US`
    );
    const data = await res.json();


    const trailerPathFound = data.results.find(
      (video) => video.site === "YouTube" && video.type === "Trailer"
    )


    setTrailerPath(
      trailerPathFound
    );
  }

  useEffect(() => {
    function handleVideoPause() {
      videoRef.current?.contentWindow.postMessage(
        `{"event":"command","func":"pauseVideo","args":""}`,
        "*"
      );
    }

    function handleVideoPlay() {
      videoRef.current?.contentWindow.postMessage(
        `{"event":"command","func":"playVideo","args":""}`,
        "*"
      );
    }

    containerRef.current?.addEventListener('mouseleave', handleVideoPause)
    containerRef.current?.addEventListener('focusout', handleVideoPause)

    containerRef.current?.addEventListener('mouseenter', handleVideoPlay)
    containerRef.current?.addEventListener('focusin', handleVideoPlay)


    return () => {
      containerRef.current?.removeEventListener('mouseleave', handleVideoPause)
      containerRef.current?.removeEventListener('mouseenter', handleVideoPlay)
      containerRef.current?.removeEventListener('focusin', handleVideoPlay)
      containerRef.current?.removeEventListener('focusout', handleVideoPause)
    }



  }, [])






  useEffect(() => {
    const favourtieMovies = JSON.parse(localStorage.getItem("favouriteMovies"));
    const favouriteTv = JSON.parse(localStorage.getItem("favouriteTv"));

    const isAlreadyFavourite = favourtieMovies?.find(movie_id => movie_id === id) || favouriteTv?.find(tvId => tvId === id)
    if (isAlreadyFavourite) {
      setIsFavourite(true);
    }

    getTrailer(id);
  }, [id])


  function addToFavourites(contentId) {
    const favouriteMovies = JSON.parse(localStorage.getItem("favouriteMovies"));
    const favouriteTv = JSON.parse(localStorage.getItem("favouriteTv"));
    if (isFavourite) {
      alert('Movie/tv show is already in favourites')
      return;
    }

    setIsFavourite(true)

    if (media_type === 'movie') {
      if (favouriteMovies) {
        localStorage.setItem('favouriteMovies', JSON.stringify([...favouriteMovies, contentId]));
      }
      else {
        localStorage.setItem('favouriteMovies', JSON.stringify([contentId]));
      }
    }
    else if (media_type === 'tv') {
      if (favouriteTv) {
        localStorage.setItem('favouriteTv', JSON.stringify([...favouriteTv, contentId]));
      }
      else {
        localStorage.setItem('favouriteTv', JSON.stringify([contentId]));
      }

    }
  }

  return (
    <div className={` relative max-w-[200px] group ${cn(className)}`} ref={containerRef}>


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

      <Link to={detailPath}>
        <div className="rounded-md overflow-hidden">
          <img
            src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
            alt={media_type === "movie" ? title : name}
            className="group-hover:scale-110 transition-transform duration-200"
          />

        </div>
        <h3 className="font-medium  text-sm">{title || name}</h3>
      </Link>

      {showFavButton &&
        <Button onClick={() => addToFavourites(id)} className={`z-30 absolute top-2 right-2 p-1 h-fit  shadow shadow-black text-red-900 ${isFavourite ? 'bg-green-600' : 'bg-red-400'}`}><FaHeart /></Button>
      }
    </div>

  );
};

export { MovieCard };
