import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import StatsTab from "../components/UsersPage/StatsTab";
import FriendsTab from "../components/UsersPage/FriendsTab";
import Tabs from "../components/UsersPage/Tabs";
import ProfileTab from "../components/UsersPage/ProfileTab";
import { auth } from "../_utils/firebase";
import { UserData } from "../providers/UserDataProvider";
import { useTranslation } from "react-i18next";
import ChatTab from "../components/UsersPage/ChatTab/ChatTab";
import AccountNotice from "../components/AccountNotice";
import { getUsersByIds } from "../_utils/firestore_friends";

const UsersPage = () => {
  const { t } = useTranslation();
  const { userData } = useContext(UserData);
  const {tab} = useParams();

  const [activeTab, setActiveTab] = useState( tab || "friends");
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
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
  }, [userData]);

  if (loading) {
    return (
      <div className="w-3/4 mx-auto p-4 flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!auth.currentUser) return <AccountNotice/>;

  return (
    <div className="w-3/4 mx-auto p-4 space-y-4">
      <Tabs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        tabs={[t("friends"), t("chat"), t("settings")]}
      />
      {tab === t("friends") && (
        <FriendsTab friends={friends} auth={auth} userData={userData} />
      )}
      {tab === "chat" && <ChatTab userData={userData} />}
      {tab === "stats" && (
        <StatsTab
          friendsCount={friends.length}
          moviesWatched={24}
          avgRating={4.5}
          watchlistCount={15}
        />
      )}
      {tab === "settings" && <ProfileTab />}
    </div>
  );
};

export default UsersPage;