import React from "react";
import { Link } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "../../ui/sheet";
import { useUserAuth } from "../../../_utils/auth-context";
// import { useTranslation } from "react-i18next";
import {
  LogOut,
  LogIn,
  Home,
  Film,
  Tv,
  Grid,
  List,
  Heart,
  User,
  Settings,
  Menu,
} from "lucide-react";

const Sidebar = () => {
  const { user, firebaseSignOut } = useUserAuth();
  // const { t } = useTranslation();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Menu className="hover:cursor-pointer" />
      </SheetTrigger>
      <SheetContent side="right" className="bg-white text-gray-400">
        <div className="flex items-center mb-8">
          <div className="relative">
            {/* <img
              alt="Profile"
              className="rounded-full"
            /> */}
          </div>
          <div className="ml-3">
            <h2 className="text-xl font-semibold text-yellow-400">Hi, User</h2>
            <p className="text-gray-400 text-sm">Welcome</p>
          </div>
        </div>

        <nav className="flex-1">
          <div className="space-y-1">
            <NavItem icon={<Home size={20} />} text="Home" link="/home" />
            <NavItem icon={<Film size={20} />} text="Movies" link="/movies" />
            <NavItem icon={<Tv size={20} />} text="Shows" link="/tvShows" />
            <NavItem icon={<Grid size={20} />} text="Genre" link="#" />
            <NavItem icon={<List size={20} />} text="Watchlist" link="#" />
          </div>

          <div className="mt-8 space-y-1">
            <NavItem
              icon={<Heart size={20} />}
              text="Favorites"
              link="/favourites"
            />
            <NavItem icon={<User size={20} />} text="For You" link="#" />
          </div>

          <div className="mt-8 space-y-1">
            <NavItem icon={<User size={20} />} text="Users" link="/users" />
            <NavItem
              icon={<Settings size={20} />}
              text="Settings"
              link="/settings"
            />
            {user ? (
              <button onClick={() => firebaseSignOut()}>
                <NavItem icon={<LogOut size={20} />} text="Sign Out" link="#" />
              </button>
            ) : (
              <NavItem
                icon={<LogIn size={20} />}
                text="Sign In"
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
