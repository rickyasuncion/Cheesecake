import React, { useState } from "react";
import Favourited from "../components/FavouritesPage/Favourited";
import Sidebar from "../components/FavouritesPage/Sidebar";

const Favourites = () => {
  const [favorites, setFavorites] = useState([
    {
      id: 1,
      title: "The Shawshank Redemption",
      year: 1994,
      rating: 4.8,
      genre: "Drama",
      imageUrl: "/api/placeholder/300/450",
    },
    {
      id: 2,
      title: "The Godfather",
      year: 1972,
      rating: 4.7,
      genre: "Crime, Drama",
      imageUrl: "/api/placeholder/300/450",
    },
    {
      id: 3,
      title: "Pulp Fiction",
      year: 1994,
      rating: 4.6,
      genre: "Crime, Drama",
      imageUrl: "/api/placeholder/300/450",
    },
    {
      id: 4,
      title: "The Green Mile",
      year: 1999,
      rating: 4.5,
      genre: "Drama",
      imageUrl: "/api/placeholder/300/450",
    },
    {
      id: 5,
      title: "Goodfellas",
      year: 1990,
      rating: 4.6,
      genre: "Crime, Drama",
      imageUrl: "/api/placeholder/300/450",
    },
  ]);

  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showSimilarPanel, setShowSimilarPanel] = useState(false);

  const removeFromFavorites = (id) => {
    setFavorites(favorites.filter((movie) => movie.id !== id));
    if (selectedMovie?.id === id) {
      setSelectedMovie(null);
      setShowSimilarPanel(false);
    }
  };

  const getSimilarMovies = (selectedMovie) => {
    return favorites.filter(
      (movie) =>
        movie.id !== selectedMovie.id &&
        movie.genre
          .split(", ")
          .some((genre) => selectedMovie.genre.includes(genre))
    );
  };

  const handleShowSimilar = (movie) => {
    setSelectedMovie(movie);
    setShowSimilarPanel(true);
  };

  return (
    <div className="flex justify-center">
      <div className="flex flex-col justify-center items-center">
        <Favourited
          title={"Movies"}
          favorites={favorites}
          handleShowSimilar={handleShowSimilar}
        />
        <Favourited
          title={"Shows"}
          favorites={favorites}
          handleShowSimilar={handleShowSimilar}
        />
      </div>

      {showSimilarPanel && selectedMovie && (
        <Sidebar
          selectedMovie={selectedMovie}
          setShowSimilarPanel={setShowSimilarPanel}
          getSimilarMovies={getSimilarMovies}
        />
      )}
    </div>
  );
};

export default Favourites;
