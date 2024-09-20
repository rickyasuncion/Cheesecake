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
      className="flex flex-col justify-center mb-4 md:flex-row w-2/3 space-y-2 md:space-y-0 md:space-x-4 border border-gray-300 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
    >
      <img
        src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
        alt=""
        className="h-56 w-full md:w-1/4 rounded-lg object-contain"
      />
      <div className="w-4/5">
        {media_type === "movie" ? (
          <h1 className="text-xl font-bold">{title}</h1>
        ) : (
          <h1 className="text-xl font-bold">{name}</h1>
        )}
        <h2 className="text-gray-500">
          {media_type === "movie" ? release_date : first_air_date}
        </h2>
        <p className="text-gray-700">{description}</p>
      </div>
    </Link>
  );
};

export default SearchCardMovie;
