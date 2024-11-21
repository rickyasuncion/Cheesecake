import React, { useContext, useEffect, useState } from "react";
import StatsTab from "../components/UsersPage/StatsTab";
import FriendsTab from "../components/UsersPage/FriendsTab";
import Tabs from "../components/UsersPage/Tabs";
import ProfileTab from "../components/UsersPage/ProfileTab";
import { auth } from "../_utils/firebase";
import { UserData } from "../providers/UserDataProvider";
import { getUsersByIds } from "../_utils/firestore_friends";
import { useTranslation } from "react-i18next";

const UsersPage = () => {
  const { t } = useTranslation();
  const { userData } = useContext(UserData);

  const [activeTab, setActiveTab] = useState("friends");
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    const getData = async () => {
      let data = await getUsersByIds(userData.friends);
      setFriends(data);
    };

    if (userData) {
      getData();
    }
  }, [userData]);

  return (
    <div className="w-3/4 mx-auto p-4 space-y-4">
      <Tabs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        tabs={[t("friends"), t("chat"), t("stats"), t("profile")]}
      />
      {activeTab === t("friends") && (
        <FriendsTab friends={friends} auth={auth} userData={userData} />
      )}
      {activeTab === "chat" && <ChatTab userData={userData} />}
      {activeTab === "stats" && (
        <StatsTab
          friendsCount={friends.length}
          moviesWatched={24}
          avgRating={4.5}
          watchlistCount={15}
        />
      )}
      {activeTab === "profile" && <ProfileTab />}
    </div>
  );
};

export default UsersPage;
