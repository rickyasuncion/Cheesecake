import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "./button";
import { FaHeart } from "react-icons/fa";
import { cn } from "./lib/utils";


const MovieCard = ({ id, media_type, title, name, poster_path, showFavButton = true, className }) => {

  const detailPath = `/details/${media_type}/${id}`;
  const [isFavourite, setIsFavourite] = useState(false);

  useEffect(() => {
    const favourtieMovies = JSON.parse(localStorage.getItem("favouriteMovies"));
    const favouriteTv = JSON.parse(localStorage.getItem("favouriteTv"));

    const isAlreadyFavourite = favourtieMovies?.find(movie_id => movie_id === id) || favouriteTv?.find(tvId => tvId === id)
    if (isAlreadyFavourite) {
      setIsFavourite(true);
    }
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
    <div className="isolate relative max-w-[200px] group">
      <Link to={detailPath} className={className}>
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
