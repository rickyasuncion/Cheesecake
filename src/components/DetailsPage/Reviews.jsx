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
    <div>
      <form onSubmit={handleSubmit}>
        <h1>reviews</h1>
        <input></input>
        <Button type="submit">submit</Button>
      </form>
      {reviews.length > 0 &&
        reviews.map((review) => {
          return <p key={review.id}>{review.content}</p>;
        })}
    </div>
  );
};

export default Test;
