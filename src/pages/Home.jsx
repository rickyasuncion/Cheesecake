import React, { useState, useEffect } from 'react';
import FeaturedSection from '../components/HomePage/FeaturedSection';
import MediaCarousel from '../components/HomePage/MediaCarousel';

const Home = () => {
  const [currentFeaturedIndex, setCurrentFeaturedIndex] = useState(0);

  const featuredContent = [
    { id: 1, title: "Searching", subtitle: "Where is Margot?", image: "/api/placeholder/1200/500" },
    { id: 2, title: "The Matrix", subtitle: "Free your mind", image: "/api/placeholder/1200/500" },
    { id: 3, title: "Inception", subtitle: "Dreams feel real while we're in them", image: "/api/placeholder/1200/500" }
  ];

  const movies = [
    { id: 1, title: 'Searching', genre: 'Thriller', image: '/api/placeholder/240/360' },
    { id: 2, title: 'Blockers', genre: 'Comedy', image: '/api/placeholder/240/360' },
    { id: 3, title: 'It', genre: 'Horror', image: '/api/placeholder/240/360' },
    { id: 4, title: 'American Sniper', genre: 'Action', image: '/api/placeholder/240/360' },
    { id: 5, title: 'The Purge', genre: 'Thriller', image: '/api/placeholder/240/360' },
    { id: 6, title: 'New Amsterdam', genre: 'Drama', image: '/api/placeholder/240/360' },
    { id: 7, title: 'Interstellar', genre: 'Sci-Fi', image: '/api/placeholder/240/360' },
    { id: 8, title: 'The Dark Knight', genre: 'Action', image: '/api/placeholder/240/360' },
    { id: 9, title: 'Inception', genre: 'Sci-Fi', image: '/api/placeholder/240/360' },
    { id: 10, title: 'Parasite', genre: 'Drama', image: '/api/placeholder/240/360' },
    { id: 11, title: 'Parasite', genre: 'Drama', image: '/api/placeholder/240/360' }
  ];

  const nextFeatured = () => {
    setCurrentFeaturedIndex((prev) => prev === featuredContent.length - 1 ? 0 : prev + 1);
  };

  const prevFeatured = () => {
    setCurrentFeaturedIndex((prev) => prev === 0 ? featuredContent.length - 1 : prev - 1);
  };

  useEffect(() => {
    const timer = setInterval(nextFeatured, 5000);
    return () => clearInterval(timer);
  }, []);


  return (
    <div className="min-h-screen bg-gray-100">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <FeaturedSection 
          featuredContent={featuredContent}
          currentFeaturedIndex={currentFeaturedIndex}
          prevFeatured={prevFeatured}
          nextFeatured={nextFeatured}
          setCurrentFeaturedIndex={setCurrentFeaturedIndex}
        />
        <MediaCarousel 
          movies={movies}
        />
        <MediaCarousel 
          movies={movies}
        />
        <MediaCarousel 
          movies={movies}
        />
      </main>
    </div>
  );
};

export default Home;
