import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from "react-i18next";

const GenreCarousel = ({ genres, sectionTitle, baseUrl }) => {
  const { t } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef(null);

  const scrollNext = () => {
    if (carouselRef.current) {
      const itemWidth = carouselRef.current.children[0].clientWidth + 16; // width + margin
      const newIndex = Math.min(currentIndex + 1, genres.length - 3);
      setCurrentIndex(newIndex);
      carouselRef.current.scrollTo({
        left: newIndex * itemWidth,
        behavior: 'smooth'
      });
    }
  };

  const scrollPrev = () => {
    if (carouselRef.current) {
      const itemWidth = carouselRef.current.children[0].clientWidth + 16; // width + margin
      const newIndex = Math.max(currentIndex - 1, 0);
      setCurrentIndex(newIndex);
      carouselRef.current.scrollTo({
        left: newIndex * itemWidth,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="relative mt-5">
      <h2 className="text-lg mb-4 font-medium">{t(sectionTitle)}</h2>
      
      <div className="relative">
        {/* Previous Button */}
        {currentIndex > 0 && (
          <button 
            onClick={scrollPrev}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-black/50 text-white p-2 rounded-full hover:bg-black/75 transition"
          >
            &#10094;
          </button>
        )}

        {/* Carousel Container */}
        <div 
          ref={carouselRef}
          className="flex overflow-x-auto no-scrollbar space-x-4 scroll-smooth"
          style={{ 
            scrollSnapType: 'x mandatory',
            WebkitOverflowScrolling: 'touch'
          }}
        >
          {genres && genres.map((genre, index) => (
            <Link
              key={genre.id || index}
              to={`${baseUrl}/${genre.id}`}
              className={`overflow-hidden relative inline-block border-[1.5px] rounded-lg border-border/20 hover:border-border transition-[border] flex-shrink-0 w-64 hover:scale-105 transition-transform duration-300`}
            >
              <div className='absolute w-full bottom-0 bg-gradient-to-t from-black to-transparent h-16 z-10'></div>
              <div className='aspect-video'>
                <img 
                  src={`https://image.tmdb.org/t/p/w500/${genre.backdrop_path}`} 
                  alt={t(genre.name)} 
                  className='h-full w-full object-cover object-top' 
                />
              </div>
              <span className='font-medium absolute bottom-3 left-3 text-white z-20'>
                {t(genre.name)}
              </span>
            </Link>
          ))}
        </div>

        {/* Next Button */}
        {currentIndex < genres.length - 3 && (
          <button 
            onClick={scrollNext}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-black/50 text-white p-2 rounded-full hover:bg-black/75 transition"
          >
            &#10095;
          </button>
        )}
      </div>
    </div>
  );
};

export default GenreCarousel;