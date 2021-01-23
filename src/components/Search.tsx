import React, { useContext, useEffect, useState } from "react";
import { Context } from "../contexts/Context";
import { search } from "../services/omdb";

const Search: React.FunctionComponent = (): JSX.Element => {
  const dispatch = useContext(Context).dispatch;

  useEffect(() => {
    search(dispatch, "man", true);
  }, []);
  const [searchValue, setSearchValue] = useState("");
  const handleSearchInputChanges = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setSearchValue(e.target.value);
  };
  const resetInputField = (): void => {
    setSearchValue("");
  };
  const callSearchFunction = (
    e: React.MouseEvent<HTMLInputElement, MouseEvent>
  ): void => {
    e.preventDefault();
    search(dispatch, searchValue, true);
    resetInputField();
  };

  return (
    <form className="Search">
      <input
        value={searchValue}
        onChange={handleSearchInputChanges}
        type="text"
      />
      <input onClick={callSearchFunction} type="submit" value="SEARCH" />
    </form>
  );
};
export default Search;
