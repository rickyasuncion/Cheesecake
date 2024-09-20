import React, { useEffect, useState } from "react";
import { fetchData, filterResults } from "../../_utils/utils";
import SearchCardMovie from "./SearchCardMovie";

const SearchItems = ({ searchTerm }) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const fetchedMovies = await fetchData(
        `https://api.themoviedb.org/3/search/multi?query=${searchTerm}&include_adult=false&language=en-US&page=1&api_key=bbd89781c7835917a2decb4989b56470`
      );
      setMovies(filterResults(fetchedMovies));
    };

    fetchMovies();
  }, [searchTerm]);

  return (
    <div className="p-4">
      {movies.length === 0 || searchTerm === undefined ? (
        <p className="text-center text-lg font-semibold text-gray-600">
          No results found.
        </p>
      ) : (
        <div className="flex flex-col items-center">
          <h2 className="text-xl font-bold mb-2">
            Search results for: "
            <span className="text-blue-500">{searchTerm}</span>"
          </h2>
          <div className="flex space-x-4 mb-4">
            <button className="bg-white border border-gray-300 text-md text-gray-700 hover:bg-blue-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded px-3 py-2 transition duration-200">
              Movies
            </button>
            <button className="bg-white border border-gray-300 text-md text-gray-700 hover:bg-blue-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded px-3 py-2 transition duration-200">
              TV Shows
            </button>
          </div>
          {movies.map((movie) => (
            <SearchCardMovie
              key={movie.id}
              id={movie.id}
              media_type={movie.media_type}
              title={movie.title}
              name={movie.name}
              poster_path={movie.poster_path}
              release_date={movie.release_date}
              first_air_date={movie.first_air_date}
              description={movie.overview}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchItems;
