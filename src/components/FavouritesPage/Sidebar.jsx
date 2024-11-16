import { Star, X } from "lucide-react";
import React from "react";

const Sidebar = ({selectedMovie, setShowSimilarPanel, getSimilarMovies}) => {
  return (
    <>
      <div />
      <div className="w-80 bg-white shadow-xl border-l border-gray-200 p-4 transform transition-transform">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">
            Similar to {selectedMovie.title}
          </h3>
          <button
            onClick={() => setShowSimilarPanel(false)}
            className="p-1 hover:bg-gray-100 rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4">
          {getSimilarMovies(selectedMovie).map((similarMovie) => (
            <div
              key={similarMovie.id}
              className="flex gap-3 p-2 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <img
                src={similarMovie.imageUrl}
                alt={similarMovie.title}
                className="w-16 h-24 object-cover rounded"
              />
              <div className="flex-1">
                <h4 className="font-medium">{similarMovie.title}</h4>
                <p className="text-sm text-gray-500">{similarMovie.year}</p>
                <p className="text-sm text-gray-500">{similarMovie.genre}</p>
                <div className="flex items-center gap-1 mt-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-sm">{similarMovie.rating}</span>
                </div>
              </div>
            </div>
          ))}

          {getSimilarMovies(selectedMovie).length === 0 && (
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
