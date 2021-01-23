import React, { useContext, useEffect } from "react";
import { Context, Mode } from "../contexts/Context";
import { firebaseApp } from "../firebase";
import { MovieObject } from "./App";
import FavoriteMode, { isMovieObject } from "./FavoriteMode";
import Movie from "./Movie";
import MovieStyler from "./MovieStyler";
import PageSwitcher from "./PageSwitcher";
import Search from "./Search";

const db = firebaseApp.firestore();
const MovieHolder: React.FC = () => {
  const context = useContext(Context);
  const {
    currentMode,
    currentUser,
    showingMovies,
    errorMessage,
    loadingSearch,
    favoriteMovies,
  } = context.state;
  const dispatch = context.dispatch;
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
  }, [currentUser]);
  const showMovies = () => {
    if (errorMessage) {
      return <div className="errorMessage">{errorMessage}</div>;
    }
    if (loadingSearch && currentMode === Mode.search) {
      return <span>loading...</span>;
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
