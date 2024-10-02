import React, { useState } from "react";
import { Button } from "../ui/button";

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

const MovieReccomendation = ({genre}) => {

}

const RecommendMovieForm = () => {
  const [questions, setQuestions] = useState(0);
  const [provider, setProvider] = useState();
  const [genre, setGenre] = useState();
  const [date, setDate] = useState();
  const [budget, setBudget] = useState();
  const [isSeries, setIsSeries] = useState();
  const [popularity, setPopularity] = useState();
  const [rating, setRating] = useState();

  const question = [
    {
      topic: "I'm watching with...",
      options: [
        {
          text: "Netflix",
          value: "Netflix",
        },
        {
          text: "Amazon Prime",
          value: "Amazon Prime",
        },
        {
          text: "Disney+",
          value: "Disney+",
        },
        {
          text: "Paramount Plus",
          value: "Paramount Plus",
        },
        {
          text: "Hulu",
          value: "Hulu",
        },
      ],
    },
    {
      topic: "I feel like...",
      options: [
        {
          text: "Dramatic .Action, Adventure, Drama",
          value: ["Action", "Adventure", "Drama"],
        },
        {
          text: "Intense .Horror, Thriller",
          value: ["Horror", "Thriller"],
        },
        {
          text: "Gentle .Comedy, Family, Romance",
          value: ["Comedy", "Family", "Romance"],
        },
        {
          text: "Curious .Comedy, Family, Romance",
          value: ["Comedy", "Family", "Romance"],
        },
        {
          text: "Out of this world .Fantasy, Science-Fiction",
          value: ["Fantasy", "Science-Fiction"],
        },
        {
          text: "Realistic .Documentary",
          value: ["Documentary"],
        },
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
      topic: "With a budget of...",
      options: [
        {
          text: "Blockbuster budget .Over $100 million",
          value: 100000000,
        },
        {
          text: "Big-time budget .Around $50 million",
          value: 50000000,
        },
        {
          text: "Decent budget .Around $10 million",
          value: 10000000,
        },
        {
          text: "Small-time budget .A few million",
          value: 3000000,
        },
        {
          text: "Tiny budget .Under $500,000",
          value: 500000,
        },
      ],
    },
    {
      topic: "Part of a series?",
      options: [
        {
          text: "Yes",
          value: true,
        },
        {
          text: "No",
          value: false,
        },
        {
          text: "Doesn't matter",
          value: null,
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
          value: 90,
        },
        {
          text: "Average length .1.5 to 2.5 hours",
          value: 150,
        },
        {
          text: "Epic length .2.5 hours+",
          value: 151,
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
          setter={setBudget}
        />
      )}
      {questions === 5 && (
        <Questions
          topic={question[4].topic}
          options={question[4].options}
          setQuestions={setQuestions}
          question={questions}
          setter={setIsSeries}
        />
      )}
      {questions === 6 && (
        <Questions
          topic={question[5].topic}
          options={question[5].options}
          setQuestions={setQuestions}
          question={questions}
          setter={setPopularity}
        />
      )}
      {questions === 7 && (
        <Questions
          topic={question[6].topic}
          options={question[6].options}
          setQuestions={setQuestions}
          question={questions}
          setter={setRating}
        />
      )}
      {questions === 8 && (
        <Questions
          topic={question[7].topic}
          options={question[7].options}
          setQuestions={setQuestions}
          question={questions}
          setter={setRating}
        />
      )}
      {questions === 9 && (
        <h1>hi</h1>
      )}
    </div>
  );
};

export default RecommendMovieForm;
