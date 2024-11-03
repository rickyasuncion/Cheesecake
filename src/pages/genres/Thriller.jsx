import React, { useEffect, useState } from 'react';
import { fetchData } from '../../_utils/utils.js';
import MovieListViewAll from '../../components/LandingPage/MovieListViewAll.jsx';
import { useTranslation } from 'react-i18next';

const Thriller = () => {
  const { i18n } = useTranslation();
  const [thrillerMovies, setThrillerMovies] = useState([]);
  const [sortBy, setSortBy] = useState('popularity.desc');
  const [year, setYear] = useState('');
  const [language, setLanguage] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const fetchThrillerMovies = async () => {
    try {
      const response = await fetchData(
        `https://api.themoviedb.org/3/discover/movie?api_key=bbd89781c7835917a2decb4989b56470&language=${i18n.language}&with_genres=53&sort_by=${sortBy}${year ? `&primary_release_year=${year}` : ''}${language ? `&with_original_language=${language}` : ''}`
      );
      if (response && response.results) {
        setThrillerMovies(response.results);
      } else {
        console.error("No results found in the response:", response);
      }
    } catch (error) {
      console.error("Error fetching thriller movies:", error);
    }
  };

  useEffect(() => {
    fetchThrillerMovies();
  }, [i18n.language, sortBy, year, language]);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header Section */}
      <div className="relative bg-gradient-to-b from-black/50 to-black/80 flex items-center justify-center h-80">
        <div className="relative z-10 text-center">
          <h1 className="text-5xl font-bold text-yellow-400 tracking-wider">Thriller Movies</h1>
          <p className="mt-4 text-lg text-gray-300 max-w-md mx-auto">
            Experience the suspense with our collection of thrilling movies!
          </p>
        </div>
      </div>

      {/* Filter Button */}
      <div className="flex justify-end mt-4 px-8">
        <button
          onClick={() => {
            setShowFilters(!showFilters);
            console.log("Filter button clicked. Show Filters:", !showFilters);
          }}
          className="bg-yellow-400 text-gray-900 px-4 py-2 rounded font-semibold hover:bg-yellow-500 transition duration-200 ease-in-out"
        >
          Filter
        </button>
      </div>

      {/* Filter Dropdown */}
      {showFilters && (
        <div className="absolute right-8 mt-2 p-4 bg-gray-800 border border-gray-700 rounded shadow-lg w-64 z-10">
          <h2 className="text-lg font-semibold mb-4 text-yellow-400">Filters</h2>
          <label className="block mb-2">Sort By</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="mb-4 w-full p-2 bg-gray-700 text-white rounded"
          >
            <option value="popularity.desc">Popularity</option>
            <option value="release_date.desc">Release Date</option>
            <option value="vote_average.desc">Rating</option>
          </select>
          <label className="block mb-2">Year</label>
          <input
            type="number"
            placeholder="Year"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="mb-4 w-full p-2 bg-gray-700 text-white rounded"
          />
          <label className="block mb-2">Language</label>
          <input
            type="text"
            placeholder="Language Code (e.g., en, fr)"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-full p-2 bg-gray-700 text-white rounded"
          />
        </div>
      )}

      {/* Display all thriller movies using MovieListViewAll */}
      <div className="p-2">
        <MovieListViewAll movies={thrillerMovies} title="All Thriller Movies" />
      </div>
    </div>
  );
};

export default Thriller;
