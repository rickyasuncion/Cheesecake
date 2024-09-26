import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { MovieCard } from "../ui/MovieCard";
import { useTranslation } from "react-i18next";

const MOVIE_DISPLAY_COUNT = 5;


const MovieListView = ({ movies, title, contentType }) => {
  const { t } = useTranslation();
  const [currMoviesObj, setCurrMoviesObj] = useState({
    start: 0,
    end: MOVIE_DISPLAY_COUNT,
  });

  const itemLabel = contentType === "tv-shows" ? t('TV Shows') : t('Movies');

  return (
    <div className="container">
      {movies.length === 0 ? (
        <h2>{t('No results found')}</h2>
      ) : (
        <React.Fragment>
          <div className="flex gap-2 items-center justify-between mt-10">
            <h2 className="text-lg font-medium">{title}</h2>
            <div className="flex gap-2 items-center">
              <span>
              {currMoviesObj.start + 1} {t('to')}{" "}
                {currMoviesObj.end > movies.length
                  ? movies.length
                  : currMoviesObj.end}{" "}
                {t('of')} {movies.length} {itemLabel}
              </span>
              <div>
                <Button
                  className="text-xs p-1"
                  disabled={currMoviesObj.start <= 0}
                  onClick={() =>
                    setCurrMoviesObj((curr) => ({
                      start: curr.start - MOVIE_DISPLAY_COUNT,
                      end: curr.end - MOVIE_DISPLAY_COUNT,
                    }))
                  }
                >
                  <ChevronLeft />
                </Button>
                <Button
                  className="text-xs p-1"
                  disabled={currMoviesObj.end >= movies.length}
                  onClick={() =>
                    setCurrMoviesObj((curr) => ({
                      start: curr.start + MOVIE_DISPLAY_COUNT,
                      end: curr.end + MOVIE_DISPLAY_COUNT,
                    }))
                  }
                >
                  <ChevronRight />
                </Button>
              </div>
            </div>
          </div>
          <div className="movie-list">
            {[...movies]
              .slice(currMoviesObj.start, currMoviesObj.end)
              .map((movie) => (
                <MovieCard
                  key={movie.id}
                  id={movie.id}
                  media_type={movie.media_type}
                  title={movie.title}
                  name={movie.name}
                  poster_path={movie.poster_path}
                />
              ))}
          </div>
        </React.Fragment>
      )}
    </div>
  );
};

export default MovieListView;
