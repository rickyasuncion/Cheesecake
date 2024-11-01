import React from "react";
import NavBar from "./NavBar";
import SearchBar from "./SearchBar";
import LanguageSelector from "./LanguageSelector";
import Menu from "./Menu";
import { FaCirclePlay } from "react-icons/fa6";

import { Toggle } from "../../ui/toggle";
import { useMovieTrailerContext } from "../../../providers/MovieTrailerProvider";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../ui/tooltip";
import { Search } from "lucide-react";
import { Link } from "react-router-dom";

const Header = () => {
  const { toggleTrailerState } = useMovieTrailerContext();

  return (
    <header className="flex items-center justify-between p-3 text-black bg-white/50 backdrop-blur-sm fixed w-full z-50 top-0">
      <div className="flex items-center space-x-6">
        <Link to={"/home"}>
          <h1 className="text-xl font-bold">CheeseCake</h1>
        </Link>
        <nav className="hidden md:flex space-x-4 text-sm">
          <Link to={"/movies"} className="hover:text-yellow-400">
            Movies
          </Link>
          <Link to="/tvShows" className="hover:text-yellow-400">
            TV Shows
          </Link>
          <Link to="/free-movies" className="hover:text-yellow-400">
            Free Movies
          </Link>
          <Link to="/Kids" className="hover:text-yellow-400">
            Kids
          </Link>
          <div className="relative group">
            <button className="hover:text-yellow-400">Genres</button>
            <div className="absolute hidden group-hover:block text-white w-40 bg-gray-800 rounded-md shadow-lg p-1">
              <Link
                to="/home"
                className="block px-3 py-1 text-sm hover:bg-gray-700 rounded"
              >
                Action
              </Link>
              <Link
                to="/home"
                className="block px-3 py-1 text-sm hover:bg-gray-700 rounded"
              >
                Drama
              </Link>
              <Link
                to="/home"
                className="block px-3 py-1 text-sm hover:bg-gray-700 rounded"
              >
                Comedy
              </Link>
            </div>
          </div>
        </nav>
      </div>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <Toggle className="text-white" onPressedChange={toggleTrailerState}>
              <FaCirclePlay className="size-6" />
            </Toggle>
          </TooltipTrigger>

          <TooltipContent>
            <p>Should play trailers on hover?</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <div className="flex items-center space-x-4">
        <SearchBar/>
        <LanguageSelector />

        <Menu className="h-5 w-5" />
      </div>
    </header>
  );
};

export default Header;
