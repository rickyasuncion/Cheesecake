import React from "react";
import { MovieCard } from "../ui/MovieCard";

const Recommended = ({ recommendedMovies, type }) => {
  return (
    <div className="mt-4">
      <h3 className="text-lg font-bold mb-2">Recommended Movies</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {recommendedMovies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} type={type} />
        ))}
      </div>
    </div>
  );
};

export default Recommended;
