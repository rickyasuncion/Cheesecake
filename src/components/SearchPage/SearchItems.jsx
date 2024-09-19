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
    <div className="search-results">
      {movies.length === 0 ? (
        <p className="text-center">No results found.</p>
      ) : (
        <React.Fragment>
          <h2>Search results for "{searchTerm}"</h2>
          <ul>
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
          </ul>
        </React.Fragment>
      )}
    </div>
  );
};

export default SearchItems;
