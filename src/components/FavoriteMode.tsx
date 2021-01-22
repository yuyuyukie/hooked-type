/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useContext } from "react";
import { Context } from "../contexts/Context";
import { MovieObject } from "./App";
import Movie from "./Movie";
import MovieContainer from "./MovieContainer";

export const isMovieObject = (obj: any): obj is MovieObject => {
  return (
    typeof obj.Title === "string" &&
    typeof obj.Type === "string" &&
    typeof obj.Poster === "string" &&
    typeof obj.Year === "string" &&
    typeof obj.imdbID === "string"
  );
};

const FavoriteMode: React.FC = (): JSX.Element => {
  // // ログインしてないなら説明＋誘導
  // const currentUser = useContext(AuthContext);
  // // asyncのため更新検知
  // const [loading, setLoading] = useState<boolean>(false);
  // // async の購読解除、アップデート用
  // useEffect(() => {
  //   if (currentUser) {
  //     const favMoviesRef = db
  //       .collection("users")
  //       .doc(currentUser.uid)
  //       .collection("favoriteMovies");
  //     setLoading(true);
  //     favMoviesRef.get().then((snapshot) => {
  //       console.log(snapshot.size);
  //       snapshot.forEach((doc) => {
  //         // 本当はisMovieObjectを使いたいが、コンパイルエラーが発生する
  //         const movie = doc.data() as MovieObject;
  //         props.setFavMovies((movies) => [...movies, movie]);
  //       });
  //       setLoading(false);
  //     });
  //   }
  // }, [currentUser]);

  // if (!currentUser) {
  //   return (
  //     <div className="notLoggedInMessage" style={{ fontSize: "1.5rem" }}>
  //       We need you to "Sign in" to use this functionality.
  //     </div>
  //   );
  // }
  const context = useContext(Context);
  const favoriteMovies = context.state.favoriteMovies;

  const createFavMovieDiv = (movies: MovieObject[]) => {
    movies.forEach((movie) => {
      movie.favorite = true;
    });
    // if (loading) {
    //   return <span>loading...</span>;
    // }
    return movies.map(
      (movie: MovieObject, index: number): JSX.Element => {
        return <Movie key={`${index}-${movie.Title}`} movie={movie} />;
      }
    );
  };
  return (
    <React.Fragment>
      <div className="toolbox" />
      <MovieContainer>{createFavMovieDiv(favoriteMovies)}</MovieContainer>
    </React.Fragment>
  );
};
export default FavoriteMode;
