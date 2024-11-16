import React, { useEffect, useState } from "react";
import { fetchData } from "../../_utils/utils";
import { ListFilter, Star, Trash2 } from "lucide-react";
import { deleteUserFavourite } from "../../_utils/firestore";

const GENRES = {
  28: "Action",
  12: "Adventure",
  16: "Animation",
  35: "Comedy",
  80: "Crime",
  99: "Documentary",
  18: "Drama",
  10751: "Family",
  14: "Fantasy",
  36: "History",
  27: "Horror",
  10402: "Music",
  9648: "Mystery",
  10749: "Romance",
  878: "Science Fiction",
  10770: "TV Movie",
  53: "Thriller",
  10752: "War",
  37: "Western",
  10759: "Action & Adventure",
  10762: "Kids",
  10763: "News",
  10764: "Reality",
  10765: "Sci-Fi & Fantasy",
  10766: "Soap",
  10767: "Talk",
  10768: "War & Politics",
};

const Card = ({ type, id, handleShowSimilar }) => {
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    const getData = async () => {
      let data = await fetchData(
        `https://api.themoviedb.org/3/${type}/${id}?api_key=bbd89781c7835917a2decb4989b56470&language=en-US`
      );
      setMovie(data);
    };

    getData();
  }, [type, id]);

  if (!movie) {
    <div>Loading...</div>;
  }

  return (
    <div
      key={id}
      className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200"
    >
      <div className="relative">
        <a href={`/details/${type}/${movie.id}`}>
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
            alt={movie.title}
            className="w-full h-64 object-cover"
          />
        </a>
        <button
          onClick={() => deleteUserFavourite({ type: type, id: id })}
          className="absolute top-2 right-2 p-2 bg-red-500 hover:bg-red-600 text-white rounded-full transition-colors"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
      <div className="p-4">
        <div className="flex justify-between items-center mb-2">
          <a
            href={`/details/${type}/${movie.id}`}
            className="text-xl font-semibold"
          >
            {movie.title || movie.name}
          </a>
          <p className="text-sm text-gray-500">
            (
            {new Date(movie.release_date || movie.first_air_date).getFullYear()}
            )
          </p>
        </div>
        <div className="flex justify-between items-center mb-3">
          <span className="text-sm text-gray-500">
            {movie.genres && GENRES[movie.genres[0].id]}
          </span>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="text-sm font-medium">
              {movie.vote_average && movie.vote_average.toFixed(2)}
            </span>
          </div>
        </div>
        <button
          onClick={() =>
            handleShowSimilar({
              title: movie.title || movie.name,
              type: type,
              id: id,
            })
          }
          className="w-full py-2 bg-blue-500 hover:bg-blue-600 text-white rounded flex items-center justify-center gap-2 transition-colors"
        >
          <ListFilter className="w-4 h-4" />
          View Similar
        </button>
      </div>
    </div>
  );
};

export default Card;
