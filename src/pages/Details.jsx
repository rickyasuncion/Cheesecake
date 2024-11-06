import React from "react";
import { useParams } from "react-router-dom";
import MovieDetails from "../components/DetailsPage/MovieDetails";

const MovieDetailsPage = () => {
  const { type, id } = useParams();

  return (
    <React.Fragment>
      {type === "movie" && <MovieDetails id={id} />}
    </React.Fragment>
  );
};

export default MovieDetailsPage;
