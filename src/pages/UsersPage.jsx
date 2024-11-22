import React, { useContext, useEffect, useState } from 'react';
import StatsTab from '../components/UsersPage/StatsTab';
import FriendsTab from '../components/UsersPage/FriendsTab';
import Tabs from '../components/UsersPage/Tabs';
import ProfileTab from '../components/UsersPage/ProfileTab';
import { auth } from '../_utils/firebase';
import { UserData } from '../providers/UserDataProvider';
import { getUsersByIds } from '../_utils/firestore_friends';
import ChatTab from '../components/UsersPage/ChatTab/ChatTab';
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import StatsTab from "../components/UsersPage/StatsTab";
import FriendsTab from "../components/UsersPage/FriendsTab";
import Tabs from "../components/UsersPage/Tabs";
import ProfileTab from "../components/UsersPage/ProfileTab";
import { auth } from "../_utils/firebase";
import { UserData } from "../providers/UserDataProvider";
import { getUsersByIds } from "../_utils/firestore_friends";
import { useTranslation } from "react-i18next";
import ChatTab from "../components/UsersPage/ChatTab/ChatTab";

const UsersPage = () => {
  const { userData } = useContext(UserData);
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("friends");
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      let data = await getUsersByIds(userData.friends);
      setFriends(data);
    }
      try {
        if (userData?.friends) {
          let data = await getUsersByIds(userData.friends);
          setFriends(data);
        }
      } catch (error) {
        console.error("Error fetching friends:", error);
      } finally {
        setLoading(false);
      }
    };

    if (userData) {
      getData();
    } else {
      setLoading(false);
    }
  },[userData])
  }, [userData]);

  if (loading) {
    return (
      <div className="w-3/4 mx-auto p-4 flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!auth.currentUser) {
    return (
      <div className="w-3/4 mx-auto p-4">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
          <h3 className="text-lg font-semibold text-red-800 mb-2">
            {t("Account Required")}
          </h3>
          <p className="text-red-700">
            {t("Please login/signUp")}
          </p>
        </div>
        <div className="flex gap-4">
          <button
            onClick={() => navigate("/login")}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            {t("login")}
          </button>
          <button
            onClick={() => navigate("/signup")}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            {t("signup")}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-3/4 mx-auto p-4 space-y-4">
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} tabs={["friends", "chat", "stats", "profile"]} />
      {activeTab === "friends" && (
        <FriendsTab
        friends={friends}
        auth={auth}
        userData={userData}
        />
      )}
      {activeTab === "chat" && (
        <ChatTab
        userData={userData}
        />
      )}
        {activeTab === "stats" && (
          <StatsTab
            friendsCount={friends.length}
            moviesWatched={24}
            avgRating={4.5}
            watchlistCount={15}
          />
        )}
      {activeTab === "profile" && (
        <ProfileTab
        />
      )}
    </div>
  );
};

export default UsersPage;