import { Heart } from "lucide-react";
import React from "react";
import Card from "./Card";

const Favourited = ({ title, favorites, handleShowSimilar }) => {
  if (!favorites) {
    <div>Loading...</div>;
  }

  return (
    <div className="p-6 max-w-6xl">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-2">
          <Heart className="w-6 h-6 text-red-500" />
          <h1 className="text-3xl font-bold">My Favorite {title}</h1>
        </div>
        <span className="text-gray-500">
          {favorites.length} {title}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {favorites.map((favorite) => (
          <Card
            type={favorite.type}
            id={favorite.id}
            handleShowSimilar={handleShowSimilar}
          />
        ))}
      </div>

      {favorites.length === 0 && (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-500">No favorite {title} yet</p>
        </div>
      )}
    </div>
  );
};

export default Favourited;
