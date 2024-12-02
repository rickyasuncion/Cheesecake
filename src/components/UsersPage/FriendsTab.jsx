import React, { useEffect, useState } from "react";
import { UserPlus, MessageSquare, Check, X, Bell, Search } from "lucide-react";
import {
  createChat,
  sendUserNotifications,
  sendUserChat,
  searchUsersByName,
} from "../../_utils/firestore_friends";
import {
  deleteUserNotification,
  updateUserFriends,
} from "../../_utils/firestore";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const FriendsTab = ({ friends, userData, auth }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [friendRequests, setFriendRequests] = useState([]);
  const [showRequests, setShowRequests] = useState(false);
  const [userSearchResults, setUserSearchResults] = useState([]);

  const addFriendHandler = (userId) => {
    if (auth.currentUser.uid === userId) {
      alert("You cannot add yourself as a friend.");
      return;
    }

    const notif = {
      type: "friend-request",
      title: auth.currentUser.displayName,
      from: auth.currentUser.uid,
      to: userId,
    };

    try {
      sendUserNotifications(notif, userId);
      alert("Friend request sent successfully!");
    } catch (error) {
      console.error("Failed to send friend request:", error);
      alert("Could not send friend request. Please try again.");
    }
  };

  const searchUsersHandler = async () => {
    try {
      const results = await searchUsersByName(searchTerm);
      // Filter out current user and existing friends
      const filteredResults = results.filter(
        user => 
          user.id !== auth.currentUser.uid && 
          !friends.some(friend => friend.id === user.id)
      );
      setUserSearchResults(filteredResults);
    } catch (error) {
      console.error("Failed to search users:", error);
      alert("Could not search users. Please try again.");
    }
  };

  const messageHandler = async (from, to) => {
    try {
      let id;
      const existingChat = from.chats.find((c) =>
        to.chats.some((chat) => {
          if (chat.id === c.id) {
            id = chat.id;
            return true;
          }
          return false;
        })
      );

      if (existingChat) {
        navigate(`/users/chat/${id}`);
        return;
      }

      const chatId = await createChat();

      await sendUserChat({ id: chatId, name: to.displayName }, from.id);
      await sendUserChat({ id: chatId, name: from.displayName }, to.id);

      navigate(`/users/chat/${chatId}`)
    } catch (error) {
      console.error("Error creating chat:", error);
    }
  };

  useEffect(() => {
    if (userData?.notifications) {
      setFriendRequests(
        userData.notifications.filter(
          (notif) => notif.type === "friend-request" || []
        )
      );
    }
  }, [userData]);

  const acceptRequestHandler = (from, to) => {
    updateUserFriends(from, to);
    updateUserFriends(to, from);
  };

  return (
    <div className="space-y-6">
      {/* Friends List Section */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">{t("Friends")}</h2>
          <div className="relative">
            <button
              className="px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-lg flex items-center gap-2"
              onClick={() => setShowRequests(!showRequests)}
            >
              <Bell className="h-4 w-4" />
              {friendRequests.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  {friendRequests.length}
                </span>
              )}
            </button>
            {showRequests && friendRequests.length > 0 && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg border border-gray-200 shadow-lg z-10">
                <div className="p-2">
                  <h3 className="text-sm font-medium mb-2">
                    {t("Friend Requests")}
                  </h3>
                  <div className="space-y-2">
                    {friendRequests.map((request, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-2 hover:bg-gray-50 rounded"
                      >
                        <span className="text-sm">{request.title}</span>
                        <div className="flex gap-1">
                          <button
                            onClick={() => {
                              acceptRequestHandler(request.from, request.to);
                              deleteUserNotification(request.id);
                            }}
                            className="p-1 text-green-600 hover:bg-green-50 rounded"
                          >
                            <Check className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => deleteUserNotification(request.id)}
                            className="p-1 text-red-600 hover:bg-red-50 rounded"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-4">
          {friends &&
            friends.map((friend, index) => (
              <div key={index} className="border rounded-lg p-4 hover:bg-gray-50">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium text-lg">{friend.displayName}</h3>
                  <button
                    onClick={() => messageHandler(userData, friend)}
                    className="text-gray-600 hover:bg-gray-100 px-3 py-1 rounded-lg flex items-center gap-2"
                  >
                    <MessageSquare className="h-4 w-4" />
                    {t("Message")}
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* User Search Section */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
        <h2 className="text-xl font-bold mb-4">{t("Add New Friends")}</h2>
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            placeholder={t("Search users by name...")}
            className="flex-grow px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-lg flex items-center gap-2"
            onClick={searchUsersHandler}
          >
            <Search className="h-4 w-4" />
            {t("Search")}
          </button>
        </div>

        {userSearchResults.length > 0 && (
          <div className="space-y-4">
            {userSearchResults.map((user, index) => (
              <div 
                key={index} 
                className="border rounded-lg p-4 flex justify-between items-center hover:bg-gray-50"
              >
                <div>
                  <h4 className="font-medium text-lg">{user.displayName}</h4>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>
                <button
                  onClick={() => addFriendHandler(user.id)}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg flex items-center gap-2"
                >
                  <UserPlus className="h-4 w-4" />
                  {t("Add Friend")}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FriendsTab;