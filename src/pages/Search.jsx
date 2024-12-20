import React, { useContext, useEffect, useState } from "react";
import {
  Search as SearchIcon,
  Film,
  Tv,
  Clock,
  LineChart,
  Heart,
  BookmarkPlus,
} from "lucide-react";
import { useParams } from "react-router-dom";
import { fetchData } from "../_utils/utils";
import { deleteUserFavourite, updateUserFavourites } from "../_utils/firestore";
import ListModal from "../components/ListsPage/ListModal";
import { UserData } from "../providers/UserDataProvider";
import { auth } from "../_utils/firebase";

const Search = () => {
  const { searched } = useParams();
  const { userData } = useContext(UserData);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeM, setActiveM] = useState(false);
  const [activeT, setActiveT] = useState(false);
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [recentSearches, setRecentSearches] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // New state for modal visibility and selected media
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState(null);

  useEffect(() => {
    const getData = async () => {
      let data = await fetchData(
        `https://api.themoviedb.org/3/search/multi?query=${searched}&include_adult=false&language=en-US&page=1&api_key=bbd89781c7835917a2decb4989b56470`
      );
      data = data.results.filter((data) => data.media_type !== "person");
      setMovies(data);
      setFilteredMovies(data);
    };

    getData();
    setRecentSearches(JSON.parse(localStorage.getItem("recentSearches")));
  }, [searched]);

  useEffect(() => {
    if (activeM) {
      setFilteredMovies(movies.filter((movie) => movie.media_type === "movie"));
    } else if (activeT) {
      setFilteredMovies(movies.filter((movie) => movie.media_type === "tv"));
    } else {
      setFilteredMovies(movies);
    }
  }, [activeM, activeT, movies]);

  useEffect(() => {
    setFavorites(userData?.favourites || []);
    setBookmarks(userData?.lists || []);
  }, [userData]);

  const submitHandler = (e) => {
    e.preventDefault();
    let recent = recentSearches
      ? [...new Set(recentSearches), searchQuery]
      : [searchQuery];
    if (recent.length > 5) {
      recent = recent.splice(1, 5);
    }
    localStorage.setItem("recentSearches", JSON.stringify(recent));
    window.location.href = `/search/${searchQuery}`;
  };

  const mediaHandler = (m) => {
    if (m === "movie") {
      setActiveM(!activeM);
      setActiveT(false);
    }
    if (m === "tv") {
      setActiveT(!activeT);
      setActiveM(false);
    }
  };

  const toggleFavorite = async (item) => {
    if (isLoading) return;
    setIsLoading(true);

    try {
      const isFavorite = favorites.some((fav) => fav.id === item.id);
      if (isFavorite) {
        await deleteUserFavourite({ type: item.media_type, id: item.id });
        setFavorites(favorites.filter((fav) => fav.id !== item.id));
      } else {
        await updateUserFavourites({
          id: item.id,
          type: item.media_type,
          title: item.title || item.name,
          poster_path: item.poster_path,
          added_at: new Date().toISOString(),
        });
        setFavorites([...favorites, item]);
      }
    } catch (error) {
      console.error("Error updating favorites:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddToList = (item) => {
    setSelectedMedia(item);
    setIsModalOpen(true);
  };

  const MediaCard = ({
    title,
    name,
    media_type,
    poster_path,
    first_air_date,
    release_date,
    id,
  }) => {
    const isFavorite = favorites.some((fav) => fav.id === id);

    return (
      <div className="flex flex-col space-y-2">
        <a href={`/details/${media_type}/${id}`}>
          <div className="relative group">
            <img
              src={`https://image.tmdb.org/t/p/w500${poster_path}`}
              alt={title}
              className="rounded-lg w-full h-[300px] object-cover transition-transform duration-200 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity duration-200 rounded-lg" />
          </div>
          <h3 className="font-medium text-gray-900">{title || name}</h3>
        </a>
        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-500">{media_type}</p>
          <p className="text-sm text-gray-500">
            {release_date || first_air_date}
          </p>
        </div>
        {auth.currentUser && (
          <div className="flex space-x-4">
            <button
              onClick={() =>
                toggleFavorite({ id, media_type, title, name, poster_path })
              }
              disabled={isLoading}
              className={`p-2 rounded-full hover:bg-gray-200 transition-colors ${
                isFavorite ? "text-red-500" : "text-gray-500"
              }`}
            >
              <Heart
                size={24}
                fill={isFavorite ? "currentColor" : "none"}
                className="transition-colors"
              />
            </button>
            <button
              onClick={() => handleAddToList({ id: id, type: media_type })}
              className="p-2 rounded-full hover:bg-gray-200 transition-colors text-gray-500"
            >
              <BookmarkPlus size={24} />
            </button>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Search Header */}
      <form
        onSubmit={(e) => submitHandler(e)}
        className="bg-gray-50 border-b border-gray-200"
      >
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="relative">
            <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for movies, shows, genres..."
              className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none transition-colors duration-200"
            />
          </div>
        </div>
      </form>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Quick Filters */}
        <div className="flex space-x-4 mb-8">
          <button
            onClick={() => mediaHandler("movie")}
            className={`px-4 py-2 ${
              activeM ? "bg-red-50 text-red-600" : "bg-gray-50 text-gray-600"
            } rounded-lg flex items-center space-x-2`}
          >
            <Film className="w-4 h-4" />
            <span>Movies</span>
          </button>
          <button
            onClick={() => mediaHandler("tv")}
            className={`px-4 py-2 ${
              activeT ? "bg-red-50 text-red-600" : "bg-gray-50 text-gray-600"
            } rounded-lg flex items-center space-x-2`}
          >
            <Tv className="w-4 h-4" />
            <span>TV Shows</span>
          </button>
        </div>

        {/* Recent Searches */}
        {recentSearches && (
          <div className="mb-12">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium text-gray-900">
                Recent Searches
              </h2>
              <button
                onClick={() => {
                  localStorage.removeItem("recentSearches");
                  setRecentSearches();
                }}
                className="text-sm text-red-600 hover:text-red-700"
              >
                Clear all
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {recentSearches.map((search, index) => (
                <button
                  key={index}
                  className="flex items-center space-x-2 px-4 py-2 bg-gray-50 rounded-lg text-gray-600 hover:bg-gray-100"
                >
                  <Clock className="w-4 h-4" />
                  <span>
                    <a href={`/search/${search}`}>{search}</a>
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Trending Section */}
        <div>
          <div className="flex items-center space-x-2 mb-6">
            <LineChart className="w-5 h-5 text-red-600" />
            <h2 className="text-lg font-medium text-gray-900">Trending Now</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {filteredMovies.map((item) => (
              <MediaCard key={item.id} {...item} />
            ))}
          </div>
        </div>
      </div>
      {/* List Modal */}
      {isModalOpen && (
        <ListModal
          isOpen={isModalOpen}
          setIsOpen={setIsModalOpen}
          userData={userData}
          type={selectedMedia.type}
          id={selectedMedia.id}
        />
      )}
    </div>
  );
};

export default Search;
