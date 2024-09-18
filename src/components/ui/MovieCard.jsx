import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "./button";
import { FaHeart } from "react-icons/fa";

const MovieCard = ({ id, imageUrl, media_type, title, name, poster_path }) => {

  const detailPath = `/details/${media_type}/${id}`;
  const [isFavourite, setIsFavourite] = useState(false);

  useEffect(() => {
    const favourtieMovies = JSON.parse(localStorage.getItem("favourites"));
    const isMovieAlreadyFavourite = favourtieMovies?.find(movie_id => movie_id === id)
    if (isMovieAlreadyFavourite) {
      setIsFavourite(true);
    }
  }, [])


  function addToFavourites(movieId) {
    const favourtieMovies = JSON.parse(localStorage.getItem("favourites"));
    if (isFavourite) {
      alert('Movie is already in favourites')
      return;
    }

    setIsFavourite(true)
    if (favourtieMovies) {
      localStorage.setItem('favourites', JSON.stringify([...favourtieMovies, movieId]));
    }
    else {
      localStorage.setItem('favourites', JSON.stringify([movieId]));
    }
  }

  return (
    <div className="isolate relative movie-card">
      <Link to={detailPath} key={id} className="space-y-2">
        <img
          src={imageUrl || `https://image.tmdb.org/t/p/w500/${poster_path}`}
          alt={media_type === "movie" ? title : name}
        />
      </Link>
      <h3>{media_type === "movie" ? title : name}</h3>
      <Button onClick={() => addToFavourites(id)} className={`z-10 absolute top-2 right-2 p-1 h-fit  shadow shadow-black text-red-900 ${isFavourite ? 'bg-green-600' : 'bg-red-400'}`}><FaHeart /></Button>
    </div>

  );
};

export { MovieCard };
