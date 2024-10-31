import React from "react";
import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { Sheet, SheetContent, SheetTrigger } from "../../ui/sheet";
import { useUserAuth } from "../../../_utils/auth-context";
import { useTranslation } from "react-i18next";
import { TextAlignJustifyIcon } from "@radix-ui/react-icons";
import { Button } from "../../ui/button";


const Menu = () => {
  const { user, firebaseSignOut } = useUserAuth();
  const { t } = useTranslation();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button>
          <TextAlignJustifyIcon className="mr-2" />
          {t("Menu")}
        </Button>
      </SheetTrigger>
      <SheetContent side="right">
        <nav className="flex flex-col">
          {user ? (
            <Link className="p-2 text-white" onClick={() => firebaseSignOut()}>
              {t("Logout")}
            </Link>
          ) : (
            <Link className="p-2 text-white" to="/login">
              {t("Login")}
            </Link>
          )}
          <Link to="/movies" className="p-2 text-white">
            {t("Movies")}
          </Link>
          <Link to="/tvShows" className="p-2 text-white">
            {t("TV Shows")}
          </Link>
          <Link to="/settings" className="p-2 text-white">
            {t("Settings")}
          </Link>
          <Link to="/about" className="p-2 text-white">
            {t("About")}
          </Link>
          <Link to="/terms-of-use" className="p-2 text-white">
            {t("Terms of Use")}
          </Link>
          <Link to="/privacy-policy" className="p-2 text-white">
            {t("Privacy Policy ")}
          </Link>
          <Link to="/favourites" className="p-2 text-white">
            <FaHeart className="text-red-600 inline" /> {t("Favourites")}
          </Link>
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default Menu;
