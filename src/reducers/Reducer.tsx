import { State, Mode } from "../contexts/Context";
import { ACTIONTYPE } from "../actions/ActionCreator";

export const Reducer: React.Reducer<State, ACTIONTYPE> = (state, action) => {
  console.log(action.type);
  switch (action.type) {
    case "modal-switch":
      return {
        ...state,
        modalMode: action.mode,
        authMessage: action.authMessage,
      };
    case "mode-switch":
      const switchShowingMovies = () => {
        switch (action.mode) {
          case Mode.search:
            return state.fetchedMovies;
          case Mode.favorite:
            return state.favoriteMovies;
          default:
            return [];
        }
      };
      return {
        ...state,
        currentMode: action.mode,
        showingMovies: switchShowingMovies(),
      };
    case "fetch-request":
      return {
        ...state,
        loadingSearch: true,
        errorMessage: null,
        searchValue: action.value,
        pageNumber: action.page,
      };
    case "fetch-success":
      const movies = (() => {
        if (action.needReplaced) {
          return action.payload;
        }
        return state.fetchedMovies.concat(...action.payload);
      })();
      return {
        ...state,
        loadingSearch: false,
        fetchedMovies: movies,
        showingMovies:
          state.currentMode === Mode.search ? movies : state.showingMovies,
      };
    case "fetch-failure":
      return {
        ...state,
        loadingSearch: false,
        errorMessage: action.error,
      };
    case "fetch-detail-request":
      return {
        ...state,
        loadingSearch: true,
        errorMessage: null,
      };
    case "fetch-detail-success":
      return {
        ...state,
        loadingSearch: false,
        detailMovie: action.payload,
      };
    case "auth-state-changed":
      return {
        ...state,
        currentUser: action.data ? action.data : null,
        favoriteMovies: action.data ? state.favoriteMovies : [],
        currentMode: Mode.search,
      };
    case "auth-state-failure":
      return {
        ...state,
        errorMessage: action.error,
      };
    case "database-fetch-request":
    case "database-add-request":
    case "database-delete-request":
      return {
        ...state,
        loadingDatabase: true,
      };
    case "database-fetch-success":
      return {
        ...state,
        favoriteMovies: action.payload,
        loadingDatabase: false,
      };
    case "database-delete-success":
      const targetIndex = state.favoriteMovies.indexOf(action.target);
      const newFavMovies = state.favoriteMovies.slice();
      newFavMovies.splice(targetIndex, 1);
      return {
        ...state,
        favoriteMovies: [...newFavMovies],
        showingMovies:
          state.currentMode === Mode.favorite
            ? [...newFavMovies]
            : state.showingMovies,
        loadingDatabase: false,
      };
    case "database-add-success":
      return {
        ...state,
        favoriteMovies: [...state.favoriteMovies, action.target],
        loadingDatabase: false,
      };
    case "change-searchvalue":
      return {
        ...state,
        searchValue: action.payload,
      };
    default:
      return state;
  }
};
