//01
import React, { useEffect, useState } from "react";
import "./FreeMovies.css";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../components/ui/button";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";

const FreeMovies = () => {
  const [movies, setMovies] = useState([]);
  const { t, i18n } = useTranslation();
  const [currMoviesObj, setCurrMoviesObj] = useState({
    start: 0,
    end: 5,
  });

  useEffect(() => {
    fetchFreeMovies();
  }, []);

  const fetchFreeMovies = async () => {
    const apiKey = "bbd89781c7835917a2decb4989b56470";
    const freeMovies = [];
    let page = 1;
    let totalMovies = 0;

    const language = i18n.language;

    while (freeMovies.length < 20 && totalMovies < 50) {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=${language}&page=${page}`
        );
        const data = await response.json();
        for (let movie of data.results) {
          try {
            const providerResponse = await fetch(
              `https://api.themoviedb.org/3/movie/${movie.id}/watch/providers?api_key=${apiKey}`
            );
            const providerData = await providerResponse.json();
            const isFreeInCA =
              providerData.results.CA && providerData.results.CA.free;
            // const isFreeInUS =
            //   providerData.results.US && providerData.results.US.free;

            if (isFreeInCA) {
              freeMovies.push({
                ...movie,
                isFree: true,
                link: `https://www.themoviedb.org/movie/${movie.id}/watch`,
              });
            }
          } catch (error) {
            console.error(
              `Error fetching providers for movie ${movie.id}:`,
              error
            );
          }
        }

        page += 1;
        totalMovies += data.results.length;
      } catch (error) {
        console.error("Error fetching popular movies:", error);
      }
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
      <h1>{t("Free Movies Available on Streaming Platforms")}</h1>
      <div className="flex gap-2 items-center justify-between mt-10">
        <div className="flex gap-2 items-center">
          <span>
            {currMoviesObj.start + 1} {t("to")}{" "}
            {currMoviesObj.end > movies.length
              ? movies.length
              : currMoviesObj.end}{" "}
            {t("of")} {movies.length} {t("Movies")}
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
              <Link
                to={`/details/movie/${movie.id}`}
                state={{ isFree: movie.isFree }}
              >
                <img
                  src={`https://image.tmdb.org/t/p/w400${movie.poster_path}`}
                  alt={movie.title}
                />
              </Link>
              <h2>{movie.title}</h2>
              <p>
                {t("Release Date")}: {movie.release_date}
              </p>
              <p>
                {t("Vote Average")}: {movie.vote_average}
              </p>
              {/* <p>
                <Button
                  className="rounded-full h-auto px-4 m-0 flex gap-1 items-center text-base text-xs"
                  onClick={() => window.open(movie.link, "_blank")}
                >
                  {t("Find Free Viewing Options on TMDb")}{" "}
                  <ArrowRight className="size-5" />
                </Button>
              </p> */}
            </div>
          ))}
      </div>
    </div>
  );
};

export default FreeMovies;
