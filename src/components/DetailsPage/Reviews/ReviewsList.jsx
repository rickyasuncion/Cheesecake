// ReviewList.js
import React from "react";
import ReviewItem from "./ReviewItem";
import { Flag, MessageCircle, Star, ThumbsUp } from "lucide-react";

const ReviewsList = ({ movie, reviews }) => {
  if (reviews.length === 0) return <p>No reviews yet.</p>;

  return (
    <div className="space-y-6">
      {movie.reviews.map((review) => (
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
  );
};

export default ReviewsList;
