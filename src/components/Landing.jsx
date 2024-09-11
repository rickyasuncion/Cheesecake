import React, { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import { Input } from "./ui/input.jsx";
import './Landing.css'
import { Button } from "./ui/button.jsx";
import { ChevronLeft, ChevronRight } from "lucide-react";


const MOVIE_DISPLAY_COUNT = 5

const Landing = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);
  const [tvShows, setTvShows] = useState([]);
  const [currMoviesObj, setCurrMoviesObj] = useState({ start: 0, end: MOVIE_DISPLAY_COUNT })

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = async (event) => {
    event.preventDefault();
    const fetchedMovies = await fetchData(`https://api.themoviedb.org/3/search/multi?query=${searchTerm}&include_adult=false&language=en-US&page=1&api_key=bbd89781c7835917a2decb4989b56470`);
    setMovies(fetchedMovies);
  };


  useEffect(() => {
    async function populateData() {
      const popularMovies = await  fetchData(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&api_key=bbd89781c7835917a2decb4989b56470`)
      setMovies(popularMovies)

      const popularTvShows = await fetchData(`https://api.themoviedb.org/3/trending/tv/day?language=en-US&page=1&api_key=bbd89781c7835917a2decb4989b56470`)
      setTvShows(popularTvShows.slice(0,5))
    }
    populateData()
  } , [])
  
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
      <h1 className="text-2xl font-semibold mb-4 text-center">Welcome to Movie Recommendation</h1>
      <p className="text-center">Search for your favorite movies below:</p>
      <form className="mt-2 flex w-fit items-center mx-auto" onSubmit={handleSearchSubmit}>
        <Input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          className="mx-auto w-80"
          placeholder="Type your search here..."
        />
        <Button className="px-10">Search</Button>
      </form>

      <div className="container">
        {movies.length === 0 ? <h2 className="text-center mt-10 text-lg">No movies to display</h2> :

          <div className="mt-10">
            <div className="flex gap-2 items-center justify-between">
            <h2 className="text-lg font-medium">Recommended Popular Movies</h2>
            <div className="flex gap-2 items-center">
              <span>{currMoviesObj.start} to {currMoviesObj.end} movies / {movies.length} movies</span>
              <div>
                <Button className="text-xs p-1" disabled={currMoviesObj.start <= 0} onClick={() => setCurrMoviesObj(curr => ({ start: curr.start - MOVIE_DISPLAY_COUNT, end: curr.end - MOVIE_DISPLAY_COUNT }))}><ChevronLeft /></Button>
                <Button className="text-xs p-1" disabled={currMoviesObj.end >= movies.length} onClick={() => (setCurrMoviesObj(curr => ({ start: curr.start + MOVIE_DISPLAY_COUNT, end: curr.end + MOVIE_DISPLAY_COUNT })))}><ChevronRight /></Button>
              </div>

            </div>

            </div>

            <div className="movie-list">
              {
                [...movies].slice(currMoviesObj.start, currMoviesObj.end).map((movie) => (
                  <MovieCard key={movie.id} id={movie.id} imageUrl={movie.imageUrl} media_type={movie.media_type} title={movie.title} name={movie.name} poster_path={movie.poster_path} />
                ))
              }
            </div>

          </div>
        }
      </div>



      <div className="container">
     
          <div className="mt-10">
            <div className="flex gap-2 items-center justify-between">
              <h2 className="text-lg font-medium">Popular TV Shows</h2>
            </div>

            <div className="movie-list">
              {
                tvShows.map((movie) => (
                  <MovieCard key={movie.id} id={movie.id} imageUrl={movie.imageUrl} media_type={movie.media_type} title={movie.title} name={movie.name} poster_path={movie.poster_path} />
                ))
              }
            </div>

          </div>
        
      </div>
    </div>
  );
};

export default Landing;
