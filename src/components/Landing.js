import React, { useState } from "react";
import "./Landing.css";

// const movies = [
//   { id: 1, title: "Inception", imageUrl: "" },
//   { id: 2, title: "Interstellar", imageUrl: "" },
//   { id: 3, title: "The Dark Knight", imageUrl: "" },
//   { id: 4, title: "Pulp Fiction", imageUrl: "" },
//   { id: 5, title: "The Matrix", imageUrl: "" },
// ];

const Landing = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = async (event) => {
    event.preventDefault();
    const fetch = require("node-fetch");
    const url =
      `https://api.themoviedb.org/3/search/multi?query=${searchTerm}&include_adult=false&language=en-US&page=1`;
    console.log(url);
    const options = { method: "GET",   headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiYmQ4OTc4MWM3ODM1OTE3YTJkZWNiNDk4OWI1NjQ3MCIsIm5iZiI6MTcyNjA2NTQxMC4wNzI0OSwic3ViIjoiNjZkZjgyMGQwMDAwMDAwMDAwOWNkMTUwIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.inhfWIJljYlhfF-_RGZBsOtGVMdTT8kQFs4BuHHMRP0'
      } };

    let response = await fetch(url, options);
    let data = await response.json();
    let filteredData = data.results.filter((data) => data.media_type !== 'person')
    setMovies(filteredData);
    console.log(filteredData)
    alert(`Searching for: ${searchTerm}`);
  };

  return (
    <div className="landing-page">
      <h1>Welcome to Movie Recommendation</h1>
      <p>Search for your favorite movies below:</p>
      <form onSubmit={handleSearchSubmit}>
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Type your search here..."
        />
        <button type="submit">Search</button>
      </form>

      <h2>Recommended Movies</h2>
      <div className="movie-list">
        {movies.map((movie) => (
          <div key={movie.id} className="movie-card">
            <img
              src={movie.imageUrl || `https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              alt={movie.media_type === "movie" ? movie.title : movie.name}
            />
            <h3>{movie.media_type === "movie" ? movie.title : movie.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Landing;
