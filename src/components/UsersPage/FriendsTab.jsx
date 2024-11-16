import React from 'react';
import { UserPlus, MessageSquare } from 'lucide-react';

const FriendsTab = ({ friends, searchTerm, setSearchTerm, onAddFriend }) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Friends</h2>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Search friends..."
            className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-lg flex items-center gap-2"
            onClick={onAddFriend}
          >
            <UserPlus className="h-4 w-4" />
            Add Friend
          </button>
        </div>
      </div>
      <div className="space-y-4">
        {friends.map((friend) => (
          <div key={friend.id} className="border rounded-lg p-4 hover:bg-gray-50">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-medium text-lg">{friend.name}</h3>
              <button className="text-gray-600 hover:bg-gray-100 px-3 py-1 rounded-lg flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                Message
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm font-medium mb-1">Recently Watched</div>
                <div className="text-sm text-gray-500">
                  {friend.recentlyWatched.join(", ")}
                </div>
              </div>
              <div>
                <div className="text-sm font-medium mb-1">Watchlist</div>
                <div className="text-sm text-gray-500">{friend.watchlist.join(", ")}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FriendsTab;
