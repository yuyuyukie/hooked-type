import React, { useContext, useEffect } from "react";
import { Context, Mode } from "../contexts/Context";
import { fetchMovies } from "../services/firebase";
import { search } from "../services/omdb";
import { MovieObject } from "./App";
import FavoriteMode, { isMovieObject } from "./FavoriteMode";
import Movie from "./Movie";
import MovieStyler from "./MovieStyler";
import PageSwitcher from "./PageSwitcher";
import Search from "./Search";

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
      fetchMovies(currentUser.uid)
        .then((snapshot) => {
          const fetchedMovies: MovieObject[] = [];
          snapshot.forEach((doc) => {
            // 本当はisMovieObjectを使いたいが、コンパイルエラーが発生する
            const movie = doc.data();
            if (isMovieObject(movie)) {
              fetchedMovies.push(movie);
            }
            dispatch({
              type: "database-fetch-success",
              payload: fetchedMovies,
            });
          });
        })
        .catch((e) => console.error(e));
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
      {!currentUser && currentMode === Mode.search ? (
        <div style={{ fontSize: "large", border: `1px solid #0f1419` }}>
          To use sequencial searching, please sign in.
        </div>
      ) : (
        ""
      )}
    </>
  );
};
export default MovieHolder;
