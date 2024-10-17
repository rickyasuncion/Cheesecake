// ReviewItem.js
import React from "react";

const ReviewItem = ({ review }) => {
  return (
    <div className="p-4 border-b border-gray-200">
      <h2 className="text-lg font-semibold">{review.title}</h2>
      <p className="text-sm text-gray-600">
        {review.displayName} - {new Date(review.date).toLocaleDateString()}
      </p>
      <p className="mt-2">{review.content}</p>
    </div>
  );
};

export default ReviewItem;
