import { Star, X } from "lucide-react";
import { useState } from "react";

const ReviewForm = ({setIsWritingReview}) => {
    const [rating, setRating] = useState(0);

    return (
    <div className="bg-gray-800 rounded-lg p-6 mb-8">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold">Write a Review</h3>
        <button 
          onClick={() => setIsWritingReview(false)}
          className="text-gray-400 hover:text-white"
        >
          <X size={20} />
        </button>
      </div>
      
      <div className="mb-6">
        <label className="block text-gray-400 mb-2">Rating</label>
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((star) => (
            <button
              key={star}
              onClick={() => setRating(star)}
              className="hover:scale-110 transition-transform"
            >
              <Star 
                size={24}
                className={star <= rating ? "text-yellow-400" : "text-gray-600"}
                fill={star <= rating ? "currentColor" : "none"}
              />
            </button>
          ))}
        </div>
      </div>
      
      <div className="mb-6">
        <label className="block text-gray-400 mb-2">Your Review</label>
        <textarea 
          className="w-full bg-gray-700 rounded-lg p-4 text-white resize-none focus:outline-none focus:ring-2 focus:ring-red-500"
          rows={4}
          placeholder="Share your thoughts about this title..."
        />
      </div>
      
      <div className="flex justify-end gap-4">
        <button 
          onClick={() => setIsWritingReview(false)}
          className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
        >
          Cancel
        </button>
        <button className="px-6 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors">
          Post Review
        </button>
      </div>
    </div>
  );
}

  export default ReviewForm;