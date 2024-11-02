import React, { useEffect, useState } from 'react';
import { fetchData } from '../../_utils/utils.js';
import MovieListViewAll from '../../components/LandingPage/MovieListViewAll.jsx'; // Import the new component
import { useTranslation } from 'react-i18next';

const Action = () => {
  const { i18n } = useTranslation();
  const [actionMovies, setActionMovies] = useState([]);

  // Fetch action movies from the API
  const fetchActionMovies = async () => {
    try {
      const response = await fetchData(
        `https://api.themoviedb.org/3/discover/movie?api_key=bbd89781c7835917a2decb4989b56470&language=${i18n.language}&with_genres=28`
      );

      if (response && response.results) {
        setActionMovies(response.results);
      } else {
        console.error("No results found in the response:", response);
      }
    } catch (error) {
      console.error("Error fetching action movies:", error);
    }
  };

  useEffect(() => {
    fetchActionMovies();
  }, [i18n.language]); // Refetch movies if the language changes

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-4xl font-bold mb-4 text-yellow-400 text-center">Action Movies</h1>
      <p className="mb-6">Discover thrilling action movies that will keep you on the edge of your seat!</p>

      {/* Display all action movies using MovieListViewAll */}
      <MovieListViewAll
        movies={actionMovies}
        title="All Action Movies"
      />
    </div>
  );
};

export default Action;
