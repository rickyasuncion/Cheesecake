import React, { useEffect, useState } from "react";
import MovieListView from "../LandingPage/MovieListView";
import { getUserRecentlyViewedMovies } from "../../_utils/firestore";
import { fetchData } from "../../_utils/utils";

const ReccomendRecentList = () => {
  const [recentViewed, setRecentViewed] = useState([]);

  useEffect(() => {
    const fetchRecentlyViewedMovies = async () => {
      try {
        const ids = await getUserRecentlyViewedMovies();
        
        const moviesPromises = ids.map(async (id) => {
          const data = await fetchData(`https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=bbd89781c7835917a2decb4989b56470`);
          return data.results;
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
  }, []);

  return (
    <MovieListView
      movies={recentViewed}
      title={"Your Next Watch"}
      contentType="movies"
    />
  );
};

export default ReccomendRecentList;
