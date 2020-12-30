import React, { useState, useEffect } from "react";
import "../App.css";
import { Header } from "./Header";
import { Search } from "./Search";
import { Movie } from "./Movie";
// needs to fix "any"
export interface MovieObject {
  Title: any;
  Poster: any;
  Year: any;
  imdbID: any;
}
export type Props = {
  search: (searchValue: string) => void;
};

const MOVIE_API_URL = "https://www.omdbapi.com/?apikey=1105ff36&";

export const App: React.FunctionComponent = () => {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState<MovieObject[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [searchValue, setSearchValue] = useState("");

  const search = (searchValue: string) => {
    setLoading(true);
    setErrorMessage(null);
    const searchUrl: string | null = searchValue ? `s=${searchValue}&` : "";
    const fullUrl: string = MOVIE_API_URL + searchUrl;
    console.log(fullUrl);
    fetch(fullUrl)
      .then((response) => response.json())
      .then((jsonResponse) => {
        if (jsonResponse.Response === "True") {
          setMovies(jsonResponse.Search);
          setLoading(false);
          console.log(jsonResponse);
        } else {
          setErrorMessage(jsonResponse.Error);
          setLoading(false);
        }
      });
  };
  // initialization
  useEffect(() => {
    search("man");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const createMoviesDivs = () => {
    if (errorMessage) {
      return <div className="errorMessage">{errorMessage}</div>;
    } else if (loading) {
      return <span>loading...</span>;
    }
    if (movies != null) {
      return movies.map(
        (movie: MovieObject, index: number, movies): JSX.Element => {
          return <Movie key={`${index}-${movie.Title}`} movie={movie} />;
        }
      );
    }
  };
  console.log(createMoviesDivs());
  return (
    <div className="App">
      <Header text="HookedType" />
      <Search search={search} />
      <p className="App-intro">Sharing a few of our favorite movies</p>
      <div className="movies">{createMoviesDivs()}</div>
    </div>
  );
};
