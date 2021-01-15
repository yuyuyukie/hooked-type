import { useState } from "react";
import { Mode, MovieObject } from "./App";
import FavoriteMode from "./FavoriteMode";
import SearchMode from "./SearchMode";

type Props = {
  mode: Mode;
};
const Main: React.FC<Props> = (props) => {
  // const [searchMovies, setSearchMovies] = useState<MovieObject[]>([]);
  // const [favoriteMovies, setFavoriteMovies] = useState<MovieObject[]>([]);

  return (
    <>
      <SearchMode isVisible={props.mode === Mode.Search} />
      <FavoriteMode isVisible={props.mode === Mode.Favorite} />
    </>
  );
};
export default Main;
