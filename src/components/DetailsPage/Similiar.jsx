import React from "react";

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
  };

const Similiar = ({ similarMovies }) => {
  similarMovies = similarMovies.splice(0, 5);

  return (
    <div className="mt-16">
      <h2 className="text-2xl font-semibold mb-6">Similar Movies</h2>
      <div className="grid grid-cols-5 gap-6">
        {similarMovies.map((movie, index) => (
          <div key={index} className="space-y-2">
            <div className="aspect-[2/3] bg-gray-800 rounded-lg overflow-hidden">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="font-medium">{movie.title}</h3>
            <p className="text-sm text-gray-400">{GENRES[movie.genre_ids[0]]}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Similiar;
