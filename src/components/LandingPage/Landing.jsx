import React, { useEffect, useState } from "react";
import "./Landing.css";
import MovieListView from "./MovieListView.jsx";
import LandingSearchForm from "./LandingSearchForm.jsx";
import { fetchData, filterResults } from "../../_utils/utils.js";
import { useLanguage } from "../../_utils/LanguageContext.js";
import { useTranslation } from "react-i18next";

const Landing = () => {
  const { language } = useLanguage();
  const [searchTerm, setSearchTerm] = useState("");
  const [queriedMovies, setQueriedMovies] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [trendingTvShows, setTrendingTvShows] = useState([]);
  const [queried, setQueried] = useState(false);
  const { t } = useTranslation();

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = async (event) => {
    event.preventDefault();
    const fetchedMovies = await fetchData(
      `https://api.themoviedb.org/3/search/multi?query=${searchTerm}&include_adult=false&language=${language}&page=1&api_key=bbd89781c7835917a2decb4989b56470`
    );
    setQueriedMovies(filterResults(fetchedMovies));
    setQueried(true);
  };

  useEffect(() => {
    async function populateData() {
      const popularMovies = await fetchData(
        `https://api.themoviedb.org/3/trending/movie/day?language=${language}&api_key=bbd89781c7835917a2decb4989b56470`
      );
      setTrendingMovies(filterResults(popularMovies));

      const populartrendingTvShows = await fetchData(
        `https://api.themoviedb.org/3/trending/tv/day?language=${language}&page=1&api_key=bbd89781c7835917a2decb4989b56470`
      );
      setTrendingTvShows(filterResults(populartrendingTvShows));
    }
    populateData();
  }, [language]);

  return (
    <div className="landing-page">
      <h1 className="text-2xl font-semibold mb-4 text-center">
        {t("Welcome to Movie Recommendation")}
      </h1>

      {/* <p>Current Language: {language}</p> */}

      <LandingSearchForm
        searchTerm={searchTerm}
        onSearchSubmit={handleSearchSubmit}
        onSearchChange={handleSearchChange}
      ></LandingSearchForm>

      {queried && queriedMovies.length === 0 && (
        <h2>{t("No results found.")}</h2>
      )}
      {queried && queriedMovies.length > 0 && (
        <MovieListView
          movies={queriedMovies}
          title={"Search Results"}
          contentType="movies"
        />
      )}

      <MovieListView
        movies={trendingMovies}
        title={t("Popular Movies")}
        contentType="movies"
      ></MovieListView>

      <MovieListView
        movies={trendingTvShows}
        title={t("Popular TV Shows")}
        contentType="tv-shows"
      ></MovieListView>
    </div>
  );
};

export default Landing;
