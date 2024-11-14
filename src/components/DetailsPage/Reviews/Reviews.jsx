import React, { useEffect, useState } from "react";
import { Star } from "lucide-react";
import ReviewForm from "./ReviewForm";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../../_utils/firebase";

const Reviews = ({ title, type, id }) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  const [isWritingReview, setIsWritingReview] = useState(false);
  const [reviews, setReviews] = useState([]);

  const reviewsRef = collection(db, "reviews", type, id);

  useEffect(() => {
    const unsubscribe = onSnapshot(reviewsRef, (snapshot) => {
      const reviewsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setReviews(reviewsData);
    });
    return () => unsubscribe();
  }, [reviewsRef]);

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
          <ReviewForm
            setIsWritingReview={setIsWritingReview}
            type={type}
            id={id}
          />
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
                        <span className="font-semibold">
                          {review.displayName}
                        </span>
                      </div>
                      <div className="text-sm text-gray-400">
                        {review.date &&
                          review.date
                            .toDate()
                            .toLocaleDateString(("en-US", options))}
                      </div>
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
