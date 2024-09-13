import React, { useEffect, useState } from "react";
import "./Landing.css";
import MovieListView from "./MovieListView.jsx";
import LandingSearchForm from "./LandingSearchForm.jsx";

const Landing = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [queriedMovies, setQueriedMovies] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [trendingTvShows, setTrendingTvShows] = useState([]);
  const [queried, setQueried] = useState(false);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = async (event) => {
    event.preventDefault();
    const fetchedMovies = await fetchData(
      `https://api.themoviedb.org/3/search/multi?query=${searchTerm}&include_adult=false&language=en-US&page=1&api_key=bbd89781c7835917a2decb4989b56470`
    );
    setQueriedMovies(fetchedMovies);
    setQueried(true);
  };

  useEffect(() => {
    async function populateData() {
      const popularMovies = await fetchData(
        `https://api.themoviedb.org/3/trending/movie/day?language=en-US&api_key=bbd89781c7835917a2decb4989b56470`
      );
      setTrendingMovies(popularMovies);

      const populartrendingTvShows = await fetchData(
        `https://api.themoviedb.org/3/trending/tv/day?language=en-US&page=1&api_key=bbd89781c7835917a2decb4989b56470`
      );
      setTrendingTvShows(populartrendingTvShows);
    }
    populateData();
  }, []);

  async function fetchData(url) {
    const fetch = require("node-fetch");

    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
      },
    };

    let response = await fetch(url, options);
    let data = await response.json();
    let filteredData = data.results.filter(
      (data) => data.media_type !== "person"
    );
    return filteredData;
  }

  return (
    <div className="landing-page">
      <h1 className="text-2xl font-semibold mb-4 text-center">
        Welcome to Movie Recommendation
      </h1>

      <LandingSearchForm
        searchTerm={searchTerm}
        onSearchSubmit={handleSearchSubmit}
        onSearchChange={handleSearchChange}
      ></LandingSearchForm>

      {queried && queriedMovies.length === 0 && <h2>No results found.</h2>}
      {queried && queriedMovies.length > 0 && (
        <MovieListView movies={queriedMovies} title={"Search Results"} />
      )}

      <MovieListView
        movies={trendingMovies}
        title={"Popular Movies"}
      ></MovieListView>

      <MovieListView
        movies={trendingTvShows}
        title={"Popular TV Shows"}
      ></MovieListView>
    </div>
  );
};

export default Landing;
