import React, { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { MovieCard } from "../ui/MovieCard";
import {fetchData} from "../../_utils/utils"

const MoviePersonal = () => {
  const { t, i18n } = useTranslation();

  const { userData } = useContext(userData);
  const [recommendedMovies, setRecommendedMovies] = useState([]);
  const [recommendedTv, setRecommendedTv] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const moviesData = await Promise.all(
        userData.recentlyViewedMovies.map(async (mov) => {
          const data = await fetchData(
            `https://api.themoviedb.org/3/movie/${mov}/recommendations?api_key=bbd89781c7835917a2decb4989b56470&language=${i18n.language}`
          );
          return data?.results || [];
        })
      );
      setRecommendedMovies(moviesData.flat().splice(0, 6));

      const tvData = await Promise.all(
        userData.recentlyViewedTv.map(async (tv) => {
          const data = await fetchData(
            `https://api.themoviedb.org/3/tv/${tv}/recommendations?api_key=bbd89781c7835917a2decb4989b56470&language=${i18n.language}`
          );
          return data?.results || [];
        })
      );
      setRecommendedTv(tvData.flat().splice(0, 6));
    };

    if (userData) {
      getData();
    }
  }, [userData, i18n.language]);

  return (
    <div className="container mx-auto px-4 py-6 min-h-screen">
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-6 border-b-2 border-blue-500 pb-2">
          {t("Recommended Movies")}
        </h2>
        {recommendedMovies.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {recommendedMovies.map((movie) => (
              <MovieCard
                key={movie.id}
                id={movie.id}
                media_type="movie"
                title={movie.title}
                poster_path={movie.poster_path}
                userData={userData}
                className="transition-transform duration-300 hover:scale-105 hover:shadow-lg"
              />
            ))}
          </div>
        ) : (
          <p className="italic">No movie recommendations available</p>
        )}
      </div>

      <div className="mt-12">
        <h2 className="text-3xl font-bold mb-6 border-b-2 border-green-500 pb-2">
          {t("Recommended TV Shows")}
        </h2>
        {recommendedTv.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {recommendedTv.map((tv) => (
              <MovieCard
                key={tv.id}
                id={tv.id}
                media_type="tv"
                title={tv.name}
                poster_path={tv.poster_path}
                userData={userData}
                className="transition-transform duration-300 hover:scale-105 hover:shadow-lg"
              />
            ))}
          </div>
        ) : (
          <p className="italic">No TV show recommendations available</p>
        )}
      </div>
    </div>
  );
};

export default MoviePersonal;
