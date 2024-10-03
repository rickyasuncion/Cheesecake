import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import MovieListView from "../components/LandingPage/MovieListView";
import { fetchData } from "../_utils/utils";
import { useTranslation } from "react-i18next";

const FilteredContent = () => {
  const location = useLocation();
  const genres = location.state || { genres: [] };
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [filteredTvShows, setFilteredTvShows] = useState([]);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const fetchFilteredContent = async () => {
      if (genres.genres.length > 0) {
        const genreString = genres.genres.join(",");

        const language = i18n.language;

        const movieResults = await fetchData(
          `https://api.themoviedb.org/3/discover/movie?with_genres=${genreString}&api_key=bbd89781c7835917a2decb4989b56470&language=${language}`
        );
        const moviesWithMediaType = movieResults.results.map((movie) => ({
          ...movie,
          media_type: "movie",
        }));
        setFilteredMovies(moviesWithMediaType);

        const tvResults = await fetchData(
          `https://api.themoviedb.org/3/discover/tv?with_genres=${genreString}&api_key=bbd89781c7835917a2decb4989b56470&language=${language}`
        );
        const tvShowsWithMediaType = tvResults.results.map((tv) => ({
          ...tv,
          media_type: "tv",
        }));
        setFilteredTvShows(tvShowsWithMediaType);
      }
    };

    fetchFilteredContent();
  }, [genres, i18n.language]);

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-2xl font-semibold mb-4">
        {t("Filtered Movies and TV Shows")}
      </h2>

      {filteredMovies.length > 0 && (
        <MovieListView
          movies={filteredMovies}
          title={t("Filtered Movies")}
          contentType="movies"
        />
      )}

      {filteredTvShows.length > 0 && (
        <MovieListView
          movies={filteredTvShows}
          title={t("Filtered TV Shows")}
          contentType="tv-shows"
        />
      )}
    </div>
  );
};

export default FilteredContent;
