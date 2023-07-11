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

const average = (arr) =>
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
        console.log(data.Search);
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
  const handleBackArrowClick = () => {
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
              onBackArrowClick={handleBackArrowClick}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMoviesList watched={watched} />
            </>
          )}
        </BoxDisplay>
      </Main>
    </>
  );
}

// Summary of watched movies
const WatchedSummary = ({ watched }) => {
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));
  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime} min</span>
        </p>
      </div>
    </div>
  );
};

// Already watched movies in the display
const WatchedMoviesList = ({ watched }) => {
  return (
    <ul className="list">
      {watched.map((movie, index) => (
        <WatchedMovie key={index} movie={movie} />
      ))}
    </ul>
  );
};

// Already watched movie in a list
const WatchedMovie = ({ movie }) => {
  return (
    <li key={movie.imdbID}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.runtime} min</span>
        </p>
      </div>
    </li>
  );
};

// ===================================
