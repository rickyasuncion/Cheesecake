import React, { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import { Input } from "./ui/input.jsx";
import './Landing.css'
import { Button } from "./ui/button.jsx";
import { ChevronLeft, ChevronRight } from "lucide-react";

// const movies = [
//   { id: 1, title: "Inception", imageUrl: "" },
//   { id: 2, title: "Interstellar", imageUrl: "" },
//   { id: 3, title: "The Dark Knight", imageUrl: "" },
//   { id: 4, title: "Pulp Fiction", imageUrl: "" },
//   { id: 5, title: "The Matrix", imageUrl: "" },
// ];

const MOVIE_DISPLAY_COUNT = 5

const Landing = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);
  const [currMoviesObj, setCurrMoviesObj] = useState({ start: 0, end: MOVIE_DISPLAY_COUNT })

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = async (event) => {
    event.preventDefault();
    const fetch = require("node-fetch");
    const url = `https://api.themoviedb.org/3/search/multi?query=${searchTerm}&include_adult=false&language=en-US&page=1&api_key=bbd89781c7835917a2decb4989b56470`;
    console.log(url);

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
    setMovies(filteredData);
    alert(`Searching for: ${searchTerm}`);
  };

  useEffect(() => { console.log(movies) }, [movies])

  return (
    <div className="landing-page">
      <h1 className="text-2xl font-semibold mb-4">Welcome to Movie Recommendation</h1>
      <p >Search for your favorite movies below:</p>
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

      <h2 className="text-lg font-medium mt-10">Recommended Movies</h2>
      <div className="container">
        {movies.length === 0 ? <h2>No movies to display</h2> :

          <div>
            <div className="flex gap-2 items-center justify-end">
              <span>{currMoviesObj.start} to {currMoviesObj.end} movies / {movies.length} movies</span>
              <div>
                <Button className="text-xs p-1" disabled={currMoviesObj.start === 0} onClick={() => setCurrMoviesObj(curr => ({ start: curr.start - MOVIE_DISPLAY_COUNT, end: curr.end - MOVIE_DISPLAY_COUNT }))}><ChevronLeft /></Button>
                <Button className="text-xs p-1" disabled={currMoviesObj.end === movies.length} onClick={() => (setCurrMoviesObj(curr => ({ start: curr.start + MOVIE_DISPLAY_COUNT, end: curr.end + MOVIE_DISPLAY_COUNT })))}><ChevronRight /></Button>
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
    </div>
  );
};

export default Landing;
