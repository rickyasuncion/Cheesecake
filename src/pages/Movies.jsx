import React, { useEffect, useState } from "react";
import { Separator } from "@radix-ui/react-separator";
import { useTranslation } from "react-i18next";
import GenrePage from "../components/Genre/GenrePage"; // Import the new GenrePage component

const Movies = () => {
  const [upcomingMoviesGenres, setUpcomingMoviesGenres] = useState([]);
  const [popularMovieGenres, setPopularMovieGenres] = useState([]);
  const [topRatedMovieGenres, setTopRatedMovieGenres] = useState([]);
  const { t } = useTranslation();

  function fetchMovies(url, callback) {
    fetch(url)
      .then((res) => res.json())
      .then((json) => {
        const genres = json.results.map((res) => res.genre_ids);
        const allGenres = genres.flat(Infinity);
        const uniqueGenres = [...new Set(allGenres)].slice(0, 5);

        fetch("https://api.themoviedb.org/3/genre/movie/list?language=en&api_key=YOUR_API_KEY")
          .then((res) => res.json())
          .then((genreJson) => {
            const genresWithIdsNames = uniqueGenres.map((genreId) =>
              genreJson.genres.find((genreObj) => genreObj.id === genreId)
            );

            let movies = json.results;

            const sections = genresWithIdsNames.map((obj) => {
              const movieFound = movies.find((movie) => movie.genre_ids.includes(obj.id));
              const result = { backdrop_path: movieFound?.backdrop_path, ...obj };
              movies = movies.filter((movie) => movie.id !== movieFound?.id);
              return result;
            });
            callback(sections);
          });
      });
  }

  useEffect(() => {
    fetchMovies(
      "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1&api_key=YOUR_API_KEY",
      setUpcomingMoviesGenres
    );
    fetchMovies(
      "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1&api_key=YOUR_API_KEY",
      setPopularMovieGenres
    );
    fetchMovies(
      "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1&api_key=YOUR_API_KEY",
      setTopRatedMovieGenres
    );
  }, []);

  return (
    <div className="pt-5 pb-16">
      <div className="container">
        <div className="pt-48 pb-3 relative overflow-hidden rounded-md isolate">
          <div className="bg-neutral-900/60 absolute top-0 bottom-0 z-10 w-full">
            <h1 className="px-4 font-semibold text-white text-3xl absolute bottom-3">
              {t("All Movies")}
            </h1>
          </div>
          <img src="/hero.jpg" alt="" className="absolute top-0 bottom-0 z-5" />
        </div>

        {/* Use GenrePage for each genre */}
        <GenrePage title={t("New & Upcoming")} genres={upcomingMoviesGenres} />
        <Separator className="h-0.5 bg-secondary/5 my-5" />
        <GenrePage title={t("Popular")} genres={popularMovieGenres} />
        <Separator className="h-0.5 bg-secondary/5 my-5" />
        <GenrePage title={t("Top Rated")} genres={topRatedMovieGenres} />
      </div>
    </div>
  );
};

export default Movies;
