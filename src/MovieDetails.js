import { useEffect, useState } from "react";
import StarRating from "./Components/StarRating";
import { LoadingSpinner } from "./Components/LoadingSpinner";
// import { API_KEY } from "./App";

const API_KEY = process.env.REACT_APP_API_KEY;

// Display details about a selected mavie
export const MovieDetails = ({
  movieId,
  onCloseMovie,
  setWatched,
  watched,
  onAddToWatchedList,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [movieDetails, setMovieDetails] = useState([]);
  const [userRating, setUserRating] = useState(null);
  const [movieHasRating, setMovieHasRating] = useState(null);
  // const [watchedMovies, setWatchedMovies] = useState(tempMovieData);

  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movieDetails;

  // send a request to omdb api to get details on a movie
  useEffect(
    function () {
      const fetchData = async () => {
        try {
          setIsLoading(true);

          const response = await fetch(
            `https://www.omdbapi.com/?apikey=${API_KEY}&i=${movieId}`
          );

          const data = await response.json();

          setMovieDetails(data);
          setIsLoading(false);
        } catch (error) {
          console.log(error);
        }
      };

      fetchData();
    },
    [movieId]
  );

  // handle add to watchlist btn
  const handleAddToWatchList = (movieId) => {
    const newWatchedMovie = {
      imdbID: movieId,
      title,
      year,
      poster,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime.split(" ").at(0)),
      userRating,
    };

    // setWatched((prevWatchedMovies) => [...prevWatchedMovies, newWatchedMovie]);

    onAddToWatchedList(newWatchedMovie); // Add the movie to the watched list

    // Save the updated watchlist to localStorage

    // go to summary view
    onCloseMovie();
  };

  // check if the movie already has a rating from the array of movies
  useEffect(() => {
    // Find the movie object with the given ID
    const movie = watched.find((movie) => movie.imdbID === movieId);
    if (movie) {
      // The movie with the ID exists
      setMovieHasRating(movie.userRating);
    } else {
      // The movie with the ID doesn't exist
      setMovieHasRating(null);
    }
  }, [watched, movieId]);

  // change the title of the document to the current movie
  useEffect(() => {
    document.title = title;

    return () => {
      document.title = "Popcorn Film";
    };
  }, [title]);

  const displayMovieDetails = (
    <div className="details">
      <header>
        <button className="btn-back" onClick={onCloseMovie}>
          &larr;
        </button>
        <img src={poster} alt={`Poster of ${title} movie`} />
        <div className="details-overview">
          <h2>{title}</h2>
          <p>
            {released} &bull; {runtime}
          </p>
          <p>{genre}</p>
          <p>
            <span>⭐</span>
            {imdbRating} IMDb rating
          </p>
        </div>
      </header>
      <section>
        {movieHasRating ? (
          <div className="rating">
            <StarRating maxRating={10} size={24} userRating={movieHasRating} />
          </div>
        ) : (
          <div className="rating">
            <StarRating maxRating={10} size={24} onSetRating={setUserRating} />
          </div>
        )}
        {userRating && (
          <button
            className="btn-add"
            onClick={() => handleAddToWatchList(movieId)}
          >
            + Add to watched list
          </button>
        )}
        <p>
          <em>{plot}</em>
        </p>
        <p>Starring {actors}</p>
        <p>Directed by {director}</p>
      </section>
    </div>
  );

  return <>{isLoading ? <LoadingSpinner /> : displayMovieDetails}</>;
};
