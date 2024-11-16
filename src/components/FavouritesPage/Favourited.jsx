import { Heart, ListFilter, Star, Trash2 } from "lucide-react";
import React from "react";

const Favourited = ({ title, favorites, handleShowSimilar }) => {
  return (
    <div className="p-6 max-w-6xl">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-2">
          <Heart className="w-6 h-6 text-red-500" />
          <h1 className="text-3xl font-bold">My Favorites {title}</h1>
        </div>
        <span className="text-gray-500">{favorites.length} movies</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {favorites.map((movie) => (
          <div
            key={movie.id}
            className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200"
          >
            <div className="relative">
              <img
                src={movie.imageUrl}
                alt={movie.title}
                className="w-full h-64 object-cover"
              />
              <button
                onClick={() => console.log("remove from firestore")}
                className="absolute top-2 right-2 p-2 bg-red-500 hover:bg-red-600 text-white rounded-full transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
            <div className="p-4">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-xl font-semibold">{movie.title}</h2>
                <span className="text-sm text-gray-500">({movie.year})</span>
              </div>
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm text-gray-500">{movie.genre}</span>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-sm font-medium">{movie.rating}</span>
                </div>
              </div>
              <button
                onClick={() => handleShowSimilar(movie)}
                className="w-full py-2 bg-blue-500 hover:bg-blue-600 text-white rounded flex items-center justify-center gap-2 transition-colors"
              >
                <ListFilter className="w-4 h-4" />
                View Similar
              </button>
            </div>
          </div>
        ))}
      </div>

      {favorites.length === 0 && (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-500">No favorite movies yet</p>
        </div>
      )}
    </div>
  );
};

export default Favourited;
