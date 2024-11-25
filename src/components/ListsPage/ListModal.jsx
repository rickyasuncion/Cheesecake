import React, { useState, useEffect, useRef } from "react";
import { X, BookmarkPlus, Check, Plus, Trash2 } from "lucide-react";
import {
  deleteUserList,
  removeUserListItem,
  updateUserListItem,
  updateUserLists,
  userData,
} from "../../_utils/firestore";

const ListModal = ({ isOpen, setIsOpen, userData, type, id }) => {
  const [newPlaylist, setNewPlaylist] = useState(false);
  const [playlistName, setPlaylistName] = useState("");
  const [lists, setLists] = useState([]);
  const [isDeleting, setIsDeleting] = useState(false);
  const modalRef = useRef(null);
  const inputRef = useRef(null);

  const initialCheckedState =
    userData?.lists.reduce((acc, list) => {
      acc[list.name] = list.items.some(
        (item) => item.type === type && item.id === id
      );
      return acc;
    }, {}) || {};

  const [checkedState, setCheckedState] = useState(initialCheckedState);

  useEffect(() => {
    if (userData) {
      setLists(userData.lists);
    }
  }, [userData]);

  useEffect(() => {
    if (userData) {
      const newCheckedState = userData.lists.reduce((acc, list) => {
        acc[list.name] = list.items.some(
          (item) => item.type === type && item.id === id
        );
        return acc;
      }, {});
      setCheckedState(newCheckedState);
    }
  }, [userData, type, id]);

  useEffect(() => {
    if (newPlaylist && inputRef.current) {
      inputRef.current.focus();
    }
  }, [newPlaylist]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleCheckboxChange = async (listName) => {
    const userId = userData.id;

    setCheckedState((prevState) => ({
      ...prevState,
      [listName]: !prevState[listName],
    }));

    const newItem = { type, id };

    try {
      if (checkedState[listName]) {
        await removeUserListItem(userId, listName, newItem);
      } else {
        await updateUserListItem(userId, listName, newItem);
      }
    } catch (error) {
      // Revert the checkbox state if the operation fails
      setCheckedState((prevState) => ({
        ...prevState,
        [listName]: !prevState[listName],
      }));
      console.error('Failed to update list:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (playlistName.trim()) {
      try {
        await updateUserLists(userData.id, playlistName);
        setPlaylistName("");
        setNewPlaylist(false);
      } catch (error) {
        console.error('Failed to create playlist:', error);
      }
    }
  };

  const handleCancel = () => {
    setPlaylistName("");
    setNewPlaylist(false);
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fade-in">
          <div
            ref={modalRef}
            className="bg-zinc-900 rounded-lg p-4 w-64 shadow-lg text-white"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm font-medium">Save to...</h3>
              <button
                className="p-1 text-gray-400 hover:text-white rounded-full hover:bg-zinc-800 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-2 max-h-[60vh] overflow-y-auto">
              {lists?.map((list) => (
                <PlaylistItem
                  key={list.name}
                  text={list.name}
                  checked={checkedState[list.name] || false}
                  onCheckboxChange={() => handleCheckboxChange(list.name)}
                  onDelete={async () => {
                    try {
                      setIsDeleting(true);
                      await deleteUserList(userData.id, list.name);
                    } catch (error) {
                      console.error('Failed to delete list:', error);
                    } finally {
                      setIsDeleting(false);
                    }
                  }}
                  isDeleting={isDeleting}
                />
              ))}
              
              {newPlaylist ? (
                <div className="border border-gray-700 rounded-md overflow-hidden mt-2">
                  <form onSubmit={handleSubmit} className="relative">
                    <input
                      ref={inputRef}
                      value={playlistName}
                      onChange={(e) => setPlaylistName(e.target.value)}
                      placeholder="Enter playlist name"
                      maxLength={150}
                      className="w-full py-2 px-3 text-sm bg-zinc-800 text-white placeholder-gray-500 
                               focus:outline-none focus:ring-2 focus:ring-blue-500"
                      type="text"
                    />
                    <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                      {playlistName.trim() && (
                        <button
                          type="submit"
                          className="p-1.5 hover:bg-zinc-700 rounded-full transition-colors"
                          title="Create playlist"
                        >
                          <Check size={16} className="text-green-500" />
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={handleCancel}
                        className="p-1.5 hover:bg-zinc-700 rounded-full transition-colors"
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
                  className="flex items-center w-full py-2 px-3 text-sm text-gray-300 hover:text-white 
                           hover:bg-zinc-800 rounded-md transition-colors mt-2"
                >
                  <Plus size={18} className="mr-2" />
                  New playlist
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const PlaylistItem = ({ text, checked, onCheckboxChange, onDelete, isDeleting }) => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  
  const handleDelete = () => {
    if (showDeleteConfirm) {
      onDelete();
      setShowDeleteConfirm(false);
    } else {
      setShowDeleteConfirm(true);
      setTimeout(() => setShowDeleteConfirm(false), 3000);
    }
  };

  return (
    <div className="group relative flex items-center px-1 py-2 hover:bg-zinc-800/50 rounded-md transition-colors">
      <div className="flex items-center flex-1 min-w-0">
        <input
          type="checkbox"
          checked={checked}
          onChange={onCheckboxChange}
          disabled={isDeleting}
          className="w-4 h-4 mr-3 rounded border-gray-600 bg-zinc-800 
                   checked:bg-blue-500 checked:border-blue-500 
                   focus:ring-2 focus:ring-blue-500 focus:ring-offset-0
                   transition-colors cursor-pointer disabled:opacity-50"
        />
        <span className="text-sm truncate pr-2">{text}</span>
      </div>
      
      <button
        onClick={handleDelete}
        disabled={isDeleting}
        className={`p-1.5 rounded-full transition-all duration-200
          ${showDeleteConfirm 
            ? 'bg-red-500/10 hover:bg-red-500/20' 
            : 'opacity-0 group-hover:opacity-100 hover:bg-zinc-700'}
          ${isDeleting ? 'opacity-50 cursor-not-allowed' : ''}`}
        title={showDeleteConfirm ? 'Click again to confirm deletion' : 'Delete playlist'}
      >
        <Trash2 
          size={14} 
          className={`${showDeleteConfirm ? 'text-red-500' : 'text-gray-400'}`}
        />
      </button>

      {showDeleteConfirm && (
        <div 
          className="absolute bottom-0 left-0 h-0.5 bg-red-500"
          style={{
            width: '100%',
            animation: 'shrink 3s linear forwards'
          }}
        />
      )}

      <style>{`
        @keyframes shrink {
          from { width: 100%; }
          to { width: 0%; }
        }
      `}</style>
    </div>
  );
};

export default ListModal;