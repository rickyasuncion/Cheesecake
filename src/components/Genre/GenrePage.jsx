// src/components/GenrePage.jsx
import React from 'react';
import Card from '../ui/card'; // Adjust the import based on your file structure

const GenrePage = ({ title, genres }) => {
  return (
    <div>
      <h2 className="text-lg mb-2 font-medium">{title}</h2>
      <div className="flex gap-3 flex-wrap text-white">
        {genres.map((genre) => (
          <Card
            key={genre.id}
            title={genre.name}
            href={`/movies/${title.toLowerCase()}/genre/${genre.id}`} // Adjust href as needed
            className={"min-w-56 max-w-60 flex-1"}
            bgImage={`https://image.tmdb.org/t/p/w500/${genre.backdrop_path}`}
          />
        ))}
      </div>
    </div>
  );
};

export default GenrePage;
