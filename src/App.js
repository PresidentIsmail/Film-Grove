import { useEffect, useState } from "react";
import { tempMovieData, tempWatchedData } from "./MovieData";
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

export const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

// OMDb Api key
export const API_KEY = "1f96915c";

export default function App() {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");
  const [watched, setWatched] = useState([]);
  const [movieId, setMovieId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // fetches data when query changes
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch movies. Please try again later.");
        }
        const data = await response.json();
        if (data.Response === "False") {
          throw new Error(data.Error);
        }
        setMovies(data.Search);
        setIsLoading(false);
      } catch (error) {
        setError(error.message);

        // Clearing previous movie data in case of error
        setMovies([]);

        setIsLoading(false); // Set isLoading to false even on error
      }
    };

    if (query.length > 2) {
      setIsLoading(true); // Reset isLoading to true when query changes
      setError(null); // Reset or clear error state before fetching new data
      fetchData();
    }
  }, [query]);

  // Add another useEffect for clearing errors when query changes back to an empty string or below length requirement (e.g., less than or equals to 2)
  useEffect(() => {
    if (!query || query.length <= 2) {
      setError(null);
    }
  }, [query]);

  // function that sets the movieId when movie is cliked
  const handleSelectedMovie = (movieId) => {
    setMovieId((prevMovieId) => (prevMovieId === movieId ? null : movieId));
  };

  // when back arrow is clicked clear movieId
  const handleCloseMovie = () => {
    setMovieId(null);
  };


  // funtion that removes a watched movie
  const handleRemoveWatched = (movieId) => {
    setWatched((currentWatched) =>
      currentWatched.filter((movie) => movie.imdbID !== movieId)
    );
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
              setWatched={setWatched}
              watched={watched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMoviesList watched={watched} onRemoveWatched={handleRemoveWatched} />
            </>
          )}
        </BoxDisplay>
      </Main>
    </>
  );
}
