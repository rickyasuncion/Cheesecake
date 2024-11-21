import React, { useRef, useState } from "react";
import { FaPause, FaPlay } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { IoMdInformationCircleOutline } from "react-icons/io";

const MovieTrailer = () => {
  const videoRef = useRef();
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  return (
    <div className="relative -z-10">
      <div className="z-20 absolute bottom-1/4 text-white p-10 space-y-4">
        <h1
          className="text-6xl text-center w-fit font-thin "
          style={{ letterSpacing: "1rem" }}
        >
          <span className="block">OUR</span> <span>OCEANS</span>{" "}
        </h1>

        <span className="font-semibold text-lg block">
          <span className="bg-red-500 p-1 rounded-sm mr-2">Top 10</span>
          #2 movie in trending
        </span>

        <p className="max-w-lg">
          Embark on a global odyssey to discover the largest and least explored
          habitat on earth. New ocean science and technology has allowed us to
          go further into the unknown than we ever thought possible.
        </p>

        <div className="flex gap-3 mt-3">
          <button
            className="bg-white text-black px-8 py-3 rounded-sm flex items-center gap-3"
            onClick={() => {
              if (isVideoPlaying) {
                videoRef.current.pause();
                setIsVideoPlaying(false);
              } else {
                videoRef.current.play();
                setIsVideoPlaying(true);
              }
            }}
          >
            {isVideoPlaying ? <FaPause /> : <FaPlay />}
            {isVideoPlaying ? "Pause" : "Play"}
          </button>

          <Button
            asChild
            variant="outline"
            className="bg-blue-400 bg-opacity-20 px-6 border-2  h-auto text-lg font-normal hover:bg-opacity-30 hover:bg-blue-400 hover:text-white"
          >
            <Link to={`/details/movie/533962`}>
              <IoMdInformationCircleOutline className="size-7 mr-2" />
              More info
            </Link>
          </Button>
        </div>
      </div>

      <img
        src={"/image.png"}
        className="absolute -z-10 w-full h-full object-cover"
        alt=""
      />
      <video
        ref={videoRef}
        src="/our_oceans_trailer.mp4"
        className={`transition-opacity duration-700 opacity-0 ${
          isVideoPlaying && "opacity-100"
        }`}
      ></video>

      <div className="h-36 w-full  bg-gradient-to-b from-transparent via-black  to-[#f3f4f6] absolute  bottom-0 translate-y-10 z-20"></div>
    </div>
  );
};

export default MovieTrailer;
