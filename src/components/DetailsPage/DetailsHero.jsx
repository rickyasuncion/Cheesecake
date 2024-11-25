import { Heart, Play, Star, Bookmark, BookmarkPlus } from "lucide-react";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import ListModal from "../ListsPage/ListModal";
import { UserData } from "../../providers/UserDataProvider";
import { deleteUserFavourite, updateUserFavourites } from "../../_utils/firestore";

const DetailsHero = ({ type, id, movie, trailerVideo }) => {
  const { t } = useTranslation();
  const { userData } = useContext(UserData);

  const videoRef = useRef(null);
  const [showTrailer, setShowTrailer] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (showTrailer && trailerVideo && videoRef.current) {
      videoRef.current.src = `https://www.youtube.com/embed/${trailerVideo.key}?enablejsapi=1&modestbranding=1&controls=1&showinfo=0&rel=0&autoplay=1`;
    }
  }, [showTrailer, trailerVideo]);

  useEffect(() => {
    if (userData?.lists) {
      const isInAnyList = userData.lists.some(list =>
        list.items.some(item => item.type === type && item.id === id)
      );
      setIsBookmarked(isInAnyList);
    }

    if (userData?.favourites) {
      const isFav = userData.favourites.some(
        fav => fav.type === type && fav.id === id
      );
      setIsFavorite(isFav);
    }
  }, [userData, type, id]);

  const handlePlayPause = (event) => {
    event.preventDefault();
    if (!showTrailer) {
      setShowTrailer(true);
      setIsPlaying(true);
    } else {
      if (videoRef.current?.contentWindow) {
        const action = isPlaying ? "pauseVideo" : "playVideo";
        videoRef.current.contentWindow.postMessage(
          `{"event":"command","func":"${action}","args":""}`,
          "*"
        );
        setIsPlaying(!isPlaying);
      }
    }
  };

  const handleFavoriteClick = async () => {
    if (isLoading) return;
    
    setIsLoading(true);
    try {
      const favoriteObject = {
        id,
        type,
        title: movie.title || movie.name,
        poster_path: movie.poster_path,
        added_at: new Date().toISOString()
      };

      if (isFavorite) {
        await deleteUserFavourite({ type, id });
        setIsFavorite(false);
      } else {
        await updateUserFavourites(favoriteObject);
        setIsFavorite(true);
      }
    } catch (error) {
      console.error("Error toggling favorite:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="relative h-[600px] overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent" />
          {!showTrailer && (
            <img
              src={`https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`}
              alt={movie.title}
              className="w-full rounded-md mb-4"
            />
          )}
          {showTrailer && trailerVideo && (
            <iframe
              ref={videoRef}
              width="100%"
              height="500px"
              title="Movie Trailer"
              style={{ border: "none", position: "relative", zIndex: 1 }}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
            ></iframe>
          )}
        </div>

        <div
          className={`relative h-full container mx-auto px-6 flex items-end pb-16 transition-transform duration-500 ${
            showTrailer ? "translate-y-8 opacity-90 backdrop-blur-sm" : ""
          }`}
        >
          <div className="max-w-3xl">
            <h1 className="text-6xl font-bold mb-4">
              {movie.title || movie.name}
            </h1>
            <p className="text-2xl text-gray-300 mb-6">{movie.tagline}</p>
            <div className="flex items-center gap-6">
              <button
                onClick={handlePlayPause}
                className="flex items-center gap-2 bg-yellow-600 hover:bg-yellow-700 px-8 py-3 rounded-full font-semibold transition-colors"
              >
                <Play size={20} />
                {isPlaying ? t("Pause") : t("Watch Trailer")}
              </button>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Star className="text-yellow-400" fill="currentColor" />
                  <span className="text-xl font-semibold">
                    {movie.vote_average?.toFixed(2)}
                  </span>
                  <span className="text-gray-400">/10</span>
                </div>

                <div className="flex items-center gap-4 ml-2">
                  <button 
                    onClick={handleFavoriteClick}
                    disabled={isLoading}
                    className={`p-2 hover:bg-white/10 rounded-full transition-colors group relative
                      ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    <Heart
                      size={24}
                      className={`transition-colors ${
                        isFavorite ? 'text-red-500' : 'text-white hover:text-red-500'
                      }`}
                      fill={isFavorite ? "currentColor" : "none"}
                    />
                    
                    <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-black/75 text-xs rounded 
                                   opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      {isFavorite ? t("Remove from favorites") : t("Add to favorites")}
                    </span>
                  </button>
                  
                  <button 
                    onClick={() => setIsModalOpen(true)}
                    className="p-2 hover:bg-white/10 rounded-full transition-colors group relative"
                  >
                    {isBookmarked ? (
                      <Bookmark
                        size={24}
                        className="text-yellow-500"
                        fill="currentColor"
                      />
                    ) : (
                      <BookmarkPlus
                        size={24}
                        className="text-white group-hover:text-yellow-500 transition-colors"
                      />
                    )}
                    
                    <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-black/75 text-xs rounded 
                                   opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      {isBookmarked ? t("Saved") : t("Save to list")}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ListModal
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        userData={userData}
        type={type}
        id={id}
      />
    </>
  );
};

export default DetailsHero;