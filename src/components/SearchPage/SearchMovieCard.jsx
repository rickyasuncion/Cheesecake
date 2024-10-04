import React from "react";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";

const SearchCardMovie = ({
  id,
  media_type,
  title,
  name,
  poster_path,
  showFavButton = true,
  release_date,
  first_air_date,
  description,
}) => {
  const detailPath = `/details/${media_type}/${id}`;

  return (
<Link
  to={detailPath}
  key={id}
  className="flex flex-col justify-between mb-4 md:flex-row w-full md:w-2/3 space-y-2 md:space-y-0 md:space-x-4 border border-gray-300 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-4"
>
  <img
    src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
    alt={media_type === "movie" ? title : name} // More descriptive alt text
    className="h-56 w-full md:w-1/4 rounded-lg object-cover" // Use object-cover for better image fitting
  />
  <div className="w-full md:w-3/4 flex flex-col justify-between p-4 border-l border-gray-300 md:pl-4">
    <div>
      {media_type === "movie" ? (
        <h1 className="text-xl font-bold">{title}</h1>
      ) : (
        <h1 className="text-xl font-bold">{name}</h1>
      )}
      <h2 className="text-gray-500 text-sm">
        {media_type === "movie" ? release_date : first_air_date}
      </h2>
    </div>
    <p className="text-gray-700 mt-2">{description}</p>
  </div>
</Link>

  );
};

export default SearchCardMovie;
