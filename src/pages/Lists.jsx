import React, { useContext, useEffect, useState } from "react";
import { List, Clock, Loader, Trash2 } from "lucide-react";
import { auth } from "../_utils/firebase";
import AccountNotice from "../components/AccountNotice";
import { UserData } from "../providers/UserDataProvider";
import { fetchData } from "../_utils/utils";
import { useTranslation } from "react-i18next";
import CreateList from "../components/ListsPage/CreateList";
import { deleteUserList, removeUserListItem } from "../_utils/firestore";
import { useNavigate } from "react-router-dom";

const Lists = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const GENRES = {
    28: t("Action"),
    12: t("Adventure"),
    16: t("Animation"),
    35: t("Comedy"),
    80: t("Crime"),
    99: t("Documentary"),
    18: t("Drama"),
    10751: t("Family"),
    14: t("Fantasy"),
    36: t("History"),
    27: t("Horror"),
    10402: t("Music"),
    9648: t("Mystery"),
    10749: t("Romance"),
    878: t("Science Fiction"),
    10770: t("TV Movie"),
    53: t("Thriller"),
    10752: t("War"),
    37: t("Western"),
    10759: t("Action & Adventure"),
    10762: t("Kids"),
    10763: t("News"),
    10764: t("Reality"),
    10765: t("Sci-Fi & Fantasy"),
    10766: t("Soap"),
    10767: t("Talk"),
    10768: t("War & Politics"),
  };

  const { userData } = useContext(UserData);
  const [watchlists, setWatchlists] = useState([]);
  const [selectedList, setSelectedList] = useState(null);

  useEffect(() => {
    if (userData?.lists) {
      const transformedLists = userData.lists.map((list, index) => ({
        id: index + 1,
        name: list.name,
        items: list.items || [],
      }));
      setWatchlists(transformedLists);
    }
  }, [userData]);

  const handleDeleteList = async (listName) => {
    if (!userData?.id) return;
    const confirmDelete = window.confirm(
      `Are you sure you want to delete the list "${listName}"?`
    );
    if (!confirmDelete) return;

    try {
      await deleteUserList(userData.id, listName);
      setWatchlists((prev) => prev.filter((list) => list.name !== listName));
      if (selectedList?.name === listName) setSelectedList(null);
    } catch (error) {
      console.error(`Failed to delete list ${listName}:`, error);
    }
  };

  const handleRemoveItem = async (listName, item) => {
    if (!userData?.id) return;

    const confirmRemove = window.confirm(
      `Are you sure you want to remove "${item.type}" from the list "${listName}"?`
    );
    if (!confirmRemove) return;

    try {
      await removeUserListItem(userData.id, listName, item);

      setWatchlists((prev) =>
        prev.map((list) =>
          list.name === listName
            ? { ...list, items: list.items.filter((i) => i.id !== item.id) }
            : list
        )
      );

      if (selectedList?.name === listName) {
        setSelectedList((prev) => ({
          ...prev,
          items: prev.items.filter((i) => i.id !== item.id),
        }));
      }
    } catch (error) {
      console.error(`Failed to remove item:`, error);
    }
  };

  const WatchlistCard = ({
    name,
    items = [],
    isSelected,
    onClick,
    onDelete,
  }) => (
    <div
      className={`w-full text-left p-4 rounded-lg border flex justify-between items-center transition-all duration-200 
        ${
          isSelected
            ? "border-yellow-500 bg-yellow-50"
            : "border-gray-200 hover:border-yellow-200 hover:bg-gray-50"
        }`}
    >
      <div onClick={onClick} className="flex-1 cursor-pointer">
        <div className="flex items-center space-x-2">
          <List
            className={`w-5 h-5 ${
              isSelected ? "text-yellow-500" : "text-gray-400"
            }`}
          />
          <h3 className="font-medium text-gray-900">{name}</h3>
        </div>
        <div className="text-sm text-gray-500">{items.length} items</div>
      </div>
      <button
        onClick={onDelete}
        className="ml-4 p-1 text-gray-400 hover:text-yellow-500"
        aria-label={`Delete ${name}`}
      >
        <Trash2 />
      </button>
    </div>
  );

  const MediaCard = ({ type, id, onRemove }) => {
    const [movie, setMovie] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
      const fetchDataForMedia = async () => {
        try {
          setIsLoading(true);
          const data = await fetchData(
            `https://api.themoviedb.org/3/${type}/${id}?api_key=bbd89781c7835917a2decb4989b56470&language=${i18n.language}`
          );
          setMovie(data);
        } catch (err) {
          setError(t("errorLoadingMedia"));
        } finally {
          setIsLoading(false);
        }
      };

      if (type && id) fetchDataForMedia();
    }, [type, id, i18n.language]);

    if (isLoading) {
      return (
        <div className="flex items-center justify-center p-4">
          <Loader className="w-6 h-6 animate-spin text-gray-400" />
        </div>
      );
    }

    if (error) {
      return <div className="p-4 text-yellow-500 text-center">{error}</div>;
    }

    const { title, name, runtime, poster_path, genres } = movie;
    const displayTitle = title || name;
    const imageUrl = poster_path
      ? `https://image.tmdb.org/t/p/w500${poster_path}`
      : "/api/placeholder/200/300";
    const genre =
      genres?.length > 0
        ? GENRES[genres[0]?.id] || "Unknown Genre"
        : "Unknown Genre";

    return (
      <div className="flex space-x-4 p-4 rounded-lg hover:bg-gray-50">
        <button onClick={() => navigate(`/details/${type}/${id}`)}>
          <img
            src={imageUrl}
            alt={displayTitle}
            className="w-20 h-28 rounded-lg object-cover"
          />
        </button>
        <div className="flex-1">
          <a href={`/details/${type}/${id}`}>
            <h3 className="font-medium text-gray-900 mb-1">{displayTitle}</h3>
          </a>
          <p className="text-sm text-gray-500 mb-2">{genre}</p>
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            {runtime && (
              <>
                <Clock className="w-4 h-4" />
                <span>{runtime} min</span>
              </>
            )}
          </div>
          <p className="text-gray-500">{type}</p>
        </div>
        <button
          onClick={onRemove}
          className="ml-4 p-1 text-gray-400 hover:text-yellow-500"
          aria-label="Remove item"
        >
          <Trash2 />
        </button>
      </div>
    );
  };

  if (!auth.currentUser) return <AccountNotice />;

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-semibold text-gray-900">My Lists</h1>
            <CreateList userData={userData} />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex space-x-8">
          <div className="w-80 space-y-4">
            {watchlists.map((list) => (
              <WatchlistCard
                key={list.id}
                {...list}
                isSelected={selectedList?.id === list.id}
                onClick={() => setSelectedList(list)}
                onDelete={() => handleDeleteList(list.name)}
              />
            ))}
          </div>

          <div className="flex-1">
            {selectedList ? (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-1">
                      {selectedList.name}
                    </h2>
                  </div>
                </div>
                <div className="divide-y divide-gray-200">
                  {selectedList.items.length > 0 ? (
                    selectedList.items.map((item) => (
                      <MediaCard
                        key={`${item.type}-${item.id}`}
                        {...item}
                        onRemove={() =>
                          handleRemoveItem(selectedList.name, item)
                        }
                      />
                    ))
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      No items in list
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-96 text-center">
                <List className="w-12 h-12 text-gray-300 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {t("selectListToView")}
                </h3>
                <p className="text-sm text-gray-500">
                  {t("selectListDescription")}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Lists;
