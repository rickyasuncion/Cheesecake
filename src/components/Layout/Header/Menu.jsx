import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "../../ui/sheet";
import { useUserAuth } from "../../../_utils/auth-context";
import { useTranslation } from "react-i18next";
import {
  LogOut,
  LogIn,
  Home,
  Film,
  Tv,
  List,
  Heart,
  User,
  Settings,
  Menu,
} from "lucide-react";
import { auth } from "../../../_utils/firebase";
import { UserData } from "../../../providers/UserDataProvider";

const Sidebar = () => {
  const { firebaseSignOut } = useUserAuth();
  const { t } = useTranslation();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Menu className="hover:cursor-pointer" />
      </SheetTrigger>
      <SheetContent side="right" className="bg-white text-gray-400">
        <div className="flex items-center mb-8">
          {auth.currentUser && (
            <div className="relative">
              <img
                alt="Profile"
                src={auth.currentUser.photoURL}
                className="rounded-full size-12"
              />
            </div>
          )}
          <div className="ml-3">
            <h2 className="text-xl font-semibold text-yellow-400">
              {t(`Hi, ${auth.currentUser?.displayName || "User"}`)}
            </h2>
            <p className="text-gray-400 text-sm">{t("Welcome")}</p>
          </div>
        </div>

        <nav className="flex-1">
          <div className="space-y-1">
            <NavItem
              icon={<Home size={20} />}
              text={t("Home")}
              S
              link="/home"
            />
            <NavItem
              icon={<Film size={20} />}
              text={t("Movies")}
              link="/type/movie"
            />
            <NavItem
              icon={<Tv size={20} />}
              text={t("Shows")}
              link="/type/tv"
            />
            <NavItem icon={<List size={20} />} text={t("List")} link="/lists" />
          </div>

          <div className="mt-8 space-y-1">
            <NavItem
              icon={<Heart size={20} />}
              text={t("Favorites")}
              link="/favourites"
            />
            <NavItem
              icon={<User size={20} />}
              text={t("For You")}
              link="/for_you"
            />
          </div>

          <div className="mt-8 space-y-1">
            <NavItem
              icon={<User size={20} />}
              text={t("Users")}
              link="/users/friends"
            />
            <NavItem
              icon={<Settings size={20} />}
              text={t("Settings")}
              link="/users/settings"
            />
            {auth.currentUser ? (
              <button onClick={() => firebaseSignOut()}>
                <NavItem
                  icon={<LogOut size={20} />}
                  text={t("Sign Out")}
                  link="#"
                />
              </button>
            ) : (
              <NavItem
                icon={<LogIn size={20} />}
                text={t("Sign In")}
                link="/login"
              />
            )}
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  );
};

const NavItem = ({ icon, text, link }) => (
  <Link
    to={link}
    className="flex items-center space-x-3 p-2 rounded-lg cursor-pointer hover:text-yellow-400"
  >
    {icon}
    <span>{text}</span>
  </Link>
);

export default Sidebar;
