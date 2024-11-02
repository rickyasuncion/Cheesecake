import React, { useEffect, useState } from "react";
import "./Landing.css";
import MovieListView from "./MovieListView.jsx";
import { fetchData, filterResults } from "../../_utils/utils.js";
import { useLanguage } from "../../_utils/LanguageContext.js";
import { useTranslation } from "react-i18next";
import ReccomendMovieForm from "./ReccomendMovieForm.jsx";
import ReccomendRecentList from "../ReccomendRecent/ReccomendRecentList.jsx";

const Landing = () => {
  const { language } = useLanguage();
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [trendingTvShows, setTrendingTvShows] = useState([]);
  const { t } = useTranslation();

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

      <ReccomendMovieForm></ReccomendMovieForm>

      <ReccomendRecentList/>

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
