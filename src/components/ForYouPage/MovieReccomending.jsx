import React, { useState } from "react";
import axios from "axios";
import { MovieCard } from "../ui/MovieCard";
import { useTranslation } from "react-i18next";

const MovieReccomending = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [recommendedMovies, setRecommendedMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const { t, i18n } = useTranslation();

  const questions = [
    {
      id: "mood",
      title: "I feel like...",
      options: [
        { name: "Dramatic", description: "(Action, Adventure, Drama)" },
        { name: "Intense", description: "(Horror, Thriller)" },
        { name: "Gentle", description: "(Comedy, Family, Romance)" },
        { name: "Curious", description: "(History, Mystery)" },
        {
          name: "Out of this world",
          description: "(Fantasy, Science-Fiction)",
        },
        { name: "Realistic", description: "(Documentary)" },
      ],
    },
    {
      id: "length",
      title: "I have time for...",
      options: [
        { name: "Quick watch", description: "(Under 90 minutes)" },
        { name: "Standard length", description: "(90-120 minutes)" },
        { name: "Long journey", description: "(Over 2 hours)" },
        { name: "Mini series", description: "(Multiple episodes)" },
      ],
    },
    {
      id: "era",
      title: "I prefer movies from...",
      options: [
        { name: "Classic era", description: "(Before 1980)" },
        { name: "Golden age", description: "(1980-2000)" },
        { name: "Modern classics", description: "(2000-2015)" },
        { name: "Contemporary", description: "(2015-Present)" },
      ],
    },
    {
      id: "company",
      title: "I'm watching...",
      options: [
        { name: "Netflix", description: "Stream on Netflix" },
        { name: "Amazon Prime Video", description: "Stream on Prime Video" },
        { name: "Hulu", description: "Stream on Hulu" },
        { name: "Disney+", description: "Stream on Disney+" },
      ],
    },
  ];

  const API_KEY = "bbd89781c7835917a2decb4989b56470";
  const BASE_URL = "https://api.themoviedb.org/3";

  const handleSelect = (option) => {
    const newAnswers = {
      ...userAnswers,
      [questions[currentStep].id]: option.name,
    };
    setUserAnswers(newAnswers);

    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      fetchRecommendations(newAnswers);
      setShowResults(true);
    }
  };

  const fetchRecommendations = async (answers) => {
    setLoading(true);
    try {
      const { mood, length, era } = answers;

      const genres = {
        Dramatic: "18",
        Intense: "27",
        Gentle: "35,10751",
        Curious: "36,9648",
        "Out of this world": "14,878",
        Realistic: "99",
      };

      const runtime = {
        "Quick watch": "lt=90",
        "Standard length": "90-120",
        "Long journey": "gt=120",
      };

      const releaseDate = {
        "Classic era": "1900-1979",
        "Golden age": "1980-1999",
        "Modern classics": "2000-2015",
        Contemporary: "2016-2024",
      };

      const genre = genres[mood];
      const runtimeFilter = runtime[length];
      const [startYear, endYear] = releaseDate[era].split("-");

      const response = await axios.get(
        `${BASE_URL}/discover/movie?include_adult=false`,
        {
          params: {
            api_key: API_KEY,
            with_genres: genre,
            "release_date.gte": `${startYear}-01-01`,
            "release_date.lte": `${endYear}-12-31`,
            with_runtime: runtimeFilter,
            sort_by: "popularity.desc",
          },
        }
      );

      setRecommendedMovies(response.data.results.slice(0, 5));
    } catch (error) {
      console.error("Error fetching recommendations:", error);
    } finally {
      setLoading(false);
    }
  };

  const restart = () => {
    setCurrentStep(0);
    setUserAnswers({});
    setShowResults(false);
    setRecommendedMovies([]);
  };

  if (showResults) {
    return (
      <div className="container mx-auto px-4 py-6 min-h-screen">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-6 border-b-2 border-blue-500 pb-2">
            {t("Your Personalized Recommendations")}
          </h2>
          <div className="mb-4">
            <h3 className="font-medium mb-2">
              {t("Based on your preferences")}:
            </h3>
            <ul className="text-sm text-gray-600 mb-6">
              <li>
                {t("Mood")}: {userAnswers.mood}
              </li>
              <li>
                {t("Length")}: {userAnswers.length}
              </li>
              <li>
                {t("Era")}: {userAnswers.era}
              </li>
              <li>
                {t("Watching")}: {userAnswers.company}
              </li>
            </ul>
          </div>

          {loading ? (
            <p>Loading...</p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {recommendedMovies.map((movie) => (
                <MovieCard
                  key={movie.id}
                  id={movie.id}
                  media_type="movie"
                  title={movie.title}
                  name={movie.name}
                  poster_path={movie.poster_path}
                  userData={null}
                  className="transition-transform duration-300 hover:scale-105 hover:shadow-lg"
                />
              ))}
            </div>
          )}

          <button
            onClick={restart}
            className="w-full p-4 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors mt-6"
          >
            Start Over
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6 min-h-screen">
      <div className="mb-6">
        <div className="flex justify-between text-gray-700 mb-2">
          <span>
            {t("Question")} {currentStep + 1} {t("of")} {questions.length}
          </span>
          <span>
            {Math.round((currentStep / questions.length) * 100)}%{" "}
            {t("complete")}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-500 rounded-full h-2 transition-all duration-300"
            style={{ width: `${(currentStep / questions.length) * 100}%` }}
          />
        </div>
      </div>

      <h1 className="text-3xl font-bold text-center mb-6 border-b-2 border-blue-500 pb-2">
        {questions[currentStep].title}
      </h1>

      <div className="grid grid-cols-2 gap-4">
        {questions[currentStep].options.map((option) => (
          <button
            key={option.name}
            onClick={() => handleSelect(option)}
            className="p-4 bg-white border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition-colors"
          >
            <div className="text-lg font-medium text-gray-800">
              {option.name}
            </div>
            <div className="text-sm text-gray-600">{option.description}</div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default MovieReccomending;
