import React, { useEffect, useState } from "react";
import { createReview, getReviews } from "../../../_utils/firestore";
import ReviewModal from "./ReviewModal";
import ReviewsList from "./ReviewsList";

const Reviews = ({ media_type, media_id }) => {
  const [reviews, setReviews] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [containsSpoilers, setContainsSpoilers] = useState(false);

  useEffect(() => {
    const fetchReviews = async () => {
      const reviewsData = await getReviews(media_type, media_id);
      setReviews(reviewsData);
    };

    fetchReviews();
  }, [media_type, media_id, isModalOpen]);

  const handleSubmit = () => {
    createReview({ title, content, media_type, media_id, rating, containsSpoilers });
    setIsModalOpen(false);
    setRating(0);
    setTitle("");
    setContent("");
    setContainsSpoilers(false);
  };

    // Calculate average rating
    const totalReviews = Object.values(movieData.ratingDistribution).reduce((a, b) => a + b, 0);
    const averageRating = Object.entries(movieData.ratingDistribution)
      .reduce((acc, [rating, count]) => acc + (Number(rating) * count), 0) / totalReviews;

  return (
    <div className="border-t border-gray-800 pt-8">
    <div className="flex items-center justify-between mb-8">
      <h2 className="text-2xl font-semibold">Reviews</h2>
      <button className="px-6 py-2 bg-red-600 hover:bg-red-700 rounded-full transition-colors">
        Write a Review
      </button>
    </div>

    {/* Rating Distribution */}
    <div className="bg-gray-800 rounded-lg p-6 mb-8">
      <div className="grid grid-cols-2 gap-8">
        {/* Left side - Average rating */}
        <div className="flex flex-col items-center justify-center border-r border-gray-700">
          <div className="text-5xl font-bold mb-2">
            {averageRating.toFixed(1)}
          </div>
          <div className="flex items-center gap-1 mb-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                size={20}
                className={
                  star <= Math.round(averageRating)
                    ? "text-yellow-400"
                    : "text-gray-600"
                }
                fill={
                  star <= Math.round(averageRating)
                    ? "currentColor"
                    : "none"
                }
              />
            ))}
          </div>
          <div className="text-gray-400 text-sm">
            {totalReviews.toLocaleString()} reviews
          </div>
        </div>

        {/* Right side - Rating bars */}
        <div className="space-y-2">
          {[5, 4, 3, 2, 1].map((rating) => (
            <div key={rating} className="flex items-center gap-2">
              <div className="w-4">{rating}</div>
              <div className="flex-1 h-2 bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-yellow-400"
                  style={{
                    width: `${
                      (movieData.ratingDistribution[rating] /
                        totalReviews) *
                      100
                    }%`,
                  }}
                />
              </div>
              <div className="w-12 text-sm text-gray-400">
                {Math.round(
                  (movieData.ratingDistribution[rating] /
                    totalReviews) *
                    100
                )}
                %
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* Reviews List */}
    <div className="space-y-6">
      {movieData.reviews.map((review) => (
        <div key={review.id} className="bg-gray-800 rounded-lg p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gray-700" />
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-medium">{review.author}</span>
                  {review.isVerified && (
                    <span className="text-xs bg-blue-500 text-white px-2 py-0.5 rounded-full">
                      Verified
                    </span>
                  )}
                </div>
                <div className="text-sm text-gray-400">
                  {review.date}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  className={
                    i < review.rating
                      ? "text-yellow-400"
                      : "text-gray-600"
                  }
                  fill={i < review.rating ? "currentColor" : "none"}
                />
              ))}
            </div>
          </div>
          <p className="text-gray-300 mb-4">{review.content}</p>
          <div className="flex items-center gap-6 text-sm text-gray-400">
            <button className="flex items-center gap-2 hover:text-white transition-colors">
              <ThumbsUp size={16} />
              <span>{review.likes}</span>
            </button>
            <button className="flex items-center gap-2 hover:text-white transition-colors">
              <MessageCircle size={16} />
              <span>{review.replies}</span>
            </button>
            <button className="flex items-center gap-2 hover:text-white transition-colors">
              <Flag size={16} />
              <span>Report</span>
            </button>
          </div>
        </div>
      ))}
    </div>

    <button className="w-full mt-6 py-3 border border-gray-700 rounded-lg text-gray-400 hover:text-white hover:border-gray-600 transition-colors">
      Load More Reviews
    </button>
  </div>
  );
};

export default Reviews;
