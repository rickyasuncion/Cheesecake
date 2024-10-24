// html and css created with help with chatGpt
// prompt: create template with x inputs
// prompt: style; style better; style more; center

import React from "react";
import { Button } from "../../ui/button";

const ReviewModal = ({
  isOpen,
  onClose,
  onSubmit,
  rating,
  setRating,
  title,
  setTitle,
  content,
  setContent,
  containsSpoilers,
  setContainsSpoilers,
}) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">YOUR RATING</h2>
        <div className="flex items-center mb-4">
          <div className="flex space-x-1">
            {[...Array(10)].map((_, index) => (
              <button
                key={index}
                className={`text-2xl p-1 ${
                  index < rating ? "text-yellow-500" : "text-gray-300"
                }`}
                onClick={() => setRating(index + 1)}
              >
                ★
              </button>
            ))}
          </div>
          <span className="ml-2 text-lg">{rating}/10</span>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            className="p-2 border border-gray-300 rounded"
            placeholder="Write a headline for your review here"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            className="p-2 border border-gray-300 rounded h-32"
            placeholder="Write your review here"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <p className="text-sm text-gray-500">Required characters: 600</p>
          <div className="flex items-center gap-2">
            <span>Does this review contain spoilers?</span>
            <label className="flex items-center">
              <input
                type="radio"
                name="spoilers"
                className="mr-1"
                checked={containsSpoilers}
                onChange={() => setContainsSpoilers(true)}
              />
              Yes
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="spoilers"
                className="mr-1"
                checked={!containsSpoilers}
                onChange={() => setContainsSpoilers(false)}
              />
              No
            </label>
          </div>
          <Button type="submit">Submit</Button>
        </form>
        <button onClick={onClose} className="mt-4 text-blue-500">
          Close
        </button>
      </div>
    </div>
  );
};

export default ReviewModal;