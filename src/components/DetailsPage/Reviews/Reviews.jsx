// Test.js
import React, { useEffect, useState } from "react";
import { Button } from "../../ui/button";
import { createReview, getReviews } from "../../../_utils/firestore";
import ReviewModal from "./ReviewModal";
import ReviewList from "./ReviewList";

const Test = ({ media_type = "movie", media_id }) => {
  const [reviews, setReviews] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [containsSpoilers, setContainsSpoilers] = useState(false);

  useEffect(() => {
    const fetchReviews = async () => {
      const reviewsData = await getReviews(media_type, "1");
      setReviews(reviewsData);
    };

    fetchReviews();
  }, [media_type, media_id]);

  const handleSubmit = () => {
    createReview({ title, content, rating, containsSpoilers });
    setIsModalOpen(false);
    setRating(0);
    setTitle("");
    setContent("");
    setContainsSpoilers(false);
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
      <Button onClick={() => setIsModalOpen(true)}>Write a Review</Button>
      <ReviewModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
        rating={rating}
        setRating={setRating}
        title={title}
        setTitle={setTitle}
        content={content}
        setContent={setContent}
        containsSpoilers={containsSpoilers}
        setContainsSpoilers={setContainsSpoilers}
      />
      <ReviewList reviews={reviews} />
    </div>
  );
};

export default Test;
