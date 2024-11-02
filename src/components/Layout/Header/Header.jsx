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

const Header = () => {
  const { toggleTrailerState } = useMovieTrailerContext();

  return (
    <div>
    <header className="flex items-center justify-between p-3 text-black bg-white/50 backdrop-blur-sm fixed w-full z-50 top-0">
      <NavBar />

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <Toggle onPressedChange={toggleTrailerState}>
              <FaCirclePlay className="size-6" />
            </Toggle>
          </TooltipTrigger>

          <TooltipContent>
            <p>Should play trailers on hover?</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <div className="flex items-center space-x-4">
        <SearchBar />
        <LanguageSelector />
        <Menu className="h-5 w-5" />
      </div>
    </header>
    <div className="mb-16"/>
    </div>
  );
};

export default Header;
