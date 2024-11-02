import React from "react";
import { MovieCard } from "../ui/MovieCard";
import { useTranslation } from "react-i18next";

const MovieListViewAll = ({ movies, title }) => {
  const { t } = useTranslation();

  return (
    <div className="container">
      {movies.length === 0 ? (
        <h2>{t("No results found")}</h2>
      ) : (
        <React.Fragment>
          <h2 className="text-lg font-medium mt-10">{title}</h2>
          <div className="movie-list grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-4">
            {movies.map((movie) => (
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

export default MovieListViewAll;
