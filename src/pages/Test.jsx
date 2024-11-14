import React, { useState } from "react";
import { Heart, Trash2, Star, X, ListFilter } from "lucide-react";

const Test = () => {
  const [favorites, setFavorites] = useState([
    {
      id: 1,
      title: "The Shawshank Redemption",
      year: 1994,
      rating: 4.8,
      genre: "Drama",
      imageUrl: "/api/placeholder/300/450",
    },
    {
      id: 2,
      title: "The Godfather",
      year: 1972,
      rating: 4.7,
      genre: "Crime, Drama",
      imageUrl: "/api/placeholder/300/450",
    },
    {
      id: 3,
      title: "Pulp Fiction",
      year: 1994,
      rating: 4.6,
      genre: "Crime, Drama",
      imageUrl: "/api/placeholder/300/450",
    },
    {
      id: 4,
      title: "The Green Mile",
      year: 1999,
      rating: 4.5,
      genre: "Drama",
      imageUrl: "/api/placeholder/300/450",
    },
    {
      id: 5,
      title: "Goodfellas",
      year: 1990,
      rating: 4.6,
      genre: "Crime, Drama",
      imageUrl: "/api/placeholder/300/450",
    },
  ]);

  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showSimilarPanel, setShowSimilarPanel] = useState(false);

  const removeFromFavorites = (id) => {
    setFavorites(favorites.filter((movie) => movie.id !== id));
    if (selectedMovie?.id === id) {
      setSelectedMovie(null);
      setShowSimilarPanel(false);
    }
  };

  const getSimilarMovies = (selectedMovie) => {
    return favorites.filter(
      (movie) =>
        movie.id !== selectedMovie.id &&
        movie.genre
          .split(", ")
          .some((genre) => selectedMovie.genre.includes(genre))
    );
  };

  const handleShowSimilar = (movie) => {
    setSelectedMovie(movie);
    setShowSimilarPanel(true);
  };

  return (
    <div className="flex justify-evenly">
      <div>
        <div className="p-6 max-w-6xl">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2">
              <Heart className="w-6 h-6 text-red-500" />
              <h1 className="text-3xl font-bold">My Favorites Movies</h1>
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
                    onClick={() => removeFromFavorites(movie.id)}
                    className="absolute top-2 right-2 p-2 bg-red-500 hover:bg-red-600 text-white rounded-full transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h2 className="text-xl font-semibold">{movie.title}</h2>
                    <span className="text-sm text-gray-500">
                      ({movie.year})
                    </span>
                  </div>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm text-gray-500">{movie.genre}</span>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium">
                        {movie.rating}
                      </span>
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
        <div className="p-6 max-w-6xl">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2">
              <Heart className="w-6 h-6 text-red-500" />
              <h1 className="text-3xl font-bold">My Favorites Shows</h1>
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
                    onClick={() => removeFromFavorites(movie.id)}
                    className="absolute top-2 right-2 p-2 bg-red-500 hover:bg-red-600 text-white rounded-full transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h2 className="text-xl font-semibold">{movie.title}</h2>
                    <span className="text-sm text-gray-500">
                      ({movie.year})
                    </span>
                  </div>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm text-gray-500">{movie.genre}</span>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium">
                        {movie.rating}
                      </span>
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
      </div>

      {/* Similar Movies Side Panel */}
      {showSimilarPanel && selectedMovie && (
        <>
          <div />
          <div className="fixed inset-y-40 right-56 w-80 bg-white shadow-xl border-l border-gray-200 p-4 transform transition-transform">
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
                    <p className="text-sm text-gray-500">
                      {similarMovie.genre}
                    </p>
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
      )}
    </div>
  );
};

export default Test;
