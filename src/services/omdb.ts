import { ACTIONTYPE } from "../actions/ActionCreator";

export const search = (
  dispatch: React.Dispatch<ACTIONTYPE> | null,
  searchValue: string,
  needReflesh: boolean,
  pageNumber = 1
) => {
  if (!dispatch) {
    return;
  }
  console.log(searchValue, pageNumber);
  dispatch({
    type: "fetch-request",
    value: searchValue,
    page: pageNumber,
  });
  const MOVIE_API_URL = "https://www.omdbapi.com/?apikey=1105ff36&";
  const searchUrl = `s=${searchValue}&`;
  const pageUrl = `page=${pageNumber}&`;
  const fullUrl: string = MOVIE_API_URL + searchUrl + pageUrl;
  (async function (url: string): Promise<void> {
    const response = await fetch(url);
    const JSONResponse = await response.json();
    if (JSONResponse.Response === "True") {
      dispatch({
        type: "fetch-success",
        payload: JSONResponse.Search,
        needReflesh: needReflesh,
      });
    } else {
      dispatch({
        type: "fetch-failure",
        error: JSONResponse.Error,
      });
    }
  })(fullUrl);
};
