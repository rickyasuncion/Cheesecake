import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "./button";
import { Heart, BookmarkPlus } from "lucide-react";
import { cn } from "./lib/utils";
import { useTranslation } from "react-i18next";
import ListModal from "../ListsPage/ListModal";
import { deleteUserFavourite, updateUserFavourites } from "../../_utils/firestore";

const MovieCard = ({ id, media_type, title, name, poster_path, userData, className }) => {
  const { t } = useTranslation();
  const detailPath = `/details/${media_type}/${id}`;
  const [isListModalOpen, setIsListModalOpen] = useState(false);

  // Check if the movie/show is already in user's favorites
  const isFavourite = userData ? userData.favourites.some((fav) => fav.type === media_type && fav.id === id) : false;

  // Handle adding or removing from favorites
  const handleFavouriteToggle = () => {
    if (!userData) {
      alert(t("Please log in to add to favorites"));
      return;
    }

    if (isFavourite) {
      deleteUserFavourite({ type: media_type, id });
    } else {
      updateUserFavourites({ type: media_type, id });
    }
  };

  return (
    <div className={`relative max-w-[200px] group ${cn(className)}`}>
      <div className="relative group">
        <Link to={detailPath}>
          <div className="rounded-md overflow-hidden">
            {poster_path && (
              <img
                src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
                alt={media_type === "movie" ? title : name}
                className="group-hover:scale-110 transition-transform duration-200"
              />
            )}
          </div>
          <h3 className="font-medium text-sm mt-2">{title || name}</h3>
        </Link>

        {userData && (
          <div className="absolute top-2 right-2 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <Button
              onClick={handleFavouriteToggle}
              className={`z-30 p-1 h-fit shadow shadow-black 
                ${isFavourite ? 'bg-rose-600 text-white' : 'bg-white text-rose-500'}`}
            >
              <Heart className={isFavourite ? 'fill-white' : ''} size={20} />
            </Button>

            <Button
              onClick={() => {
                setIsListModalOpen(true);
              }}
              className="z-30 p-1 h-fit shadow shadow-black bg-white text-blue-500"
            >
              <BookmarkPlus size={20} />
            </Button>
          </div>
        )}
      </div>

      <ListModal 
        isOpen={isListModalOpen} 
        setIsOpen={setIsListModalOpen} 
        userData={userData} 
        type={media_type} 
        id={id} 
      />
    </div>
  );
};

export { MovieCard };
