import React, { useContext, useEffect, useState } from "react";
import { Context } from "../contexts/Context";

const MOVIE_API_URL = "https://www.omdbapi.com/?apikey=1105ff36&";

const Search: React.FunctionComponent = (): JSX.Element => {
  const dispatch = useContext(Context).dispatch;
  const search = (searchValue: string, pageNumber: number) => {
    if (!dispatch) {
      return;
    }
    dispatch({
      type: "fetch-request",
    });
    const searchUrl: string = searchValue ? `s=${searchValue}&` : "";
    const pageUrl: string = pageNumber ? `page=${pageNumber}&` : "";
    const fullUrl: string = MOVIE_API_URL + searchUrl + pageUrl;
    (async function (url: string): Promise<void> {
      const response = await fetch(url);
      const JSONResponse = await response.json();
      if (JSONResponse.Response === "True") {
        dispatch({
          type: "fetch-success",
          payload: JSONResponse.Search,
        });
      } else {
        dispatch({
          type: "fetch-failure",
          error: JSONResponse.Error,
        });
      }
    })(fullUrl);
  };
  useEffect(() => {
    search("man", 1);
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
    search(searchValue, 1);
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
