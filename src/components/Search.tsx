import React, { useContext } from "react";
import { changeSearchValue } from "../actions/ActionCreator";
import { Context } from "../contexts/Context";
import { omdbFetch } from "../services/omdb";

const Search: React.FunctionComponent = (): JSX.Element => {
  const { state, dispatch } = useContext(Context);
  const { searchValue } = state;

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
        onChange={(e) => changeSearchValue(dispatch, e.target.value)}
        type="search"
      />
      <button onClick={callSearchFunction} type="submit">
        SEARCH
      </button>
    </form>
  );
};
export default Search;
