import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { createReview, getReviews } from "../../_utils/firestore";

const Reviews = () => {
    <div>

    </div>
}

const rev = {
    content: "it was pretty cool",
    media_type: "test",
    media_id: "1"
}

const Test = ({media_type, media_id}) => {
    const [reviews, setReviews] = useState([])

    useEffect(()=>{
        setReviews(getReviews("test", "1"))
    }, [media_type, media_id])

  return (
    <div>
      <form>
        <h1>reviews</h1>
        <input></input>
        <Button onClick={(event)=>{
            event.preventDefault();
            createReview(rev);}}>submit</Button>
      </form>
        {reviews > 0 ?? 
        reviews.map((review)=>{
            return <p>asda</p>
        })}
    </div>
  );
};

export default Test;
