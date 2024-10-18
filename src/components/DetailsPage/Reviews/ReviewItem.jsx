import React from "react";

const ReviewItem = ({ review }) => {
  return (
    <div className="p-4 border-b border-gray-200">
      <div className="flex items-center mt-2">
        <span className="text-2xl text-yellow-500">★</span>
        <span className="ml-1 text-xl font-semibold text-gray-800">{review.rating}/10</span>
      </div>
      <h2 className="text-lg font-semibold mt-2">{review.title}</h2>
      <p className="text-sm text-gray-600">
        {review.displayName} - {new Date(review.date).toLocaleDateString()}
      </p>
      <p className="mt-2">{review.content}</p>
    </div>
  );
};

export default ReviewItem;
