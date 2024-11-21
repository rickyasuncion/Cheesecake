import React from "react";
import { Users, Film, Star, List } from "lucide-react";
import { useTranslation } from "react-i18next";

const StatsTab = ({
  friendsCount,
  moviesWatched,
  avgRating,
  watchlistCount,
}) => {
  const { t } = useTranslation();
  const stats = [
    {
      icon: <Users className="h-8 w-8 mx-auto mb-2" />,
      label: t("Friends"),
      value: friendsCount,
    },
    {
      icon: <Film className="h-8 w-8 mx-auto mb-2" />,
      label: t("Movies Watched"),
      value: moviesWatched,
    },
    {
      icon: <Star className="h-8 w-8 mx-auto mb-2" />,
      label: t("Avg Rating"),
      value: avgRating,
    },
    {
      icon: <List className="h-8 w-8 mx-auto mb-2" />,
      label: t("In Watchlist"),
      value: watchlistCount,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-white rounded-lg border border-gray-200 shadow-sm"
        >
          <div className="p-4 text-center">
            {stat.icon}
            <div className="text-2xl font-bold">{stat.value}</div>
            <div className="text-sm text-gray-500">{stat.label}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsTab;
