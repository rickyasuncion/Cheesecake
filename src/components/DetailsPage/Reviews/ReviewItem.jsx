// html and css created with help with chatGpt
// prompt: style; style better; style more; center

import React, { useEffect, useState } from "react";

const ReviewItem = ({ review }) => {
  const [showSpoilerWarning, setShowSpoilerWarning] = useState(false);

  const btnHandler = () => {
    setShowSpoilerWarning(!showSpoilerWarning);
  }

  useEffect(() => {
    if (review.containsSpoilers) {
      setShowSpoilerWarning(true);
    }
  }, []);

  return (
    <div className="p-4 border-b border-gray-200 rounded-lg bg-black">
      <div className="flex items-center mt-2">
        <span className="text-2xl text-yellow-500">★</span>
        <span className="ml-1 text-xl font-semibold text-gray-800">
          {review.rating}/10
        </span>
      </div>
      <h2 className="text-lg font-semibold mt-2">{review.title}</h2>
      <p className="text-sm text-gray-600">
        {review.displayName} - {new Date(review.date).toLocaleDateString()}
      </p>
      {showSpoilerWarning ? (
        <button onClick={btnHandler} className="text-red-600">Warning: Spoiler!</button>
      ) : (
        <p className="mt-2">{review.content}</p>
      )}
    </div>
  );
};

export default ReviewItem;
