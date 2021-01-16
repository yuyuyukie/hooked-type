import React, { useEffect, useState } from "react";
import { ACTIONTYPE } from "./SearchMode";

type Props = {
  dispatch: React.Dispatch<ACTIONTYPE>;
};
const MOVIE_API_URL = "https://www.omdbapi.com/?apikey=1105ff36&";

const Search: React.FunctionComponent<Props> = (props: Props): JSX.Element => {
  const search = (searchValue: string) => {
    console.log("search start");
    props.dispatch({
      type: "SEARCH_MOVIES_REQUEST",
    });
    const searchUrl: string = searchValue ? `s=${searchValue}&` : "";
    const fullUrl: string = MOVIE_API_URL + searchUrl;
    console.log(fullUrl);
    (async function (url: string): Promise<void> {
      const response = await fetch(url);
      const JSONResponse = await response.json();
      if (JSONResponse.Response === "True") {
        props.dispatch({
          type: "SEARCH_MOVIES_SUCCESS",
          payload: JSONResponse.Search,
        });
      } else {
        props.dispatch({
          type: "SEARCH_MOVIES_FAILURE",
          error: JSONResponse.Error,
        });
      }
    })(fullUrl);
  };
  useEffect(() => {
    search("man");
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
    search(searchValue);
    resetInputField();
  };
  useEffect(() => {
    search("man");
  }, []);
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
