import React, { useEffect, useState } from "react";
import { MovieCard } from "../ui/MovieCard";
import { fetchData, filterResults } from "../../_utils/utils";

const SearchItems = ({ onSetResult, searchTerm }) => {
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
    <div className="search-results">
      {movies.length === 0 ? (
        <p className="text-center">No results found.</p>
      ) : (
        <React.Fragment>
          <h2>Search results for "{searchTerm}"</h2>
          <ul>
            {movies.map((movie) => (
              <MovieCard
                contentType={movie.contentType}
                key={movie.id}
                id={movie.id}
                imageUrl={movie.imageUrl}
                media_type={movie.media_type}
                title={movie.title}
                name={movie.name}
                poster_path={movie.poster_path}
              />
            ))}
          </ul>
        </React.Fragment>
      )}
    </div>
  );
};

export default SearchItems;
