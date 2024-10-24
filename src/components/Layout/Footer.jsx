
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/button';

const Footer = () => {
  return (
    <footer class="bg-black text-white">
      <div class="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div class="sm:flex sm:items-center sm:justify-between">
          <Link to={'/'} class="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
            <span class="self-center text-2xl font-semibold whitespace-nowrap ">CheeseCake</span>
          </Link>
          <ul class="flex flex-wrap items-center mb-6 text-sm font-medium sm:mb-0">
            <li>
              <Link to={'/'} class="hover:underline me-4 md:me-6">Home</Link>
            </li>
            <li>
              <Link to={'/about'} class="hover:underline me-4 md:me-6">About</Link>
            </li>
            <li>
              <Link to={'/movies'} class="hover:underline me-4 md:me-6">Movies</Link>
            </li>
            <li>
              <Link to={"/tvShows"} class="hover:underline me-4 md:me-6">TV Shows</Link>
            </li>
            <li>
              <Button asChild className="bg-red-500 text-white hover:bg-red-800">
                <Link to="/favourites" class="hover:underline">Favourites</Link>
              </Button>
            </li>
          </ul>
        </div>
        <hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span class="block text-sm text-gray-300 sm:text-center ">© 2024 <Link to={'/'} class="hover:underline">Cheescake</Link>. All Rights Reserved.</span>
      </div>
    </footer>
  );
};

export default Footer;
