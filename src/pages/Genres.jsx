// src/components/GenresPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import actionImage from '../media/Action-movies.jpg';
import dramaImage from '../media/Drama-movies.jpg';
import comedyImage from '../media/comedy-movies.jpg';
import thrillerImage from '../media/Thriller-movie.jpg';
import horrorImage from '../media/Horror-movies.jpg';
import romanceImage from '../media/Romance-movies.jpg';

const Genres = () => {
  const genres = [
    { name: 'Action', path: '/genres/action', imageUrl: actionImage },
    { name: 'Drama', path: '/genres/drama', imageUrl: dramaImage },
    { name: 'Comedy', path: '/genres/comedy', imageUrl: comedyImage },
    { name: 'Thriller', path: '/genres/thriller', imageUrl: thrillerImage },
    { name: 'Horror', path: '/genres/horror', imageUrl: horrorImage },
    { name: 'Romance', path: '/genres/romance', imageUrl: romanceImage },
  ];

  return (
    <div className="min-h-screen bg-gray-900"> {/* Background for the entire page */}
      <div className="p-8 mb-4 mx-auto max-w-6xl"> {/* Centered content */}
        <h1 className="text-4xl font-bold mb-6 text-center text-yellow-400">Discover Your Favourite Genre</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {genres.map((genre) => (
            <Link
              key={genre.name}
              to={genre.path}
              className="relative block border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <img
                src={genre.imageUrl} // Use the imported image for each genre
                alt={genre.name}
                className="w-full h-56 object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white text-xl font-semibold opacity-0 hover:opacity-100 transition-opacity duration-300">
                {genre.name}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Genres;
