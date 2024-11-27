import React, { useEffect, useState } from "react";
import { UserPlus, MessageSquare, Check, X, Bell } from "lucide-react";
import {
  createChat,
  sendUserChat,
  sendUserNotifications,
} from "../../_utils/firestore_friends";
import {
  deleteUserNotification,
  updateUserFriends,
} from "../../_utils/firestore";
import { useTranslation } from "react-i18next";

const FriendsTab = ({ friends, userData, auth }) => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [friendRequests, setFriendRequests] = useState([]);
  const [showRequests, setShowRequests] = useState(false);

  const addFriendHandler = () => {
    if (auth.currentUser.uid === searchTerm) {
      alert("You cannot add yourself as a friend.");
      setSearchTerm("");
      return;
    }

    const notif = {
      type: "friend-request",
      title: auth.currentUser.displayName,
      from: auth.currentUser.uid,
      to: searchTerm,
    };

    try {
      sendUserNotifications(notif, searchTerm);
      alert("Friend request sent successfully!");
    } catch (error) {
      console.error("Failed to send friend request:", error);
      alert("Could not send friend request. Please try again.");
    } finally {
      setSearchTerm("");
    }
  };

  const messageHandler = async (from, to) => {
    try {
      const existingChat = from.chats.some((c) =>
        to.chats.some((chat) => chat.id === c.id)
      );

      if (existingChat) {
        console.log("Chat already exists!");
        return;
      }

      const chatId = await createChat();

      await sendUserChat({ id: chatId, name: to.displayName }, from.id);
      await sendUserChat({ id: chatId, name: from.displayName }, to.id);

      alert("Chat created successfully!");
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
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">{t("Friends")}</h2>
        <div className="flex gap-2">
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
          <input
            type="text"
            placeholder={t("Search friends by id...")}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-lg flex items-center gap-2"
            onClick={addFriendHandler}
          >
            <UserPlus className="h-4 w-4" />
            {t("Add Friend")}
          </button>
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
                  Message
                </button>
              </div>
              {/* <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm font-medium mb-1">Recently Watched</div>
                <div className="text-sm text-gray-500">
                  {friend.recentlyWatched.join(", ")}
                </div>
              </div>
              <div>
                <div className="text-sm font-medium mb-1">Watchlist</div>
                <div className="text-sm text-gray-500">
                  {friend.watchlist.join(", ")}
                </div>
              </div>
            </div> */}
            </div>
          ))}
      </div>
    </div>
  );
};

export default FriendsTab;
