import React from "react";
import NavBar from "./NavBar";
import SearchBar from "./SearchBar";
import LanguageSelector from "./LanguageSelector";
import Menu from "./Menu";
import { FaCirclePlay } from "react-icons/fa6";

import { Toggle } from "../../ui/toggle";
import { useMovieTrailerContext } from "../../../providers/MovieTrailerProvider";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../../ui/tooltip";

const Header = () => {
  const { toggleTrailerState } = useMovieTrailerContext();

  return (
    <div className="bg-[#1c1c1e]">
      <header className="py-3 container flex justify-between items-center">
        <NavBar />


        <TooltipProvider>
          <Tooltip>

            <TooltipTrigger>

              <Toggle className="text-white" onPressedChange={toggleTrailerState} >
                <FaCirclePlay className="size-6" />
              </Toggle>

            </TooltipTrigger>

            <TooltipContent>

              <p>Should play trailers on hover?</p>
            </TooltipContent>

          </Tooltip>

        </TooltipProvider>



        <div className="header-right flex items-center gap-3">
          <SearchBar />
          <LanguageSelector />
          <Menu />
        </div>
      </header>
    </div>
  );
};

export default Header;
