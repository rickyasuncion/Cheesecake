import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { MovieCard } from "../ui/MovieCard";
import { fetchData, filterResults } from "../../_utils/utils";
import MovieListView from "./MovieListView";

const Questions = ({ topic, options, setQuestions, question, setter }) => {
  const btnHandler = (option) => {
    setter(option);
    setQuestions(question + 1);
  };

  return (
    <React.Fragment>
      <h1>{topic}</h1>
      {options.map((option, index) => {
        const [mainText, subtitle] = option.text.split(" .");
        return (
          <Button
            key={index}
            onClick={() => btnHandler(option.value)}
            className="text-white text-xl font-semibold p-4 rounded w-1/4 h-11"
          >
            <div>
              {mainText}
              {subtitle && (
                <span className="block text-sm text-gray-300">{subtitle}</span>
              )}
            </div>
          </Button>
        );
      })}
    </React.Fragment>
  );
};

const MovieReccomendation = ({
  provider,
  genres,
  date,
  popularity,
  rating,
  runtime,
}) => {
    const[movies, setMovies] = useState();
    const[movie, setMovie] = useState();

  const currentYear = new Date().getFullYear();
  const yearDifference = currentYear - date;
  const newDate = new Date(currentYear - yearDifference, 0, 1).toISOString().split('T')[0];
  const currentDate = new Date().toISOString().split('T');

  let movieLength;
  if (runtime == null) {
    movieLength = null;
  } else if (runtime == "short") {
    movieLength = { with_runtime_lte: 90 };
  } else if (runtime == "average") {
    movieLength = { with_runtime_gte: 90, with_runtime_lte: 150 };
  } else if (runtime == "epic") {
    movieLength = { with_runtime_gte: 150 };
  }

    const queryString = new URLSearchParams({
      with_watch_providers: provider,
      with_genres: genres.join(","),
      primary_release_date_gte: newDate,
      primary_release_date_lte: currentDate[0],
      "vote_average.gte": rating,
      "vote_count.lte": popularity,
      ...movieLength
    }).toString();

    
    useEffect(() => {
        const url = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&${queryString}&api_key=bbd89781c7835917a2decb4989b56470`;
        const fetchMovies = async () => {
            const fetchedMovies = await fetchData(url);
            setMovies(filterResults(fetchedMovies));
          };

          fetchMovies();
    }, []);


    return (
        <MovieListView
        movies={movies}
        title={"reccommended movies"}
        contentType="movies"
      ></MovieListView>
    )
};

const RecommendMovieForm = () => {
  const [questions, setQuestions] = useState(0);
  const [provider, setProvider] = useState();
  const [genre, setGenre] = useState();
  const [date, setDate] = useState();
  const [popularity, setPopularity] = useState();
  const [rating, setRating] = useState();
  const [runtime, setRuntime] = useState();

  const question = [
    {
      topic: "I'm watching with...",
      options: [
        {
          text: "Netflix",
          value: 8,
        },
        {
          text: "Amazon Prime",
          value: 9,
        },
        {
          text: "Disney+",
          value: 337,
        },
        {
          text: "Paramount Plus",
          value: 582,
        },
        {
          text: "Hulu",
          value: 15,
        },
      ],
    },
    {
      topic: "I feel like...",
      options: [
        {
            text: "Dramatic .Action, Adventure, Drama",
            value: [28, 12, 18], // Action, Adventure, Drama
          },
          {
            text: "Intense .Horror, Thriller",
            value: [27, 53], // Horror, Thriller
          },
          {
            text: "Gentle .Comedy, Family, Romance",
            value: [35, 10751, 10749], // Comedy, Family, Romance
          },
          {
            text: "Curious .Comedy, Family, Romance",
            value: [35, 10751, 10749], // Comedy, Family, Romance
          },
          {
            text: "Out of this world .Fantasy, Science-Fiction",
            value: [14, 878], // Fantasy, Science-Fiction
          },
          {
            text: "Realistic .Documentary",
            value: [99] // Documentary
          }
      ],
    },
    {
      topic: "Released...",
      options: [
        {
          text: "This year",
          value: 0,
        },
        {
          text: "Last few years",
          value: 5,
        },
        {
          text: "Last 10 years",
          value: 10,
        },
        {
          text: "Last 25 years",
          value: 25,
        },
        {
          text: "Last 100 years",
          value: 100,
        },
      ],
    },
    {
      topic: "How popular...",
      options: [
        {
          text: "A household name .Over 50,000 votes",
          value: 50000,
        },
        {
          text: "Well-known .Over 10,000 votes",
          value: 10000,
        },
        {
          text: "I don't care about popularity",
          value: null,
        },
      ],
    },
    {
      topic: "And is...",
      options: [
        {
          text: "Highly rated .Over 7/10 rated",
          value: 7,
        },
        {
          text: "At least average .Over 5/10 rated",
          value: 5,
        },
        {
          text: "I don't mind",
          value: null,
        },
      ],
    },
    {
      topic: "How long...",
      options: [
        {
          text: "Short and sweet .~90 minutes",
          value: "short",
        },
        {
          text: "Average length .1.5 to 2.5 hours",
          value: "average",
        },
        {
          text: "Epic length .2.5 hours+",
          value: "epic",
        },
        {
          text: "Time flies when you're having fun",
          value: null,
        },
      ],
    },
  ];

  return (
    <div className="flex flex-col gap-2 text-lg font-semibold font-mono items-center justify-center min-h-screen bg-gray-100">
      {questions === 0 && (
        <React.Fragment>
          <h1>Looking to find something to wathc?</h1>
          <h2>Take this quick quiz to find the best movie.</h2>
          <Button onClick={() => setQuestions(questions + 1)}>Start</Button>
        </React.Fragment>
      )}
      {questions === 1 && (
        <Questions
          topic={question[0].topic}
          options={question[0].options}
          setQuestions={setQuestions}
          question={questions}
          setter={setProvider}
        />
      )}
      {questions === 2 && (
        <Questions
          topic={question[1].topic}
          options={question[1].options}
          setQuestions={setQuestions}
          question={questions}
          setter={setGenre}
        />
      )}
      {questions === 3 && (
        <Questions
          topic={question[2].topic}
          options={question[2].options}
          setQuestions={setQuestions}
          question={questions}
          setter={setDate}
        />
      )}
      {questions === 4 && (
        <Questions
          topic={question[3].topic}
          options={question[3].options}
          setQuestions={setQuestions}
          question={questions}
          setter={setPopularity}
        />
      )}
      {questions === 5 && (
        <Questions
          topic={question[4].topic}
          options={question[4].options}
          setQuestions={setQuestions}
          question={questions}
          setter={setRating}
        />
      )}
      {questions === 6 && (
        <Questions
          topic={question[5].topic}
          options={question[5].options}
          setQuestions={setQuestions}
          question={questions}
          setter={setRuntime}
        />
      )}
      {questions === 7 && (
        <MovieReccomendation
          provider={provider}
          genres={genre}
          date={date}
          popularity={popularity}
          rating={rating}
          runtime={runtime}
        />
      )}
    </div>
  );
};

export default RecommendMovieForm;
