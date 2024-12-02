import React, { useState, useRef } from "react";
import { Plus, Check, X } from "lucide-react";
import { updateUserLists } from "../../_utils/firestore";
import { useTranslation } from "react-i18next";

const CreateList = ({ userData }) => {
  const { t } = useTranslation();
  const [playlistName, setPlaylistName] = useState("");
  const [newPlaylist, setNewPlaylist] = useState(false);
  const inputRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (playlistName.trim()) {
      try {
        await updateUserLists(userData.id, playlistName);
        setPlaylistName("");
        setNewPlaylist(false);
      } catch (error) {
        console.error("Failed to create playlist:", error);
      }
    }
  };

  const handleCancel = () => {
    setPlaylistName("");
    setNewPlaylist(false);
  };
  return (
    <div>
      {newPlaylist ? (
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <form onSubmit={handleSubmit} className="relative">
            <input
              ref={inputRef}
              value={playlistName}
              onChange={(e) => setPlaylistName(e.target.value)}
              placeholder="Enter list name"
              maxLength={150}
              className="w-full py-2 px-3 text-sm bg-white text-gray-900 placeholder-gray-500 
                      focus:outline-none focus:ring-2 focus:ring-yellow-500"
              type="text"
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
              {playlistName.trim() && (
                <button
                  type="submit"
                  className="p-1.5 hover:bg-gray-100 rounded-full transition-colors"
                  title="Create list"
                >
                  <Check size={16} className="text-green-500" />
                </button>
              )}
              <button
                type="button"
                onClick={handleCancel}
                className="p-1.5 hover:bg-gray-100 rounded-full transition-colors"
                title="Cancel"
              >
                <X size={16} className="text-gray-400" />
              </button>
            </div>
          </form>
        </div>
      ) : (
        <button
          onClick={() => setNewPlaylist(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700"
        >
          <Plus className="w-5 h-5" />
          <span>{t("Create List")}</span>
        </button>
      )}
    </div>
  );
};

export default CreateList;
