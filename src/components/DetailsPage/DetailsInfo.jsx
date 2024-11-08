import React from "react";

const DetailsInfo = ({ movie, t }) => {
  return (
    <>
      <div>
        <h2 className="text-2xl font-semibold mb-4">Overview</h2>
        <p className="text-gray-300 leading-relaxed">{movie.description}</p>
      </div>
      <div>
        <h2 className="text-2xl font-semibold mb-4">Cast</h2>
        <div className="grid grid-cols-2 gap-4">
          {movie.cast.map((actor, index) => (
            <div key={index} className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gray-700" />
              <span className="text-gray-300">{actor}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default DetailsInfo;
