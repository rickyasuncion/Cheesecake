import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const MediaCarousel = ({ movies }) => {
    const moviesPerPage = 6;


  const [currentMovieIndex, setCurrentMovieIndex] = useState(0);

  const nextMovies = () => {
    setCurrentMovieIndex((prev) => prev >= movies.length - moviesPerPage ? 0 : prev + moviesPerPage);
  };

  const prevMovies = () => {
    setCurrentMovieIndex((prev) => prev === 0 ? movies.length - moviesPerPage : prev - moviesPerPage);
  };

  const visibleMovies = movies.slice(currentMovieIndex, currentMovieIndex + moviesPerPage);

  
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl text-gray-400">Just Added</h2>
        <div className="flex space-x-2">
          <button onClick={prevMovies} className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition">
            <ChevronLeft size={20} />
          </button>
          <button onClick={nextMovies} className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition">
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      <div className="relative overflow-hidden">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {visibleMovies.map((movie) => (
            <div key={movie.id} className="rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-md transition transform hover:scale-105 duration-300">
              <div className="relative group">
                <img src={movie.image} alt={movie.title} className="w-full h-auto" />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button className="bg-white text-black px-4 py-2 rounded-full transform -translate-y-2 group-hover:translate-y-0 transition-transform">Watch Now</button>
                </div>
              </div>
              <div className="p-3">
                <h3 className="font-semibold text-gray-800">{movie.title}</h3>
                <p className="text-sm text-gray-400">{movie.genre}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MediaCarousel;
