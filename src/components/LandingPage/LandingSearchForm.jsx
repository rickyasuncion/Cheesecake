import React from "react";
import { Input } from "../UI/lib/input";
import { Button } from "../UI/lib/button";

const LandingSearchForm = ({searchTerm, onSearchSubmit, onSearchChange}) => {
  return (
    <React.Fragment>
      <p className="text-center">Search for your favorite Movies below:</p>
      <form
        className="mt-2 flex w-fit items-center mx-auto"
        onSubmit={onSearchSubmit}
      >
        <Input
          type="text"
          value={searchTerm}
          onChange={onSearchChange}
          className="mx-auto w-80"
          placeholder="Type your search here..."
        />
        <Button className="px-10">Search</Button>
      </form>
    </React.Fragment>
  );
};

export default LandingSearchForm;
