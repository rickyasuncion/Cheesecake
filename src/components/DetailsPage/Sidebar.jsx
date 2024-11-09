import React, { useEffect, useState } from "react";

const GENRES = {
  28: "Action",
  12: "Adventure",
  16: "Animation",
  35: "Comedy",
  80: "Crime",
  99: "Documentary",
  18: "Drama",
  10751: "Family",
  14: "Fantasy",
  36: "History",
  27: "Horror",
  10402: "Music",
  9648: "Mystery",
  10749: "Romance",
  878: "Science Fiction",
  10770: "TV Movie",
  53: "Thriller",
  10752: "War",
  37: "Western",
};

const Sidebar = ({ movie, crews }) => {
  const [directors, setDirectors] = useState([]);

  useEffect(() => {
    if (crews) {
      const filteredData = crews.filter((crew) => crew.job === "Director");
      setDirectors(filteredData);
    }
  }, [crews]);

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-2">Details</h3>
        <div className="space-y-3 text-gray-300">
          <div>
            <span className="text-gray-500">Release Date:</span> {movie.release_date || movie.first_air_date}
          </div>
          <div>
            <span className="text-gray-500">Revenue:</span> ${movie.revenue && movie.revenue.toLocaleString()}
          </div>
          <div>
            <span className="text-gray-500">Runtime:</span> {movie.runtime} mins  
          </div>
          <div>
            <span className="text-gray-500">Director:</span> {directors.length > 0 ? directors.map((director) => director.name).join(", ") : "No Director"}
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Genres</h3>
        <div className="flex flex-wrap gap-2">
          {movie.genres && movie.genres.map((genre, index) => (
            <span 
              key={index}
              className="px-3 py-1 bg-gray-800 rounded-full text-sm text-gray-300"
            >
              {GENRES[genre.id]}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
