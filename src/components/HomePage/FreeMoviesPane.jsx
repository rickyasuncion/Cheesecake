import { Play, PlayIcon } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";

const FreeMoviesPane = () => {
  return (
    <div className="py-36 my-10 flex gap-4 bg-white container">
      <div className="space-y-8">
        <div className="flex items-center gap-3">
          <div className="w-16 h-1 bg-primary"></div>
          <p>Free Movies</p>
        </div>

        <h2 className="font-semibold text-5xl">
          Free Movies are Live Now For Friends & Family
        </h2>

        <p>
          Watch latest movies for free!! That a latest offering of cheescake.
          Free movies for kids, adults and animation lovers all at one place.
        </p>

        <div className="flex gap-8 items-center">
          <h3
            className="text-white text-5xl"
            style={{
              textShadow:
                "-2px -2px 0 #be2b2b, 2px -2px 0 #be2b2b, -2px 2px 0 #be2b2b, 2px 2px 0 #be2b2b",
              letterSpacing: ".2rem",
            }}
          >
            FULL HD
          </h3>

          <h3 className="text-4xl font-bold flex flex-col">
            <span>100+</span>{" "}
            <span className="text-base bg-secondary-foreground text-white p-1 rounded-sm">
              Active Customers
            </span>
          </h3>
        </div>

        <Button asChild className="flex gap-2 w-fit px-8 py-3 h-auto">
          <Link to={"/free-movies"}>
            <Play />
            <span>Watch Now</span>
          </Link>
        </Button>
      </div>

      <img
        src="https://themebeyond.com/html/movflx/img/images/live_img.png"
        alt=""
        className="w-1/2"
      />
    </div>
  );
};

export default FreeMoviesPane;
