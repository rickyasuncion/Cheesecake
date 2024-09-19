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
    <React.Fragment>
      <div>
        <p>Search Results</p>
        <p>Movies</p>
        <p>TV</p>
      </div>
      <Link
        to={detailPath}
        key={id}
        className="flex flex-col md:flex-row w-7/12 space-y-2 md:space-y-0 md:space-x-4 border border-gray-300 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
      >
        <img
          src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
          alt=""
          className="h-52 w-full md:w-1/4 rounded-lg object-contain"
        />
        <div className="flex flex-col justify-between">
          {media_type === "movie" ? (
            <h1 className="text-xl font-bold">{title}</h1>
          ) : (
            <h1 className="text-xl font-bold">{name}</h1>
          )}
          <h2 className="text-gray-500">
            {media_type === "movie" ? release_date : first_air_date}
          </h2>
          <p className="text-gray-700">{description}</p>
          {showFavButton && (
            <button className="z-10 absolute top-2 right-2 p-1 h-fit  shadow shadow-black text-red-900 bg-red-400">
              <FaHeart />
            </button>
          )}
        </div>
      </Link>
    </React.Fragment>
  );
};

export default SearchCardMovie;
