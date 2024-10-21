import React, { useEffect, useState } from "react";
import { fetchData, filterResults } from "../../_utils/utils";
import SearchCardMovie from "./SearchMovieCard";
import { useTranslation } from "react-i18next";

const SearchItems = ({ searchTerm }) => {
  const [movies, setMovies] = useState([]);
  const [filter, setFilter] = useState("all");
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const fetchMovies = async () => {
      const fetchedMovies = await fetchData(
        `https://api.themoviedb.org/3/search/multi?query=${searchTerm}&include_adult=false&language=${i18n.language}&page=1&api_key=bbd89781c7835917a2decb4989b56470`
      );
      setMovies(filterResults(fetchedMovies));
    };

    fetchMovies();
  }, [searchTerm]);

  const handleFilterChange = (type) => {
    setFilter(type);
  };

  const filteredMovies = movies.filter((movie) =>
    filter === "all" ? true : movie.media_type === filter
  );

  return (
    <div className="p-4">
      {movies.length === 0 || searchTerm === undefined ? (
        <p className="text-center text-lg font-semibold text-gray-600">
          {t("No results found")}
        </p>
      ) : (
        <div className="flex flex-col items-center">
          <h2 className="text-xl font-bold mb-2">
            {t("Search results for: ")}
            <span className="text-blue-500">{searchTerm}</span>"
          </h2>
          <div className="flex space-x-4 mb-4">
            <button
              onClick={() => handleFilterChange("movie")}
              className={`bg-white border border-gray-300 text-md text-gray-700 hover:bg-blue-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded px-3 py-2 transition duration-200 ${
                filter === "movie" ? "bg-blue-500 text-white" : ""
              }`}
            >
              {t("Movies")}
            </button>
            <button
              onClick={() => handleFilterChange("tv")}
              className={`bg-white border border-gray-300 text-md text-gray-700 hover:bg-blue-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded px-3 py-2 transition duration-200 ${
                filter === "tv" ? "bg-blue-500 text-white" : ""
              }`}
            >
              {t("TV Shows")}
            </button>
          </div>
          {filteredMovies.map((movie) => (
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
