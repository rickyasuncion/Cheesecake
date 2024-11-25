import React, { useContext, useEffect, useState } from "react";
import Favourited from "../components/FavouritesPage/Favourited";
import Sidebar from "../components/FavouritesPage/Sidebar";
import { UserData } from "../providers/UserDataProvider";
import { fetchData } from "../_utils/utils";
import { useTranslation } from "react-i18next";
import { auth } from "../_utils/firebase";
import AccountNotice from "../components/AccountNotice";

const Favourites = () => {
  const { t, i18n } = useTranslation();
  const { userData } = useContext(UserData);

  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [favoriteShows, setFavoriteShows] = useState([]);

  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showSimilarPanel, setShowSimilarPanel] = useState(false);
  const [similarMovies, setSimilarMovies] = useState([]);

  const handleShowSimilar = async ({ title, type, id }) => {
    const data = await fetchData(
      `https://api.themoviedb.org/3/${type}/${id}/recommendations?api_key=bbd89781c7835917a2decb4989b56470&language=${i18n.language}`
    );
    setSimilarMovies(data.results);
    setSelectedMovie(title);
    setShowSimilarPanel(true);
  };

  useEffect(() => {
    if (userData) {
      const shows = userData.favourites.filter((fav) => fav.type === "tv");
      const movies = userData.favourites.filter((fav) => fav.type === "movie");
      setFavoriteMovies(movies);
      setFavoriteShows(shows);
    }
  }, [userData]);

  if (!auth.currentUser) return <AccountNotice/>;

  return (
    <div className="flex justify-center">
      <div className="flex flex-col justify-start items-center">
        <Favourited
          title={t("Movies")}
          favorites={favoriteMovies}
          handleShowSimilar={handleShowSimilar}
        />

        <Favourited
          title={t("Shows")}
          favorites={favoriteShows}
          handleShowSimilar={handleShowSimilar}
        />
      </div>

      {showSimilarPanel && selectedMovie && (
        <Sidebar
          selectedMovie={selectedMovie}
          setShowSimilarPanel={setShowSimilarPanel}
          similarMovies={similarMovies}
        />
      )}
    </div>
  );
};

export default Favourites;
