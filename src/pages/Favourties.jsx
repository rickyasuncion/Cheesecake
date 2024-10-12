import React, { useEffect, useState } from "react";
import { fetchData } from "../_utils/utils";
import { MovieCard } from "../components/ui/MovieCard";
import { Button } from "../components/ui/button";
import { IoIosRemoveCircle } from "react-icons/io";
import { useTranslation } from "react-i18next";

const Favourties = () => {
  const [favouriteMovies, setFavouritesMovies] = useState([]);
  const [favouriteTv, setFavouriteTv] = useState([]);
  const { t, i18n } = useTranslation();

  async function fetchAndSetFavouriteMovies() {
    const favMovies = JSON.parse(localStorage.getItem("favouriteMovies"));

    if (!favMovies) {
      return;
    }

    // try to find ids in movies
    const moviePromises = favMovies.map((movieId) => {
      const moviePromise = fetchData(
        `https://api.themoviedb.org/3/movie/${movieId}?api_key=bbd89781c7835917a2decb4989b56470&language=${i18n.language}`
      );
      return moviePromise;
    });

    const movies = await Promise.all(moviePromises);

    const filteredMovies = movies.map((res) => ({
      id: res.id,
      title: res.title,
      name: res.name,
      poster_path: res.poster_path,
    }));

    setFavouritesMovies(filteredMovies);
  }

  async function fetchAndSetFavouriteTv() {
    const favTv = JSON.parse(localStorage.getItem("favouriteTv"));

    if (!favTv) {
      return;
    }

    const tvPromises = favTv.map((tvId) => {
      const tvShow = fetchData(
        `https://api.themoviedb.org/3/tv/${tvId}?api_key=bbd89781c7835917a2decb4989b56470&language=${i18n.language}`
      );
      return tvShow;
    });
    const tvShows = await Promise.all(tvPromises);
    const filteredTv = tvShows.map((res) => ({
      id: res.id,
      title: res.title,
      name: res.name,
      poster_path: res.poster_path,
    }));
    setFavouriteTv(filteredTv);
  }

  useEffect(() => {
    fetchAndSetFavouriteMovies();
    fetchAndSetFavouriteTv();
  }, []);

  function handleRemoveFavourite(id, contentType) {
    if (contentType === "movie") {
      const data = JSON.parse(localStorage.getItem("favouriteMovies"));
      localStorage.setItem(
        "favouriteMovies",
        JSON.stringify(data.filter((fav) => fav != id))
      );
      fetchAndSetFavouriteMovies();
    }
    if (contentType === "tv") {
      const data = JSON.parse(localStorage.getItem("favouriteTv"));
      localStorage.setItem(
        "favouriteTv",
        JSON.stringify(data.filter((fav) => fav != id))
      );
      fetchAndSetFavouriteTv();
    }
  }

  return (
    <div className="container py-4">
      <h1 className="text-lg font-semibold underline">
        {t("Favourite Movies")}
      </h1>
      <div className="flex flex-wrap gap-2 p-2">
        {favouriteMovies.map((movie) => (
          <div className="relative max-w-[200px] " key={movie.id}>
            <Button
              variant="destructive"
              onClick={() => handleRemoveFavourite(movie.id, "movie")}
              className="absolute z-10 p-1.5 text-neutral-100 h-auto right-2 top-2"
            >
              <IoIosRemoveCircle />
            </Button>
            <MovieCard
              key={movie.id}
              id={movie.id}
              imageUrl={movie.imageUrl}
              media_type={"movie"}
              title={movie.title}
              name={movie.name}
              poster_path={movie.poster_path}
              showFavButton={false}
            />
          </div>
        ))}
      </div>

      <h1 className="text-lg font-semibold underline">
        {t("Favourite TV Shows")}
      </h1>
      <div className="flex flex-wrap gap-2 p-2">
        {favouriteTv.map((show) => (
          <div className="relative max-w-[200px] " key={show.id}>
            <Button
              variant="destructive"
              onClick={() => handleRemoveFavourite(show.id, "tv")}
              className="absolute z-10 p-1.5 text-neutral-100 h-auto right-2 top-2"
            >
              <IoIosRemoveCircle />
            </Button>
            <MovieCard
              key={show.id}
              id={show.id}
              imageUrl={show.imageUrl}
              media_type={"tv"}
              title={show.title}
              name={show.name}
              poster_path={show.poster_path}
              showFavButton={false}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favourties;
