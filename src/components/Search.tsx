import React, { useContext, useState } from "react";
import { Context } from "../contexts/Context";
import { omdbFetch } from "../services/omdb";

const Search: React.FunctionComponent = (): JSX.Element => {
  const { state, dispatch } = useContext(Context);

  const [searchValue, setSearchValue] = useState(state.searchValue);
  const handleSearchInputChanges = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setSearchValue(e.target.value);
  };
  const callSearchFunction = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void => {
    e.preventDefault();
    omdbFetch(dispatch, searchValue, true);
  };

  return (
    <form className="Search">
      <input
        value={searchValue}
        onChange={handleSearchInputChanges}
        type="search"
      />
      <button onClick={callSearchFunction} type="submit">
        SEARCH
      </button>
    </form>
  );
};
export default Search;
