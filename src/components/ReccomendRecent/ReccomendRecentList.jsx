import React, { useEffect, useState } from "react";
import MovieListView from "../LandingPage/MovieListView";
import { getUserRecentlyViewedMovies } from "../../_utils/firestore";
import { fetchData } from "../../_utils/utils";
import { useUserAuth } from "../../_utils/auth-context";
import { useTranslation } from "react-i18next";

const ReccomendRecentList = () => {
  const { t, i18n } = useTranslation();
  const { user } = useUserAuth();
  const [recentViewed, setRecentViewed] = useState([]);

  const language = i18n.language;

  useEffect(() => {
    const fetchRecentlyViewedMovies = async () => {
      try {
        const ids = (await getUserRecentlyViewedMovies()) || [];

        const moviesPromises = ids.map(async (id) => {
          const data = await fetchData(
            `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=bbd89781c7835917a2decb4989b56470&language=${language}`
          );
          return data.results || [];
        });

        const movies = await Promise.all(moviesPromises);

        const flattenedMovies = movies.flat();
        const randomMovies = flattenedMovies
          .sort(() => 0.5 - Math.random())
          .slice(0, 20);

        setRecentViewed(randomMovies);
      } catch (err) {
        console.error("Error fetching recently viewed movies:", err);
      }
    };

    fetchRecentlyViewedMovies();
  }, [user]);

  return (
    <MovieListView
      movies={recentViewed}
      title={t("Your Next Watch")}
      contentType="movies"
    />
  );
};

export default ReccomendRecentList;
