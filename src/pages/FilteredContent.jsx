import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import MovieListView from "../components/LandingPage/MovieListView"; // 引入現有的 MovieListView
import { fetchData } from "../_utils/utils";

const FilteredContent = () => {
  const location = useLocation();
  const genres = location.state || { genres: [] }; // 取得過濾的genres
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [filteredTvShows, setFilteredTvShows] = useState([]);

  useEffect(() => {
    const fetchFilteredContent = async () => {
      if (genres.genres.length > 0) {
        const genreString = genres.genres.join(",");

        // 過濾電影
        const movieResults = await fetchData(
          `https://api.themoviedb.org/3/discover/movie?with_genres=${genreString}&api_key=bbd89781c7835917a2decb4989b56470&language=en-US`
        );
        const moviesWithMediaType = movieResults.results.map((movie) => ({
          ...movie,
          media_type: "movie", // 手动设置 media_type
        }));
        setFilteredMovies(moviesWithMediaType);

        // 過濾電視劇
        const tvResults = await fetchData(
          `https://api.themoviedb.org/3/discover/tv?with_genres=${genreString}&api_key=bbd89781c7835917a2decb4989b56470&language=en-US`
        );
        const tvShowsWithMediaType = tvResults.results.map((tv) => ({
          ...tv,
          media_type: "tv", // 手动设置 media_type
        }));
        setFilteredTvShows(tvShowsWithMediaType);
      }
    };

    fetchFilteredContent();
  }, [genres]);

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-2xl font-semibold mb-4">
        Filtered Movies and TV Shows
      </h2>

      {filteredMovies.length > 0 && (
        <MovieListView
          movies={filteredMovies}
          title="Filtered Movies"
          contentType="movies"
        />
      )}

      {filteredTvShows.length > 0 && (
        <MovieListView
          movies={filteredTvShows}
          title="Filtered TV Shows"
          contentType="tv-shows"
        />
      )}
    </div>
  );
};

export default FilteredContent;
