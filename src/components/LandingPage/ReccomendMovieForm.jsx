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
        const [mainText, subtitle] = option.split(" .");
        return (
          <Button
            key={index}
            onClick={() => btnHandler(option)}
            className="text-white text-xl font-semibold p-4 rounded w-1/4 h-11 transition duration-200 ease-in-out"
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

const RecommendMovieForm = () => {
  const [questions, setQuestions] = useState(1);
  const [provider, setProvider] = useState();
  const [genre, setGenre] = useState();
  const [date, setDate] = useState();
  const [budget, setBudget] = useState();
  const [isSeries, setIsSeries] = useState();
  const [popularity, setPopularity] = useState();
  const [rating, setRating] = useState();

  const question1 = {
    topic: "I'm watching with...",
    options: ["Netflix", "Amazon Prime", "Disney+", "Paramount Plus"],
  };
  const question2 = {
    topic: "I feel like...",
    options: [
      "Dramatic .Action, Adventure, Drama",
      "Intense .Horror, Thriller",
      "Gentle .Comedy, Family, Romance",
      "Curious .Comedy, Family, Romance",
      "Out of this world .Fantasy, Science-Fiction",
      "Realistic .Documentary",
    ],
  };
  const question3 = {
    topic: "Released...",
    options: [
      "This year",
      "Last few years",
      "Last 10 years",
      "Last 25 years",
      "Last 100 years",
    ],
  };
  const question4 = {
    topic: "With a budget of...",
    options: [
      "Blockbuster budget .Over $100 million",
      "Big-time budget .Around $50 million",
      "Decent budget .Around $10 million",
      "Small-time budget .A few million",
      "Tiny budget .Under $500,000",
    ],
  };
  const question5 = {
    topic: "Part of a series?",
    options: ["Yes", "No", "Doesn't matter"],
  };
  const question6 = {
    topic: "How popular...",
    options: [
      "A household name .Over 50,000 votes",
      "Well-known .Over 10,000 votes",
      "I don't care about popularity",
    ],
  };
  const question7 = {
    topic: "And is...",
    options: [
      "Highly rated .Over 7/10 rated",
      "At least average .Over 5/10 rated",
      "I don't mind",
    ],
  };
  const question8 = {
    topic: "How long...",
    options: [
      "Short and sweet .~90 minutes",
      "Average length .1.5 to 2.5 hours",
      "Epic length .2.5 hours+",
      "Time flies when you're having fun",
    ],
  };

  return (
    <div className="flex flex-col gap-2 text-lg font-semibold font-mono items-center justify-center min-h-screen bg-gray-100">
      {questions === 1 && (
        <Questions
          topic={question1.topic}
          options={question1.options}
          setQuestions={setQuestions}
          question={questions}
          setter={setProvider}
        />
      )}
      {questions === 2 && (
        <Questions
          topic={question2.topic}
          options={question2.options}
          setQuestions={setQuestions}
          question={questions}
          setter={setGenre}
        />
      )}
      {questions === 3 && (
        <Questions
          topic={question3.topic}
          options={question3.options}
          setQuestions={setQuestions}
          question={questions}
          setter={setDate}
        />
      )}
      {questions === 4 && (
        <Questions
          topic={question4.topic}
          options={question4.options}
          setQuestions={setQuestions}
          question={questions}
          setter={setBudget}
        />
      )}
      {questions === 5 && (
        <Questions
          topic={question5.topic}
          options={question5.options}
          setQuestions={setQuestions}
          question={questions}
          setter={setIsSeries}
        />
      )}
      {questions === 6 && (
        <Questions
          topic={question6.topic}
          options={question6.options}
          setQuestions={setQuestions}
          question={questions}
          setter={setPopularity}
        />
      )}
      {questions === 7 && (
        <Questions
          topic={question7.topic}
          options={question7.options}
          setQuestions={setQuestions}
          question={questions}
          setter={setRating}
        />
      )}
    </div>
  );
};

export default RecommendMovieForm;
