import { ACTIONTYPE } from "../actions/ActionCreator";

const searchHistory: string[] = [];
const MOVIE_API_URL = "https://www.omdbapi.com/?apikey=1105ff36&";

export const omdbFetch = (
  dispatch: React.Dispatch<ACTIONTYPE> | null,
  searchValue: string,
  needReplaced: boolean,
  pageNumber = 1
) => {
  if (!dispatch) {
    return;
  }
  // スクロールサーチ以外での同一キーワードによる検索の回避
  if (needReplaced && searchValue === searchHistory[searchHistory.length - 1]) {
    return;
  }
  const newPageNumber = needReplaced ? 1 : pageNumber + 1;
  dispatch({
    type: "fetch-request",
    value: searchValue,
    page: newPageNumber,
  });
  searchHistory.push(searchValue);

  const searchUrl = `s=${searchValue}&`;
  const pageUrl = `page=${newPageNumber}&`;
  const fullUrl: string = MOVIE_API_URL + searchUrl + pageUrl;
  (async function (url: string): Promise<void> {
    const response = await fetch(url);
    const JSONResponse = await response.json();
    if (JSONResponse.Response === "True") {
      dispatch({
        type: "fetch-success",
        payload: JSONResponse.Search,
        needReplaced: needReplaced,
      });
    } else {
      dispatch({
        type: "fetch-failure",
        error: JSONResponse.Error,
      });
    }
  })(fullUrl);
};
