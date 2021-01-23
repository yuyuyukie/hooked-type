import React, { useContext, useEffect } from "react";
import { Context, Mode } from "../contexts/Context";
import { firebaseApp } from "../firebase";
import { search } from "../services/omdb";
import { MovieObject } from "./App";
import FavoriteMode, { isMovieObject } from "./FavoriteMode";
import Movie from "./Movie";
import MovieStyler from "./MovieStyler";
import PageSwitcher from "./PageSwitcher";
import Search from "./Search";

const db = firebaseApp.firestore();
const MovieHolder: React.FC = () => {
  const { state, dispatch } = useContext(Context);
  const {
    currentMode,
    currentUser,
    showingMovies,
    errorMessage,
    loadingSearch,
    favoriteMovies,
    searchValue,
    pageNumber,
  } = state;
  // SearchMode時にscrollを検知してfetchさせる
  // unmount時にremoveEventListener
  useEffect(() => {
    const scrollToSearch = () => {
      // scrollYは文書の上端を0としてwindowがどれだけ下にスクロールしているか
      // innerHeightがブラウザのビューポートの高さで、それの合計の最大値が
      // 全体の高さ(scrollHeight, clientHeight)と等しい
      if (
        currentMode === Mode.search &&
        !loadingSearch &&
        window.scrollY + window.innerHeight + 1 >= document.body.scrollHeight &&
        searchValue &&
        currentUser
      ) {
        console.log(
          "wheel",
          window.scrollY + window.innerHeight + 1 >= document.body.scrollHeight
        );
        search(dispatch, searchValue, false, pageNumber + 1);
      }
    };
    window.addEventListener("wheel", scrollToSearch);
    return () => window.removeEventListener("wheel", scrollToSearch);
  }, [
    currentMode,
    dispatch,
    loadingSearch,
    pageNumber,
    searchValue,
    currentUser,
  ]);
  // async の購読解除、アップデート用
  useEffect(() => {
    if (currentUser && dispatch) {
      dispatch({ type: "database-fetch-request" });
      const favMoviesRef = db
        .collection("users")
        .doc(currentUser.uid)
        .collection("favoriteMovies");
      favMoviesRef.get().then((snapshot) => {
        const fetchedMovies: MovieObject[] = [];
        snapshot.forEach((doc) => {
          // 本当はisMovieObjectを使いたいが、コンパイルエラーが発生する
          const movie = doc.data();
          if (isMovieObject(movie)) {
            fetchedMovies.push(movie);
          }
          dispatch({ type: "database-fetch-success", payload: fetchedMovies });
        });
      });
    }
  }, [currentUser, dispatch]);
  const showMovies = () => {
    if (errorMessage) {
      return <div className="errorMessage">{errorMessage}</div>;
    }
    const favTitles = favoriteMovies.map((movie) => {
      return movie.imdbID;
    });
    const moviesWithFav = showingMovies.map((movie) => {
      if (favTitles.includes(movie.imdbID)) {
        movie.favorite = true;
      } else {
        movie.favorite = false;
      }
      return movie;
    });
    return moviesWithFav.map(
      (movie: MovieObject, index: number): JSX.Element => {
        return <Movie key={`${index}-${movie.Title}`} movie={movie} />;
      }
    );
  };
  return (
    <>
      <PageSwitcher showIndex={currentMode === "search" ? 0 : 1}>
        <Search />
        <FavoriteMode />
      </PageSwitcher>
      <MovieStyler>{showMovies()}</MovieStyler>
    </>
  );
};
export default MovieHolder;
