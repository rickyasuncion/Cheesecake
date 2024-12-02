import React, { useEffect, useState } from "react";
import { fetchData } from "../../_utils/utils";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const LatestMoviesWithCount = () => {
  const { t, i18n } = useTranslation();
  const [movies, setMovies] = useState([]);
  async function fetchNowPlayingMovies() {
    const data = await fetchData(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=bbd89781c7835917a2decb4989b56470&language=${i18n.language}&page=1`
    );
    setMovies(data.results);
  }
  useEffect(() => {
    fetchNowPlayingMovies();
  }, []);

  return (
    <div className="container my-10">
      <h1 className="text-3xl font-medium">{t("Movies Playing Now")}</h1>
      <div className="flex py-5 gap-3 px-2 overflow-auto">
        {movies.map((movie, idx) => {
          return (
            <Link
              to={`/details/movie/${movie.id}`}
              className="flex relative w-fit pr-20 leading-[10rem]"
            >
              <span
                className="text-white text-[13rem]"
                style={{
                  textShadow:
                    "-3px -3px 0 #000000, 3px -3px 0 #000000, -3px 3px 0 #000000, 3px 3px 0 #000000",
                }}
              >
                {idx + 1}
              </span>
              <img
                src={`https://image.tmdb.org/t/p/w154/${movie.poster_path}`}
                className="absolute right-0 h-full"
                alt=""
              />
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default LatestMoviesWithCount;
