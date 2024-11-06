import React, { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const FeaturedSection = ({ featuredContent }) => {
  featuredContent = featuredContent.slice(0,10);
  const [currentFeaturedIndex, setCurrentFeaturedIndex] = useState(0);

  const nextFeatured = () => {
    setCurrentFeaturedIndex((prev) =>
      prev === featuredContent.length - 1 ? 0 : prev + 1
    );
  };

  const prevFeatured = () => {
    setCurrentFeaturedIndex((prev) =>
      prev === 0 ? featuredContent.length - 1 : prev - 1
    );
  };

  useEffect(() => {
    const timer = setInterval(nextFeatured, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative rounded-lg overflow-hidden mb-12 group">
      <div className="relative h-[500px]">
        {featuredContent.map((item, index) => (
          <div
            key={item.id}
            className={`absolute w-full h-full transition-opacity duration-500 ${
              index === currentFeaturedIndex ? "opacity-100" : "opacity-0"
            }`}
            style={{
              pointerEvents: index === currentFeaturedIndex ? "auto" : "none",
            }}
          >
            <img
              src={`https://image.tmdb.org/t/p/w500${item.backdrop_path}`}
              alt={item.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 p-8 bg-gradient-to-t from-black/80 to-transparent w-full">
              <h2 className="text-5xl text-white font-bold mb-2">
                {item.title}
              </h2>
              <p className="text-white mb-4">{item.subtitle}</p>
              <button className="bg-white text-black px-6 py-2 rounded-full hover:bg-gray-100 transition">
                STREAM
              </button>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={prevFeatured}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={nextFeatured}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <ChevronRight size={24} />
      </button>

      <div className="absolute bottom-4 right-4 flex space-x-2">
        {featuredContent.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentFeaturedIndex(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentFeaturedIndex
                ? "bg-white scale-125"
                : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default FeaturedSection;
