import React, { useContext, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { fetchData } from "../_utils/utils";
import { MovieCard } from "../components/ui/MovieCard";
import { UserData } from "../providers/UserDataProvider";
import { auth } from "../_utils/firebase";
import AccountNotice from "../components/AccountNotice";

const ForYou = () => {
  const { t, i18n } = useTranslation();
  const { userData } = useContext(UserData);

  const [currentStep, setCurrentStep] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [quizRecommendedMovies, setQuizRecommendedMovies] = useState([]); // Renamed this state
  const [loading, setLoading] = useState(false);

  const [personalizedRecommendedMovies, setPersonalizedRecommendedMovies] =
    useState([]); // Separate state for personalized recommendations
  const [recommendedTv, setRecommendedTv] = useState([]);
  const questions = [
    {
      id: "mood",
      title: t("I feel like..."),
      options: [
        { name: t("Dramatic"), description: t("(Action, Adventure, Drama)") },
        { name: t("Intense"), description: t("(Horror, Thriller)") },
        { name: t("Gentle"), description: t("(Comedy, Family, Romance)") },
        { name: t("Curious"), description: t("(History, Mystery)") },
        {
          name: t("Out of this world"),
          description: t("(Fantasy, Science-Fiction)"),
        },
        { name: t("Realistic"), description: t("(Documentary)") },
      ],
    },
    {
      id: "length",
      title: t("I have time for..."),
      options: [
        { name: t("Quick watch"), description: t("(Under 90 minutes)") },
        { name: t("Standard length"), description: t("(90-120 minutes)") },
        { name: t("Long journey"), description: t("(Over 2 hours)") },
        { name: t("Mini series"), description: t("(Multiple episodes)") },
      ],
    },
    {
      id: "era",
      title: t("I prefer movies from..."),
      options: [
        { name: t("Classic era"), description: t("(Before 1980)") },
        { name: t("Golden age"), description: "(1980-2000)" },
        { name: t("Modern classics"), description: "(2000-2015)" },
        { name: t("Contemporary"), description: t("(2015-Present)") },
      ],
    },
    {
      id: "company",
      title: t("I'm watching..."),
      options: [
        { name: "Netflix", description: t("Stream on Netflix") },
        {
          name: "Amazon Prime Video",
          description: t("Stream on Prime Video"),
        },
        { name: "Hulu", description: t("Stream on Hulu") },
        { name: "Disney+", description: t("Stream on Disney+") },
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

      setQuizRecommendedMovies(response.data.results.slice(0, 5)); // Set quiz recommendations to a separate state
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
    setQuizRecommendedMovies([]); // Reset quiz recommendations
  };

  useEffect(() => {
    const getData = async () => {
      const moviesData = await Promise.all(
        userData.recentlyViewedMovies.map(async (mov) => {
          const data = await fetchData(
            `https://api.themoviedb.org/3/movie/${mov}/recommendations?api_key=bbd89781c7835917a2decb4989b56470&language=${i18n.language}`
          );
          return data?.results || [];
        })
      );
      setPersonalizedRecommendedMovies(moviesData.flat().splice(0, 6));

      const tvData = await Promise.all(
        userData.recentlyViewedTv.map(async (tv) => {
          const data = await fetchData(
            `https://api.themoviedb.org/3/tv/${tv}/recommendations?api_key=bbd89781c7835917a2decb4989b56470&language=${i18n.language}`
          );
          return data?.results || [];
        })
      );
      setRecommendedTv(tvData.flat().splice(0, 6));
    };

    if (
      userData &&
      userData.recentlyViewedMovies &&
      userData.recentlyViewedTv
    ) {
      getData();
    }
  }, [userData, i18n.language]);

  return (
    <div className="container mx-auto px-4 py-6 min-h-screen">
      {/* Movie Recommendation Quiz */}
      {!showResults ? (
        <>
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
                className="bg-yellow-500 rounded-full h-2 transition-all duration-300"
                style={{ width: `${(currentStep / questions.length) * 100}%` }}
              />
            </div>
          </div>

          <h1 className="text-3xl font-bold text-center mb-6 border-b-2 border-yellow-500 pb-2">
            {questions[currentStep].title}
          </h1>

          <div className="grid grid-cols-2 gap-4">
            {questions[currentStep].options.map((option) => (
              <button
                key={option.name}
                onClick={() => handleSelect(option)}
                className="p-4 bg-white border border-gray-200 rounded-lg hover:bg-yellow-50 hover:border-yellow-300 transition-colors"
              >
                <div className="text-lg font-medium text-gray-800">
                  {option.name}
                </div>
                <div className="text-sm text-gray-600">
                  {option.description}
                </div>
              </button>
            ))}
          </div>
        </>
      ) : (
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-6 border-b-2 border-yellow-500 pb-2">
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
              {quizRecommendedMovies.map((movie) => (
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
            className="w-full p-4 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors mt-6"
          >
            {t("Start Over")}
          </button>
        </div>
      )}

      {/* Personalized Recommendations */}
      {!auth.currentUser ? (
        <>
          <h2 className="text-3xl font-bold mb-6 border-b-2 border-yellow-500 pb-2">
            {t("Recommended Movies Based on Your Recently Viewed")}
          </h2>
          <AccountNotice />
        </>
      ) : (
        <div className="mt-12">
          {personalizedRecommendedMovies.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {personalizedRecommendedMovies.map((movie) => (
                <MovieCard
                  key={movie.id}
                  id={movie.id}
                  media_type="movie"
                  title={movie.title}
                  poster_path={movie.poster_path}
                  userData={userData}
                  className="transition-transform duration-300 hover:scale-105 hover:shadow-lg"
                />
              ))}
            </div>
          ) : (
            <p className="italic">No movie recommendations available</p>
          )}

          <h2 className="text-3xl font-bold mb-6 mt-12 border-b-2 border-yellow-500 pb-2">
            {t("Recommended TV Shows Based on Your Recently Viewed")}
          </h2>
          {recommendedTv.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {recommendedTv.map((tv) => (
                <MovieCard
                  key={tv.id}
                  id={tv.id}
                  media_type="tv"
                  title={tv.name}
                  poster_path={tv.poster_path}
                  userData={userData}
                  className="transition-transform duration-300 hover:scale-105 hover:shadow-lg"
                />
              ))}
            </div>
          ) : (
            <p className="italic">No TV show recommendations available</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ForYou;
