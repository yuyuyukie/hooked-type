import React, { useContext } from "react";
import { Context } from "../contexts/Context";
import Search from "./Search";

// type State = {
//   loadingSearch: boolean;
//   movies: MovieObject[];
//   errorMessage: null | string;
// };
// const initialState: State = {
//   loadingSearch: true,
//   movies: [],
//   errorMessage: null,
// };
// export type ACTIONTYPE =
//   | { type: "SEARCH_MOVIES_REQUEST" }
//   | { type: "SEARCH_MOVIES_SUCCESS"; payload: MovieObject[] }
//   | { type: "SEARCH_MOVIES_FAILURE"; error: string };
// const reducer: React.Reducer<State, ACTIONTYPE> = (
//   state: State,
//   action: ACTIONTYPE
// ): State => {
//   switch (action.type) {
//     case "SEARCH_MOVIES_REQUEST":
//       return {
//         ...state,
//         loadingSearch: true,
//         errorMessage: null,
//       };
//     case "SEARCH_MOVIES_SUCCESS":
//       return {
//         ...state,
//         loadingSearch: false,
//         movies: action.payload,
//       };
//     case "SEARCH_MOVIES_FAILURE":
//       return {
//         ...state,
//         loadingSearch: false,
//         errorMessage: action.error,
//       };
//     default:
//       throw new Error();
//   }
// };

const SearchMode: React.FC = () => {
  // const [state, dispatch] = useReducer(reducer, initialState);
  // console.log(props.favMovies);
  const { dispatch } = useContext(Context);

  return (
    <div className="mainContainer">
      {dispatch ? <Search dispatch={dispatch} /> : <Search />}
    </div>
  );
};
export default SearchMode;
