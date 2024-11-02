import React, { useEffect, useState } from 'react';
import { fetchData, filterResults } from '../../_utils/utils.js';
import MovieListView from '../../components/LandingPage/MovieListView.jsx';
import { useTranslation } from 'react-i18next';

const Action = () => {
  const { i18n } = useTranslation();
  const [actionMovies, setActionMovies] = useState([]);
  const [filter, setFilter] = useState(''); // Combine rating and release year into one filter

  // Fetch action movies from the API with filters
  const fetchActionMovies = async () => {
    try {
      const url = new URL('https://api.themoviedb.org/3/discover/movie');
      url.searchParams.append('api_key', 'bbd89781c7835917a2decb4989b56470');
      url.searchParams.append('language', i18n.language);
      url.searchParams.append('with_genres', 28);

      // Add filters to the API request if set
      if (filter) {
        const [rating, year] = filter.split('-'); // Split the filter into rating and year
        if (rating) {
          url.searchParams.append('vote_average.gte', rating); // Minimum rating
        }
        if (year) {
          url.searchParams.append('primary_release_year', year); // Filter by release year
        }
      }

      const response = await fetchData(url.toString());
      setActionMovies(filterResults(response));
    } catch (error) {
      console.error("Error fetching action movies:", error);
    }
  };

  useEffect(() => {
    fetchActionMovies();
  }, [i18n.language, filter]); // Refetch movies if the language or filters change

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-4xl font-bold mb-4 text-yellow-400 text-center">Action Movies</h1>
      <p className="mb-6">Discover thrilling action movies that will keep you on the edge of your seat!</p>

      {/* Combined Filters Dropdown */}
      <div className="mb-6">
        <label className="block mb-2 text-yellow-400">Filter Movies:</label>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="p-2 bg-gray-800 text-yellow-400 rounded"
        >
          <option value="">Select filter</option>
          <option value="5-2024">Min Rating: 5 - Year: 2024</option>
          <option value="5-2023">Min Rating: 5 - Year: 2023</option>
          <option value="7-2022">Min Rating: 7 - Year: 2022</option>
          <option value="8-2021">Min Rating: 8 - Year: 2021</option>
          <option value="9-2020">Min Rating: 9 - Year: 2020</option>
          {/* Add more options as needed */}
        </select>
      </div>

      {/* Display action movies using MovieListView */}
      <MovieListView
        movies={actionMovies}
        title="Action Movies"
        contentType="action-movies"
      />
    </div>
  );
};

export default Action;
