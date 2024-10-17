import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { createReview, getReviews } from "../../_utils/firestore";

const Reviews = () => {
  <div></div>;
};

const rev = {
  content: "it was pretty cool",
  media_type: "movie",
  media_id: "1",
};

const Test = ({ media_type = "movie", media_id }) => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      const reviewsData = await getReviews(media_type, "1");
      setReviews(reviewsData);
    };

    fetchReviews();
  }, [media_type, media_id]);

  const handleSubmit = (event) => {
    event.preventDefault();
    createReview(rev);
  };

  return (
<div className="max-w-lg mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold mb-4">Reviews</h1>
        <input
          className="p-2 border border-gray-300 rounded"
          placeholder="Write a review..."
        />
        <Button type="submit">Submit</Button>
      </form>
      {reviews.length > 0 && (
        <div className="mt-6">
          {reviews.map((review, index) => (
            <div key={index} className="p-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold">{review.title}</h2>
              <p className="text-sm text-gray-600">
                {review.displayName} - {new Date(review.date).toLocaleDateString()}
              </p>
              <p className="mt-2">{review.content}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Test;
