import React, { useEffect, useState } from "react";

const Action = () => {
  const [actionMovies, setActionMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortOption, setSortOption] = useState("popularity.desc");

  // Fetch action movies with selected sorting
  const fetchActionMovies = async (sortBy = "popularity.desc") => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=bbd89781c7835917a2decb4989b56470&with_genres=28&sort_by=${sortBy}`
      );
      const data = await response.json();
      setActionMovies(data.results);
    } catch (error) {
      console.error("Error fetching action movies:", error);
    }
    setIsLoading(false);
  };

  // Update movies whenever sort option changes
  useEffect(() => {
    fetchActionMovies(sortOption);
  }, [sortOption]);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header section with background */}
      <div className="relative bg-black text-white overflow-hidden rounded-lg mt-3">
        <img
          src="path/to/action-background.jpg" // Replace with the path to your background image
          alt="Action background"
          className="absolute w-full h-full object-cover opacity-30"
        />
        <div className="relative py-24 text-center space-y-4">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-yellow-400 to-red-500 text-transparent bg-clip-text">
            Action Movies
          </h1>
          <p className="max-w-md mx-auto text-lg">
            Discover thrilling action movies that keep you on the edge of your seat!
          </p>
        </div>
      </div>

      {/* Filter dropdown */}
      <div className="flex justify-end space-x-4 my-4 p-6">
        <select
          className="bg-gray-700 text-white p-2 rounded"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="popularity.desc">Most Popular</option>
          <option value="release_date.desc">Newest Releases</option>
          <option value="vote_average.desc">Highest Rated</option>
        </select>
        <button
          onClick={() => fetchActionMovies(sortOption)}
          className="bg-yellow-400 text-black px-4 py-2 rounded"
        >
          Apply Filters
        </button>
      </div>

      {/* Movie cards section */}
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="loader">Loading...</div> {/* Replace with a spinner component */}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
          {actionMovies.map((movie) => (
            <div key={movie.id} className="bg-gray-800 rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="w-full h-64 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold text-yellow-400">{movie.title}</h2>
                <p className="text-sm text-gray-400">{movie.release_date}</p>
                <span className={`px-2 py-1 rounded-full text-white ${movie.vote_average >= 7 ? 'bg-green-500' : 'bg-red-500'}`}>
                  ⭐ {movie.vote_average}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Back to Top button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-4 right-4 bg-yellow-400 text-black px-4 py-2 rounded-full shadow-lg"
      >
        ↑ Top
      </button>
    </div>
  );
};

export default Action;
