import React, { useState } from 'react';
import { List, Plus, MoreVertical, Film, Tv, Clock, Edit2, Trash2 } from 'lucide-react';
import { auth } from '../_utils/firebase';
import AccountNotice from '../components/AccountNotice';

const Lists = () => {
  const [selectedList, setSelectedList] = useState(null);

  // Sample watchlist data
  const watchlists = [
    {
      id: 1,
      name: "Weekend Movies",
      description: "Movies to watch on weekends",
      items: [
        { id: 1, title: "Searching", type: "Thriller", duration: "1h 42m", image: "/api/placeholder/200/300" },
        { id: 2, title: "The Purge", type: "Horror", duration: "1h 25m", image: "/api/placeholder/200/300" },
      ]
    },
    {
      id: 2,
      name: "Must Watch Shows",
      description: "TV series I need to catch up on",
      items: [
        { id: 3, title: "New Amsterdam", type: "Drama", duration: "43m", image: "/api/placeholder/200/300" },
      ]
    }
  ];

  const WatchlistCard = ({ name, description, items, isSelected, onClick }) => (
    <button
      onClick={onClick}
      className={`w-full text-left p-4 rounded-lg border transition-all duration-200 
        ${isSelected 
          ? 'border-red-500 bg-red-50' 
          : 'border-gray-200 hover:border-red-200 hover:bg-gray-50'}`}
    >
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center space-x-2">
          <List className={`w-5 h-5 ${isSelected ? 'text-red-500' : 'text-gray-400'}`} />
          <h3 className="font-medium text-gray-900">{name}</h3>
        </div>
        <MoreVertical className="w-5 h-5 text-gray-400" />
      </div>
      <p className="text-sm text-gray-500 mb-3">{description}</p>
      <div className="flex items-center space-x-2 text-sm text-gray-500">
        <span>{items.length} items</span>
        <span>•</span>
        <span>Last updated 2 days ago</span>
      </div>
    </button>
  );

  const MediaCard = ({ title, type, duration, image }) => (
    <div className="flex space-x-4 p-4 rounded-lg hover:bg-gray-50">
      <img 
        src={image} 
        alt={title}
        className="w-20 h-28 rounded-lg object-cover"
      />
      <div className="flex-1">
        <h3 className="font-medium text-gray-900 mb-1">{title}</h3>
        <p className="text-sm text-gray-500 mb-2">{type}</p>
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <Clock className="w-4 h-4" />
          <span>{duration}</span>
        </div>
      </div>
      <div className="flex items-start space-x-2">
        <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
          <Edit2 className="w-5 h-5" />
        </button>
        <button className="p-2 text-gray-400 hover:text-red-600 rounded-lg hover:bg-gray-100">
          <Trash2 className="w-5 h-5" />
        </button>
      </div>
    </div>
  );

  if (!auth.currentUser) return <AccountNotice/>;

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-semibold text-gray-900">My Lists</h1>
            <button className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
              <Plus className="w-5 h-5" />
              <span>Create List</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex space-x-8">
          {/* Watchlists Sidebar */}
          <div className="w-80 space-y-4">
            {watchlists.map(list => (
              <WatchlistCard
                key={list.id}
                {...list}
                isSelected={selectedList?.id === list.id}
                onClick={() => setSelectedList(list)}
              />
            ))}
          </div>

          {/* Selected List Content */}
          <div className="flex-1">
            {selectedList ? (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-1">{selectedList.name}</h2>
                    <p className="text-sm text-gray-500">{selectedList.description}</p>
                  </div>
                  <div className="flex space-x-4">
                    <button className="flex items-center space-x-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">
                      <Film className="w-4 h-4" />
                      <span>Add Movies</span>
                    </button>
                    <button className="flex items-center space-x-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">
                      <Tv className="w-4 h-4" />
                      <span>Add Shows</span>
                    </button>
                  </div>
                </div>
                <div className="divide-y divide-gray-200">
                  {selectedList.items.map(item => (
                    <MediaCard key={item.id} {...item} />
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-96 text-center">
                <List className="w-12 h-12 text-gray-300 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Select a list to view</h3>
                <p className="text-sm text-gray-500">Choose a list from the sidebar to view and manage its contents</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Lists;