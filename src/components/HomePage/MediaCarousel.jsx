import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";

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
  10768: "War & Politics"
};

const MediaCarousel = ({ movies, text, type }) => {
  const navigate = useNavigate();
  movies = movies.slice(0,18)
  const moviesPerPage = 6;

  const [currentMovieIndex, setCurrentMovieIndex] = useState(0);

  const nextMovies = () => {
    setCurrentMovieIndex((prev) =>
      prev >= movies.length - moviesPerPage ? 0 : prev + moviesPerPage
    );
  };

  const prevMovies = () => {
    setCurrentMovieIndex((prev) =>
      prev === 0 ? movies.length - moviesPerPage : prev - moviesPerPage
    );
  };

  const visibleMovies = movies.slice(
    currentMovieIndex,
    currentMovieIndex + moviesPerPage
  );

  return (
    <>
      <div className="flex justify-between items-center my-4">
        <h2 className="text-2xl text-gray-400">{text}</h2>
        <div className="flex space-x-2">
          <button
            onClick={prevMovies}
            className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={nextMovies}
            className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      <div className="relative overflow-hidden">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {visibleMovies.map((movie) => {
            const genre = movie.genre_ids && movie.genre_ids.length ? GENRES[movie.genre_ids[0]] : "Unknown Genre";

            return (
              <div
                key={movie.id}
                className="rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-md transition transform hover:scale-105 duration-300"
              >
                {" "}
                <div className="relative group">
                  {" "}
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title ? movie.title : movie.name}
                    className="w-full h-auto"
                  />{" "}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-4">
                    {" "}
                    <button onClick={()=> navigate(`/details/${type}/${movie.id}`)} className="bg-white text-black px-4 py-2 rounded-full transform -translate-y-2 group-hover:translate-y-0 transition-transform">
                      {" "}
                      View Details{" "}
                    </button>{" "}
                    <button onClick={()=> console.log("add to fav")} className="bg-white text-black px-4 py-2 rounded-full transform -translate-y-2 group-hover:translate-y-0 transition-transform">
                      {" "}
                      Add to Favourites{" "}
                    </button>{" "}
                  </div>{" "}
                </div>{" "}
                <div className="p-3">
                  {" "}
                  <h3 className="font-semibold text-gray-800">
                  {movie.title ? movie.title : movie.name}
                  </h3>{" "}
                  <p className="text-sm text-gray-400">{genre}</p>{" "}
                </div>{" "}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default MediaCarousel;
