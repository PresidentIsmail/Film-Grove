import { useState } from "react";
import "./index.css";
import "./Components/LoadingComponent.css";
import ErrorComponent from "./Components/ErrorComponent";
import { LoadingSpinner } from "./Components/LoadingSpinner";
import { InitialMessage } from "./InitialMessage";
import { Navbar } from "./Navbar";
import { Search } from "./Search";
import { ResultsDisplay } from "./ResultsDisplay";
import { Main } from "./Main";
import { BoxDisplay } from "./BoxDisplay";
import { MovieList } from "./MovieList";
import { MovieDetails } from "./MovieDetails";
import { WatchedSummary, WatchedMoviesList } from "./WatchedSummary";
// Custom Hooks
import { useMovieSearch } from "./CustomHooks/useMovieSearch";
import { useWatchedList } from "./CustomHooks/useWatchedList";

export const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

// OMDb Api key
export const API_KEY = "1f96915c";

export default function App() {
  const { watched, handleAddToWatchedList, handleRemoveFromWatchedList } =
    useWatchedList();
  const [query, setQuery] = useState("");
  const { movies, isLoading, error } = useMovieSearch(query);
  const [movieId, setMovieId] = useState(null);

  // function that sets the movieId when movie is cliked
  const handleSelectedMovie = (movieId) => {
    setMovieId((prevMovieId) => (prevMovieId === movieId ? null : movieId));
  };

  // when back arrow is clicked clear movieId
  const handleCloseMovie = () => {
    setMovieId(null);
  };

  return (
    <>
      <Navbar>
        <Search query={query} setQuery={setQuery} />
        <ResultsDisplay movies={movies} />
      </Navbar>

      <Main>
        <BoxDisplay>
          {query.length === 0 ? ( // Conditionally render InitialMessage if query is empty
            <InitialMessage />
          ) : error ? (
            <ErrorComponent errorMessage={error} />
          ) : isLoading ? (
            <LoadingSpinner />
          ) : (
            <MovieList movies={movies} onSelectMovie={handleSelectedMovie} />
          )}
        </BoxDisplay>

        <BoxDisplay>
          {movieId ? (
            <MovieDetails
              movieId={movieId}
              onCloseMovie={handleCloseMovie}
              watched={watched}
              onAddToWatchedList={handleAddToWatchedList}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMoviesList
                watched={watched}
                onRemoveWatched={handleRemoveFromWatchedList}
              />
            </>
          )}
        </BoxDisplay>
      </Main>
    </>
  );
}
