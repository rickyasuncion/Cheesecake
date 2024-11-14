import React, { useEffect, useState } from "react";
import { Star, ThumbsUp, MessageCircle, Flag } from "lucide-react";
import ReviewForm from "./ReviewForm";
import { getReviews } from "../../../_utils/firestore_reviews";

const Reviews = ({ title }) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' }
  const [isWritingReview, setIsWritingReview] = useState(false);
  const [reviews, setReviews] = useState([]);

  useEffect(()=>{
    const getData = async () => {
      let data = await getReviews("movie", "12345");
      setReviews(data);
    }

    getData();
  }, [])

  const sampleReviews = [
    {
      id: 1,
      author: "MovieBuff52",
      avatar: "/api/placeholder/40/40",
      rating: 4.5,
      date: "2024-03-15",
      content:
        "This show continues to push boundaries and exceed expectations. The character development is masterful, and the plot twists keep you guessing. The cinematography deserves special mention - every frame is like a painting.",
      likes: 234,
      replies: 45,
      isVerified: true,
    },
    {
      id: 2,
      author: "CinematicCritic",
      avatar: "/api/placeholder/40/40",
      rating: 5,
      date: "2024-03-10",
      content:
        "An absolute masterpiece that sets new standards for television. The attention to detail in both writing and production is remarkable. Each episode feels like a mini-movie.",
      likes: 189,
      replies: 28,
      isVerified: true,
    },
  ];

  return (
    <section className="max-w-3xl mx-auto bg-gray-900 p-6 rounded-xl">
      {/* Header */}
      <div className="mb-6 border-b border-gray-800 pb-6">
        <h2 className="text-2xl font-semibold mb-1">{title}</h2>
        <div className="flex items-center gap-4 text-gray-400">
          <div className="flex items-center gap-2">
            <Star className="text-yellow-400" fill="currentColor" size={16} />
            <span>4.8</span>
          </div>
          <span>•</span>
          <span>42 reviews</span>
        </div>
      </div>

      {/* Content */}
      <div>
        {/* Write Review Button */}
        {!isWritingReview && (
          <button
            onClick={() => setIsWritingReview(true)}
            className="w-full py-3 bg-yellow-600 hover:bg-yellow-700 rounded-lg mb-8 transition-colors"
          >
            Write a Review
          </button>
        )}

        {/* Write Review Form */}
        {isWritingReview && (
          <ReviewForm setIsWritingReview={setIsWritingReview} />
        )}

        {/* Reviews List */}
        <div className="space-y-6">
          {reviews &&
            reviews.map((review) => (
              <div key={review.id} className="bg-gray-800 rounded-lg p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={review.avatar}
                      alt={review.author}
                      className="w-10 h-10 rounded-full bg-gray-700"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">{review.displayName}</span>
                      </div>
                      <div className="text-sm text-gray-400">{review.date.toDate().toLocaleDateString(('en-US', options))}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star
                      className="text-yellow-400"
                      fill="currentColor"
                      size={16}
                    />
                    <span>{review.rating}</span>
                  </div>
                </div>
                <p className="text-gray-300 mb-4">{review.content}</p>
              </div>
            ))}
          {reviews.length === 0 && (
            <div className="p-6 bg-gray-800 rounded-lg text-gray-400 text-center">
              No reviews yet. Be the first to review!
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Reviews;
