import React, { useEffect, useState } from "react";
import "./FreeMovies.css";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";

const FreeMovies = () => {
  const [movies, setMovies] = useState([]);
  const [currMoviesObj, setCurrMoviesObj] = useState({
    start: 0,
    end: 5, // Display 5 movies at a time
  });

  useEffect(() => {
    fetchFreeMovies();
  }, []);

  const fetchFreeMovies = async () => {
    const apiKey = "bbd89781c7835917a2decb4989b56470";
    const freeMovies = [];
    let page = 1;
    let totalMovies = 0;

    while (freeMovies.length < 50 && totalMovies < 500) {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=${page}`
      );
      const data = await response.json();
      for (let movie of data.results) {
        const providerResponse = await fetch(
          `https://api.themoviedb.org/3/movie/${movie.id}/watch/providers?api_key=${apiKey}`
        );
        const providerData = await providerResponse.json();
        if (
          providerData.results &&
          providerData.results.US &&
          providerData.results.US.free
        ) {
          freeMovies.push({
            ...movie,
            providers: providerData.results.US.free.map(
              (provider) => provider.provider_name
            ),
          });
        }
        if (freeMovies.length === 50) break;
      }
      page += 1;
      totalMovies += data.results.length;
    }
    setMovies(freeMovies);
  };

  const handleNext = () => {
    setCurrMoviesObj((curr) => ({
      start: Math.min(curr.start + 5, movies.length - 5),
      end: Math.min(curr.end + 5, movies.length),
    }));
  };

  const handlePrev = () => {
    setCurrMoviesObj((curr) => ({
      start: Math.max(curr.start - 5, 0),
      end: Math.max(curr.end - 5, 5),
    }));
  };

  return (
    <div className="free-movies-page">
      <h1>Free Movies Available on Streaming Platforms</h1>
      <div className="flex gap-2 items-center justify-between mt-10">
        <div className="flex gap-2 items-center">
          <span>
            {currMoviesObj.start + 1} to{" "}
            {currMoviesObj.end > movies.length
              ? movies.length
              : currMoviesObj.end}{" "}
            of {movies.length} Movies
          </span>
          <div>
            <button
              className="button"
              disabled={currMoviesObj.start <= 0}
              onClick={handlePrev}
            >
              <ChevronLeft />
            </button>
            <button
              className="button"
              disabled={currMoviesObj.end >= movies.length}
              onClick={handleNext}
            >
              <ChevronRight />
            </button>
          </div>
        </div>
      </div>
      <div className="movie-list">
        {movies
          .slice(currMoviesObj.start, currMoviesObj.end)
          .map((movie, index) => (
            <div key={index} className="movie-card">
              <Link to={`/details/movie/${movie.id}`}>
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                />
              </Link>
              <h2>{movie.title}</h2>
              <p>Release Date: {movie.release_date}</p>
              <p>Vote Average: {movie.vote_average}</p>
              <p>Available on: {movie.providers.join(", ")}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default FreeMovies;
