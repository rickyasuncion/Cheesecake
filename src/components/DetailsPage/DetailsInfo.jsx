import { ChevronDown, Star } from "lucide-react";
import React, { useEffect, useState } from "react";
import { fetchData } from "../../_utils/utils";
import Reviews from "./Reviews/Reviews";
import { useTranslation } from "react-i18next";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";

const DetailsInfo = ({ movie, cast, type, id }) => {
  const { t, i18n } = useTranslation();
  const filteredCast = cast
    .filter((actor) => actor.known_for_department === "Acting")
    .slice(0, 5);
  const [selectedSeason, setSelectedSeason] = useState(1);
  const [selectedTab, setSelectedTab] = useState("Overview");
  const [seasonData, setSeasonData] = useState(null);

  useEffect(() => {
    if (type === "tv") {
      const getData = async () => {
        let data = await fetchData(
          `https://api.themoviedb.org/3/tv/${id}/season/${selectedSeason}?api_key=bbd89781c7835917a2decb4989b56470&language=${i18n.language}`
        );
        setSeasonData(data);
      };
      getData();
    }
  }, [selectedSeason, id, type, i18n.language]);

  const OverviewTab = () => (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold mb-4">{t("Overview")}</h2>
        <p className="text-gray-300 leading-relaxed">{movie.overview}</p>
      </div>
      <div>
        <h2 className="text-2xl font-semibold mb-4">{t("Cast")}</h2>
        <div className="grid grid-cols-2 gap-4">
          {filteredCast.map((cast, index) => (
            <div key={index} className="flex items-center gap-4">
              <img
                src={`https://image.tmdb.org/t/p/w1280${cast.profile_path}`}
                className="w-12 h-12 rounded-full bg-gray-700 object-cover"
                alt="Profile"
              />
              <span className="text-gray-300">{cast.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const EpisodesTab = () => (
    <>
      {/* Season Selector */}
      <div className="flex items-center gap-4 mb-8">
        <div className="relative">
          <select
            value={selectedSeason}
            onChange={(e) => setSelectedSeason(Number(e.target.value))}
            className="appearance-none bg-gray-800 text-white px-6 py-3 pr-12 rounded-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            {movie.seasons &&
              movie.seasons.map((season) => (
                <option key={season.season_number} value={season.season_number}>
                  {t("Season")} {season.season_number}
                </option>
              ))}
          </select>
          <ChevronDown
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
            size={16}
          />
        </div>
        <div className="text-gray-400">
          {seasonData?.episodes?.length} {t("Episodes")} •{" "}
          {seasonData?.air_date}
        </div>
      </div>

      {/* Season Description */}
      <p className="text-gray-300 mb-8">{seasonData?.overview}</p>

      {/* Episodes List */}
      <div className="space-y-4">
        {seasonData?.episodes?.map((episode) => (
          <div
            key={episode.episode_number}
            className="bg-gray-800 rounded-lg overflow-hidden"
          >
            <div className="flex">
              <div className="w-64 h-40">
                <img
                  src={`https://image.tmdb.org/t/p/w500${episode.still_path}`}
                  alt={episode.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 p-6">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="text-lg font-semibold">
                      {episode.episode_number}. {episode.name}
                    </h3>
                    <div className="text-sm text-gray-400">
                      {episode.runtime} mins • {episode.air_date}
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star
                      className="text-yellow-400"
                      fill="currentColor"
                      size={16}
                    />
                    <span>{episode.vote_average.toFixed(2)}</span>
                  </div>
                </div>
                <p className="text-gray-300 text-sm">{episode.overview}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );

  const ProvidersTab = () => {
    const [providers, setProviders] = useState(null);

    useEffect(() => {
      const fetchProviders = async () => {
        const response = await fetch(
          `https://api.themoviedb.org/3/${type}/${id}/watch/providers?api_key=bbd89781c7835917a2decb4989b56470`
        );
        const data = await response.json();
        setProviders(data.results);
      };

      fetchProviders();
    }, [id]);

    if (!providers) return <p>Loading...</p>;

    const countryProviders = providers?.CA || {};

    const hasProviders =
      countryProviders.free ||
      countryProviders.ads ||
      countryProviders.rent ||
      countryProviders.buy ||
      countryProviders.flatrate;

    return (
      <div className="space-y-6">
        {!hasProviders ? (
          <p className="text-gray-400 text-lg">
            {t("No providers are available.")}
          </p>
        ) : (
          <div>
            {countryProviders.free && (
              <div>
                <h3 className="text-lg font-bold mb-2">{t("Free")}</h3>
                <div className="flex gap-4">
                  {countryProviders.free.map((provider, index) => (
                    <img
                      key={index}
                      src={`https://image.tmdb.org/t/p/original${provider.logo_path}`}
                      alt={provider.provider_name}
                      className="w-12 h-12 rounded-lg"
                    />
                  ))}
                </div>
              </div>
            )}
            {countryProviders.flatrate && (
              <div>
                <h3 className="text-lg font-bold mb-2">{t("Stream")}</h3>
                <div className="flex gap-4">
                  {countryProviders.flatrate.map((provider, index) => (
                    <img
                      key={index}
                      src={`https://image.tmdb.org/t/p/original${provider.logo_path}`}
                      alt={provider.provider_name}
                      className="w-12 h-12 rounded-lg"
                    />
                  ))}
                </div>
              </div>
            )}
            {countryProviders.ads && (
              <div>
                <h3 className="text-lg font-bold mb-2">{t("Ads")}</h3>
                <div className="flex gap-4">
                  {countryProviders.ads.map((provider, index) => (
                    <img
                      key={index}
                      src={`https://image.tmdb.org/t/p/original${provider.logo_path}`}
                      alt={provider.provider_name}
                      className="w-12 h-12 rounded-lg"
                    />
                  ))}
                </div>
              </div>
            )}
            {countryProviders.rent && (
              <div>
                <h3 className="text-lg font-bold mb-2">{t("Rent")}</h3>
                <div className="flex gap-4">
                  {countryProviders.rent.map((provider, index) => (
                    <img
                      key={index}
                      src={`https://image.tmdb.org/t/p/original${provider.logo_path}`}
                      alt={provider.provider_name}
                      className="w-12 h-12 rounded-lg"
                    />
                  ))}
                </div>
              </div>
            )}
            {countryProviders.buy && (
              <div>
                <h3 className="text-lg font-bold mb-2">{t("Buy")}</h3>
                <div className="flex gap-4">
                  {countryProviders.buy.map((provider, index) => (
                    <img
                      key={index}
                      src={`https://image.tmdb.org/t/p/original${provider.logo_path}`}
                      alt={provider.provider_name}
                      className="w-12 h-12 rounded-lg"
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  const renderTabContent = () => {
    switch (selectedTab) {
      case "Overview":
        return <OverviewTab />;
      case "episodes":
        return <EpisodesTab />;
      case "reviews":
        return (
          <Reviews title={movie.title || movie.name} type={type} id={id} />
        );
      case "providers":
        return <ProvidersTab />;
      default:
        return <OverviewTab />;
    }
  };

  if (type === "movie") {
    return (
      <div className="col-span-2">
        {/* Tabs */}
        <div className="border-b border-gray-800 mb-8">
          <div className="flex gap-8">
            <TabButton
              active={selectedTab === "Overview"}
              onClick={() => setSelectedTab("Overview")}
            >
              {t("Overview")}
            </TabButton>
            <TabButton
              active={selectedTab === "reviews"}
              onClick={() => setSelectedTab("reviews")}
            >
              {t("Reviews")}
            </TabButton>
            <TabButton
              active={selectedTab === "providers"}
              onClick={() => setSelectedTab("providers")}
            >
              {t("Providers")}
            </TabButton>
          </div>
        </div>

        {/* Tab Content */}
        {renderTabContent()}
      </div>
    );
  }

  if (type === "tv") {
    return (
      <div className="col-span-2">
        {/* Tabs */}
        <div className="border-b border-gray-800 mb-8">
          <div className="flex gap-8">
            <TabButton
              active={selectedTab === "Overview"}
              onClick={() => setSelectedTab("Overview")}
            >
              {t("Overview")}
            </TabButton>
            <TabButton
              active={selectedTab === "episodes"}
              onClick={() => setSelectedTab("episodes")}
            >
              {t("Episodes")}
            </TabButton>
            <TabButton
              active={selectedTab === "reviews"}
              onClick={() => setSelectedTab("reviews")}
            >
              {t("Reviews")}
            </TabButton>
            <TabButton
              active={selectedTab === "providers"}
              onClick={() => setSelectedTab("providers")}
            >
              {t("Providers")}
            </TabButton>
          </div>
        </div>

        {/* Tab Content */}
        {renderTabContent()}
      </div>
    );
  }
};

const TabButton = ({ children, active, onClick }) => (
  <button
    onClick={onClick}
    className={`px-4 py-4 text-lg font-medium border-b-2 transition-colors ${
      active
        ? "text-white border-red-500"
        : "text-gray-400 border-transparent hover:text-white"
    }`}
  >
    {children}
  </button>
);

export default DetailsInfo;
