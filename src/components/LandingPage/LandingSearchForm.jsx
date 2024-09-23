import React from "react";
import Input from "../ui/input";
import {Button} from "../ui/button";
import { useTranslation } from "react-i18next";


const LandingSearchForm = ({searchTerm, onSearchSubmit, onSearchChange}) => {
  const { t } = useTranslation();
  return (
    <React.Fragment>
      <p className="text-center">{t('Search for your favorite Movies below:')}</p>
      <form
        className="mt-2 flex w-fit items-center mx-auto"
        onSubmit={onSearchSubmit}
      >
        <Input
          type="text"
          value={searchTerm}
          onChange={onSearchChange}
          className="mx-auto w-80"
          placeholder={t('Type your search here...')}
        />
        <Button className="px-10">{t('Search')}</Button>
      </form>
    </React.Fragment>
  );
};

export default LandingSearchForm;
