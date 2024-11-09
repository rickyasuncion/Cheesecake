import React, { useState } from 'react';
import { Play, Star, ThumbsUp, MessageCircle, Flag, ChevronDown, Info } from 'lucide-react';

const TVShowDetails = () => {
  const [selectedSeason, setSelectedSeason] = useState(1);
  const [selectedTab, setSelectedTab] = useState('episodes');
  
  // Sample TV show data
  const showData = {
    title: "Breaking Bad",
    tagline: "All Hail the King",
    description: "A high school chemistry teacher turned methamphetamine manufacturer partners with a former student to secure his family's financial future as he battles terminal lung cancer. As their operation grows, so do the stakes, pulling both deeper into a world of drugs, danger, and decisions that cannot be undone.",
    firstAired: "2008",
    status: "Ended",
    runtime: "45m per episode",
    rating: "9.5",
    totalEpisodes: 62,
    totalSeasons: 5,
    network: "AMC",
    genres: ["Crime", "Drama", "Thriller"],
    creator: "Vince Gilligan",
    cast: ["Bryan Cranston", "Aaron Paul", "Anna Gunn", "Bob Odenkirk"],
    seasons: [
      {
        number: 1,
        episodeCount: 7,
        year: "2008",
        description: "The first season follows Walter White's initial descent into the drug trade...",
        episodes: [
          {
            number: 1,
            title: "Pilot",
            runtime: "58m",
            airDate: "Jan 20, 2008",
            rating: 9.0,
            description: "A desperate man begins a dark journey as chemistry teacher Walter White learns he has terminal cancer and turns to a life of crime to secure his family's financial future.",
            thumbnail: "/api/placeholder/400/225"
          },
          {
            number: 2,
            title: "Cat's in the Bag...",
            runtime: "48m",
            airDate: "Jan 27, 2008",
            rating: 8.7,
            description: "Walt and Jesse attempt to dispose of two bodies, but things go wrong.",
            thumbnail: "/api/placeholder/400/225"
          },
          // More episodes...
        ]
      },
      {
        number: 2,
        episodeCount: 13,
        year: "2009",
        description: "The second season sees Walt and Jesse's operation expand...",
        episodes: [
          // Season 2 episodes...
        ]
      }
      // More seasons...
    ],
    reviews: [
      {
        id: 1,
        author: "SeriesExpert",
        rating: 5,
        date: "2024-03-15",
        content: "One of the greatest television shows ever made. The character development is unmatched.",
        likes: 1243,
        replies: 89,
        isVerified: true
      }
      // More reviews...
    ]
  };

  const seasonData = showData.seasons.find(s => s.number === selectedSeason);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Hero Section */}
      <div className="relative h-[600px] overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent" />
          <img 
            src="/api/placeholder/1920/1080" 
            alt="Show hero" 
            className="w-full h-full object-cover"
          />
        </div>

        <div className="relative h-full container mx-auto px-6 flex items-end pb-16">
          <div className="max-w-3xl">
            <h1 className="text-6xl font-bold mb-4">{showData.title}</h1>
            <p className="text-2xl text-gray-300 mb-6">{showData.tagline}</p>
            <div className="flex items-center gap-6">
              <button className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-8 py-3 rounded-full font-semibold transition-colors">
                <Play size={20} />
                Watch Now
              </button>
              <div className="flex items-center gap-2">
                <Star className="text-yellow-400" fill="currentColor" />
                <span className="text-xl font-semibold">{showData.rating}</span>
                <span className="text-gray-400">/10</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-3 gap-12">
          {/* Left Column */}
          <div className="col-span-2">
            {/* Tabs */}
            <div className="border-b border-gray-800 mb-8">
              <div className="flex gap-8">
                <TabButton 
                  active={selectedTab === 'episodes'} 
                  onClick={() => setSelectedTab('episodes')}
                >
                  Episodes
                </TabButton>
                <TabButton 
                  active={selectedTab === 'extras'} 
                  onClick={() => setSelectedTab('extras')}
                >
                  Extras & Features
                </TabButton>
                <TabButton 
                  active={selectedTab === 'reviews'} 
                  onClick={() => setSelectedTab('reviews')}
                >
                  Reviews
                </TabButton>
              </div>
            </div>

            {/* Season Selector */}
            <div className="flex items-center gap-4 mb-8">
              <div className="relative">
                <select 
                  value={selectedSeason}
                  onChange={(e) => setSelectedSeason(Number(e.target.value))}
                  className="appearance-none bg-gray-800 text-white px-6 py-3 pr-12 rounded-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  {showData.seasons.map(season => (
                    <option key={season.number} value={season.number}>
                      Season {season.number}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              </div>
              <div className="text-gray-400">
                {seasonData?.episodeCount} Episodes • {seasonData?.year}
              </div>
            </div>

            {/* Season Description */}
            <p className="text-gray-300 mb-8">{seasonData?.description}</p>

            {/* Episodes List */}
            <div className="space-y-4">
              {seasonData?.episodes.map((episode) => (
                <div key={episode.number} className="bg-gray-800 rounded-lg overflow-hidden">
                  <div className="flex">
                    <div className="w-64 h-40">
                      <img 
                        src={episode.thumbnail} 
                        alt={episode.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 p-6">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-lg font-semibold">
                            {episode.number}. {episode.title}
                          </h3>
                          <div className="text-sm text-gray-400">
                            {episode.runtime} • {episode.airDate}
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="text-yellow-400" fill="currentColor" size={16} />
                          <span>{episode.rating}</span>
                        </div>
                      </div>
                      <p className="text-gray-300 text-sm">{episode.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Show Info */}
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Show Details</h3>
              <div className="space-y-3 text-gray-300">
                <InfoRow label="First Aired" value={showData.firstAired} />
                <InfoRow label="Status" value={showData.status} />
                <InfoRow label="Network" value={showData.network} />
                <InfoRow label="Creator" value={showData.creator} />
                <InfoRow label="Episodes" value={showData.totalEpisodes} />
                <InfoRow label="Seasons" value={showData.totalSeasons} />
                <InfoRow label="Episode Runtime" value={showData.runtime} />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Cast</h3>
              <div className="grid gap-4">
                {showData.cast.map((actor, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gray-700" />
                    <span className="text-gray-300">{actor}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Genres</h3>
              <div className="flex flex-wrap gap-2">
                {showData.genres.map((genre, index) => (
                  <span 
                    key={index}
                    className="px-3 py-1 bg-gray-800 rounded-full text-sm text-gray-300"
                  >
                    {genre}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper Components
const TabButton = ({ children, active, onClick }) => (
  <button
    onClick={onClick}
    className={`px-4 py-4 text-lg font-medium border-b-2 transition-colors ${
      active 
        ? 'text-white border-red-500' 
        : 'text-gray-400 border-transparent hover:text-white'
    }`}
  >
    {children}
  </button>
);

const InfoRow = ({ label, value }) => (
  <div className="flex items-center justify-between">
    <span className="text-gray-500">{label}</span>
    <span>{value}</span>
  </div>
);

export default TVShowDetails;