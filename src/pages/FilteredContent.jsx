import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { fetchData } from "../_utils/utils";
import MovieListView from "../components/LandingPage/MovieListView";

const FilteredContent = () => {
  const location = useLocation();
  const { genres } = location.state || { genres: [] };
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [filteredTvShows, setFilteredTvShows] = useState([]);

  useEffect(() => {
    const fetchFilteredContent = async () => {
      if (genres.length > 0) {
        const genreString = genres.join(",");

        // Fetch filtered movies
        const movieResults = await fetchData(
          `https://api.themoviedb.org/3/discover/movie?with_genres=${genreString}&api_key=bbd89781c7835917a2decb4989b56470&language=en-US`
        );
        setFilteredMovies(movieResults.results);

        // Fetch filtered TV shows
        const tvResults = await fetchData(
          `https://api.themoviedb.org/3/discover/tv?with_genres=${genreString}&api_key=bbd89781c7835917a2decb4989b56470&language=en-US`
        );
        setFilteredTvShows(tvResults.results);
      }
    };

    fetchFilteredContent();
  }, [genres]);

  return (
    <div>
      <h1>Filtered Movies and TV Shows</h1>
      {genres.length > 0 ? (
        <>
          <MovieListView
            movies={filteredMovies}
            title="Filtered Movies"
            contentType="movies"
          />
          <MovieListView
            movies={filteredTvShows}
            title="Filtered TV Shows"
            contentType="tv-shows"
          />
        </>
      ) : (
        <p>No genres selected.</p>
      )}
    </div>
  );
};

export default FilteredContent;
