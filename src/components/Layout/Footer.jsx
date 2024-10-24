import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/button';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-black text-white">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <Link to={'/'} className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
            <span className="self-center text-2xl font-semibold whitespace-nowrap">CheeseCake</span>
          </Link>
          <ul className="flex flex-wrap items-center mb-6 text-sm font-medium sm:mb-0">
            <li>
              <Link to={'/'} className="hover:underline me-4 md:me-6">{t('Home')}</Link>
            </li>
            <li>
              <Link to={'/about'} className="hover:underline me-4 md:me-6">{t('About')}</Link>
            </li>
            <li>
              <Link to={'/movies'} className="hover:underline me-4 md:me-6">{t('Movies')}</Link>
            </li>
            <li>
              <Link to={"/tvShows"} className="hover:underline me-4 md:me-6">{t('TV Shows')}</Link>
            </li>
            <li>
              <Button asChild className="bg-red-500 text-white hover:bg-red-800">
                <Link to="/favourites" className="hover:underline">{t('Favourites')}</Link>
              </Button>
            </li>
          </ul>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span className="block text-sm text-gray-300 sm:text-center">© 2024 <Link to={'/'} className="hover:underline">Cheesecake</Link>. {t('All Rights Reserved')}</span>
      </div>
    </footer>
  );
};

export default Footer;
