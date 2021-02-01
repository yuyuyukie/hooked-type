import React, { useContext, useEffect } from "react";
import { Context, Mode } from "../contexts/Context";
import { fetchMovies } from "../services/firebase";
import { omdbFetch } from "../services/omdb";
import { MovieObject } from "./App";
import FavoriteMode, { isMovieObject } from "./FavoriteMode";
import Movie from "./Movie";
import MovieStyler from "./MovieStyler";
import PageSwitcher from "./PageSwitcher";
import Search from "./Search";
import { isBrowser } from "react-device-detect";
import { isMobile } from "react-device-detect";

const isBottom = () => {
  return window.scrollY + window.innerHeight + 1 >= document.body.scrollHeight;
};

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

  // スマホのスクロール用
  useEffect(() => {
    let moveDistance = 0;
    let isSwiping = false;
    const detectTouch = (e: TouchEvent) => {
      if (e.targetTouches.length === 1) {
        isSwiping = true;
      }
    };
    const handleMove = () => {
      if (isSwiping) {
        moveDistance++;
      }
    };
    const checkScroll = () => {
      if (
        moveDistance > 10 &&
        isBottom() &&
        searchValue &&
        !loadingSearch &&
        currentMode === Mode.search
      ) {
        omdbFetch(dispatch, searchValue, false, pageNumber);
      }
      moveDistance = 0;
      isSwiping = false;
    };
    document
      .getElementById("movie-container")
      ?.addEventListener("touchmove", handleMove);
    document
      .getElementById("movie-container")
      ?.addEventListener("touchstart", detectTouch);
    document
      .getElementById("movie-container")
      ?.addEventListener("touchend", checkScroll);
    return () => {
      document
        .getElementById("movie-container")
        ?.removeEventListener("touchmove", handleMove);
      document
        .getElementById("movie-container")
        ?.addEventListener("touchstart", detectTouch);
      document
        .getElementById("movie-container")
        ?.addEventListener("touchend", checkScroll);
    };
  }, [currentMode, dispatch, loadingSearch, pageNumber, searchValue]);

  // SearchMode時にscrollを検知してfetchさせる
  // unmount時にremoveEventListener
  useEffect(() => {
    const scrollToSearch = () => {
      // scrollYは文書の上端を0としてwindowがどれだけ下にスクロールしているか
      // innerHeightがブラウザのビューポートの高さで、それの合計の最大値が
      // 全体の高さ(scrollHeight, clientHeight)と等しい
      if (
        isBrowser &&
        currentMode === Mode.search &&
        !loadingSearch &&
        isBottom() &&
        searchValue
      ) {
        omdbFetch(dispatch, searchValue, false, pageNumber);
      }
    };
    window.addEventListener("wheel", scrollToSearch);

    return () => {
      window.removeEventListener("wheel", scrollToSearch);
    };
  }, [currentMode, dispatch, loadingSearch, pageNumber, searchValue]);
  // initial search
  useEffect(() => {
    omdbFetch(dispatch, "man", true);
  }, [dispatch]);
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
      {isMobile ? (
        <button
          type="button"
          id="more-button"
          onClick={() => {
            omdbFetch(dispatch, searchValue, false, pageNumber);
          }}
        >
          Scroll-Down or Push Here
        </button>
      ) : (
        ""
      )}
    </>
  );
};
export default MovieHolder;
