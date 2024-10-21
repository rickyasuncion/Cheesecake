import React, { useEffect, useState } from "react";
import Card from "../components/ui/card";
import { Separator } from "@radix-ui/react-separator";
import { useTranslation } from "react-i18next";

const Movies = () => {
  const [upcomingMoviesGeners, setUpcomingMoviesGeners] = useState([]);
  const [popularMovieGenres, setPopularMovieGenres] = useState([]);
  const [topRatedMovieGenres, setTopRatedMovieGenres] = useState([]);
  const { t } = useTranslation();

  function fetchUpcomingMovies(url, callback) {
    fetch(url)
      .then((res) => res.json())
      .then((json) => {
        const geners = json.results.map((res) => {
          return res.genre_ids;
        });
        const allGeners = geners.flat(Infinity);
        const uniqueGeners = new Set(allGeners);
        const uniqueGenersArr = Array.from(uniqueGeners).splice(0, 5);

        fetch(
          "https://api.themoviedb.org/3/genre/movie/list?language=en&api_key=021d1a1f14e24ac19694e6363bc04b76"
        )
          .then((res) => res.json())
          .then((generJson) => {
            const genersWithIdsNames = uniqueGenersArr.map((generId) => {
              return generJson.genres.find(
                (genreObj) => genreObj.id === generId
              );
            });
            let p = [];

            let movies = json.results;

            genersWithIdsNames.forEach((obj) => {
              const movieFound = movies.find((movie) =>
                movie.genre_ids.includes(obj.id)
              );
              const r = { backdrop_path: movieFound?.backdrop_path, ...obj };

              movies = movies.filter((movie) => movie.id !== movieFound.id);
              p.push(r);
            });
            callback(p);
          });
      });
  }

  useEffect(() => {
    fetchUpcomingMovies(
      "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1&api_key=021d1a1f14e24ac19694e6363bc04b76",
      setUpcomingMoviesGeners
    );
    fetchUpcomingMovies(
      "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1&api_key=021d1a1f14e24ac19694e6363bc04b76",
      setPopularMovieGenres
    );
    fetchUpcomingMovies(
      "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1&api_key=021d1a1f14e24ac19694e6363bc04b76",
      setTopRatedMovieGenres
    );
  }, []);

  return (
    <div className="bg-[#171c21] text-secondary pt-5 pb-16">
      <div className="container">
        <div className="pt-48 pb-3 relative overflow-hidden rounded-md  isolate">
          <div className="bg-neutral-900/60 absolute top-0 bottom-0 z-10 w-full">
            <h1 className="px-4 font-semibold text-3xl text-white absolute bottom-3">
              {t("All Movies")}
            </h1>
          </div>
          <img src="/hero.jpg" alt="" className="absolute top-0 bottom-0 z-5" />
        </div>

        <div className="mt-5">
          <h2 className="text-lg mb-2 font-medium">{t("New & Upcoming")}</h2>

          <div className="flex gap-3 flex-wrap">
            {upcomingMoviesGeners &&
              upcomingMoviesGeners.map((genre) => {
                return (
                  <Card
                    title={genre.name}
                    href={`/movies/upcoming/genre/${genre.id}`}
                    className={"min-w-56 max-w-60 flex-1"}
                    bgImage={`https://image.tmdb.org/t/p/w500/${genre.backdrop_path}`}
                  />
                );
              })}
          </div>
        </div>

        <Separator className="h-0.5 bg-secondary/5 my-5" />

        <div>
          <h2 className="text-lg mb-2 font-medium">{t("Popular")}</h2>

          <div className="flex gap-3 flex-wrap">
            {popularMovieGenres &&
              popularMovieGenres.map((genre) => {
                return (
                  <Card
                    title={genre.name}
                    href={`/movies/popular/genre/${genre.id}`}
                    className={"min-w-56 max-w-60  flex-1"}
                    bgImage={`https://image.tmdb.org/t/p/w500/${genre.backdrop_path}`}
                  />
                );
              })}
          </div>
        </div>

        <Separator className="h-0.5 bg-secondary/5 my-5" />

        <div>
          <h2 className="text-lg mb-2 font-medium">{t("Top Rated")}</h2>

          <div className="flex gap-3 flex-wrap">
            {topRatedMovieGenres &&
              topRatedMovieGenres.map((genre) => {
                return (
                  <Card
                    title={genre.name}
                    href={`/movies/top_rated/genre/${genre.id}`}
                    className={"min-w-56 max-w-60  flex-1"}
                    bgImage={`https://image.tmdb.org/t/p/w500/${genre.backdrop_path}`}
                  />
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Movies;
