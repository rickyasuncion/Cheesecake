import { Star, X } from "lucide-react";
import React from "react";

const Sidebar = ({ selectedMovie, setShowSimilarPanel, similarMovies }) => {
  similarMovies = similarMovies.slice(0, 10);
  return (
    <>
      <div />
      <div className="w-80 bg-white shadow-xl border-l border-gray-200 p-4 transform transition-transform">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Similar to {selectedMovie}</h3>
          <button
            onClick={() => setShowSimilarPanel(false)}
            className="p-1 hover:bg-gray-100 rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4">
          {similarMovies.map((similarMovie) => (
            <div
              key={similarMovie.id}
              className="flex gap-3 p-2 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <a
                href={`/details/${similarMovie.media_type}/${similarMovie.id}`}
              >
                <img
                  src={`https://image.tmdb.org/t/p/w500${similarMovie.poster_path}`}
                  alt={similarMovie.title || similarMovie.name}
                  className="w-16 h-24 object-cover rounded"
                />
              </a>
              <div className="flex-1">
                <a
                  href={`/details/${similarMovie.media_type}/${similarMovie.id}`}
                  className="font-medium"
                >
                  {similarMovie.title || similarMovie.name}
                </a>
                <p className="text-sm text-gray-500">
                  {new Date(
                    similarMovie.release_date || similarMovie.first_air_date
                  ).getFullYear()}
                </p>
                <div className="flex items-center gap-1 mt-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-sm">
                    {similarMovie.vote_average &&
                      similarMovie.vote_average.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          ))}

          {similarMovies.length === 0 && (
            <p className="text-center text-gray-500 py-4">
              No similar movies found
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
