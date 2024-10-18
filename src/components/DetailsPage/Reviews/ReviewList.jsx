// ReviewList.js
import React from "react";
import ReviewItem from "./ReviewItem";

const ReviewList = ({ reviews }) => {
  if (reviews.length === 0) return <p>No reviews yet.</p>;

  return (
    <div className="mt-6">
      {reviews.map((review, index) => (
        <ReviewItem key={index} review={review} />
      ))}
    </div>
  );
};

export default ReviewList;
