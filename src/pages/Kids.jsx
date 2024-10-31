import React from "react";
import { useTranslation } from "react-i18next";
import kidsImage from "../media/movie-kids.png"; // Import your kids image

const Kids = () => {
  const { t } = useTranslation();

  return (
    <div className="container max-w-screen-2xl">
      <div className="relative bg-black isolate text-white overflow-hidden rounded-lg mt-3">
        <img
          src={kidsImage}
          alt="Kids section banner"
          className="-z-10 absolute w-full h-full object-cover opacity-20" // Background image with low opacity
        />
        <div className="py-24 text-center space-y-4"> {/* Centering text */}
          <h1 className="text-5xl font-medium">
            {t("Welcome to the Kids Section")}
          </h1>
          <p className="max-w-lg mx-auto">
            {t("Explore our collection of fun and educational movies and shows for kids.")}
          </p>
          <div className="flex justify-center gap-5">
            <button className=" text-lg h-auto bg-transparent text-white border  border-white rounded px-4 py-2 hover:bg-white hover:text-black transition-colors ">
              <span>{t("Browse Kids Movies")}</span>
            </button>
            <button className="text-lg h-auto bg-transparent text-white border border-white rounded px-4 py-2 hover:bg-white hover:text-black transition-colors">
              <span>{t("Your Favourites ")}</span>
            </button>
          </div>
        </div>
      </div>

      <div className="py-14">
        <h2 className="text-4xl font-medium text-center">
          {t("Our Dedicated Kids Movies Team")}
        </h2>

        <div className="flex gap-5 flex-wrap mt-4">
          {/* Sample Movie Cards */}
          <div className="group flex-1 min-w-80 max-w-md">
            <div className="relative bg-[url(https://images.unsplash.com/photo-1553300544-2f93a3a2d1f5?q=80&w=2070&auto=format&fit=crop)] bg-cover aspect-square rounded-md grayscale-[50%] group-hover:grayscale-0 transition-[filter]">
              <div className="bg-white right-4 left-4 rounded-md absolute bottom-4 p-2">
                <p className="font-medium text-lg">Kids Movie 1</p>
                <span className="text-sm text-accent-foreground font-medium">Description</span>
              </div>
            </div>
          </div>
          {/* Add more movie cards as needed */}
        </div>
      </div>

      <div className="py-10">
        <p className="text-2xl font-medium text-center">
          {t("Discover and enjoy a world of fun movies for kids!")}
        </p>
      </div>
    </div>
  );
};

export default Kids;
