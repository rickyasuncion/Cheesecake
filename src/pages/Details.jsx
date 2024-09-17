import React from "react";
import { useParams } from "react-router-dom";
import Header from '../components/Layout/Header';
import MovieDetails from "../components/DetailsPage/MovieDetails";
import ShowDetails from "../components/DetailsPage/ShowDetails";

const MovieDetailsPage = () => {
  const { type, id } = useParams();

  return (
    <React.Fragment>
      <Header></Header>
      {type === "movie" && <MovieDetails id={id} />}
      {type === "tv" && <ShowDetails id={id} />}
    </React.Fragment>
  );
};

export default MovieDetailsPage;
