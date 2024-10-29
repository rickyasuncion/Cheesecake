import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { fetchData } from "../../../_utils/utils";

const GenresDropdown = ({ toggleGenresDropdown }) => {
  const { t, i18n } = useTranslation();
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const movieGenres = await fetchData(
          `https://api.themoviedb.org/3/genre/movie/list?api_key=YOUR_API_KEY&language=${i18n.language}`
        );
        const tvGenres = await fetchData(
          `https://api.themoviedb.org/3/genre/tv/list?api_key=YOUR_API_KEY&language=${i18n.language}`
        );

        if (movieGenres && movieGenres.genres && tvGenres && tvGenres.genres) {
          const combinedGenres = [...movieGenres.genres, ...tvGenres.genres];
          const uniqueGenres = combinedGenres.filter(
            (genre, index, self) =>
              index === self.findIndex((g) => g.id === genre.id)
          );
          setGenres(uniqueGenres);
        } else {
          console.error("Error fetching genres. Response was invalid.");
        }
      } catch (error) {
        console.error("Error fetching genres:", error);
      }
    };

    fetchGenres();
  }, [i18n.language]);

  const handleCheckboxChange = (genreId) => {
    setSelectedGenres((prev) =>
      prev.includes(genreId)
        ? prev.filter((id) => id !== genreId)
        : [...prev, genreId]
    );
  };

  const handleSubmitGenres = () => {
    // Add navigation or further actions here if necessary
    toggleGenresDropdown();
  };

  return (
    <div className="absolute bg-gray-800 text-white p-4 rounded shadow-lg top-full mt-2 z-10 genres-dropdown">
      {genres.length > 0 ? (
        genres.map((genre) => (
          <div key={genre.id} className="flex items-center mb-2">
            <input
              type="checkbox"
              id={genre.id}
              value={genre.id}
              checked={selectedGenres.includes(genre.id)}
              onChange={() => handleCheckboxChange(genre.id)}
              className="mr-2"
            />
            <label htmlFor={genre.id}>{genre.name}</label>
          </div>
        ))
      ) : (
        <p>{t("Loading genres...")}</p>
      )}
      <button
        className="mt-4 p-2 bg-yellow-500 text-white rounded"
        onClick={handleSubmitGenres}
      >
        {t("Filter")}
      </button>
    </div>
  );
};

export default GenresDropdown;
