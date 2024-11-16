import React, { useState } from 'react';
import StatsTab from '../components/UsersPage/StatsTab';
import FriendsTab from '../components/UsersPage/FriendsTab';
import Tabs from '../components/UsersPage/Tabs';
import ChatTab from '../components/UsersPage/ChatTab';
import ProfileTab from '../components/UsersPage/ProfileTab';

const UsersPage = () => {
  const [activeTab, setActiveTab] = useState("stats");
  const [searchTerm, setSearchTerm] = useState("");
  const [friends, setFriends] = useState([
    {
      id: 1,
      name: "Daljot",
      watchlist: ["Inception", "The Dark Knight"],
      recentlyWatched: ["Oppenheimer"],
      favoriteGenres: ["Sci-Fi", "Action"],
      ratings: [{ movie: "Oppenheimer", rating: 5 }, { movie: "Barbie", rating: 4 }],
    },
    {
      id: 2,
      name: "Will Hui",
      watchlist: ["The Godfather", "Pulp Fiction"],
      recentlyWatched: ["Mean Girls"],
      favoriteGenres: ["Drama", "Comedy"],
      ratings: [{ movie: "Mean Girls", rating: 4 }, { movie: "Dune", rating: 5 }],
    },
  ]);

  return (
    <div className="w-3/4 mx-auto p-4 space-y-4">
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} tabs={["stats", "friends", "chat", "profile"]} />
      {activeTab === "stats" && (
        <StatsTab
          friendsCount={friends.length}
          moviesWatched={24}
          avgRating={4.5}
          watchlistCount={15}
        />
      )}
      {activeTab === "friends" && (
        <FriendsTab
          friends={friends}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          onAddFriend={() => alert("Add Friend clicked!")}
        />
      )}
      {activeTab === "chat" && (
        <ChatTab
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
