import { useEffect, useState } from "react";
import StarRating from "./Components/StarRating";
import { LoadingSpinner } from "./Components/LoadingSpinner";
import { API_KEY } from "./App";

// Display details about a selected mavie
export const MovieDetails = ({ movieId, onBackArrowClick }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [movieDetails, setMovieDetails] = useState([]);

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

  console.log(title, year);

  // send a request to omdb api to get details on a movie
  useEffect(
    function () {
      const fetchData = async () => {
        try {
          setIsLoading(true);

          const response = await fetch(
            `http://www.omdbapi.com/?apikey=${API_KEY}&i=${movieId}`
          );

          const data = await response.json();

          setMovieDetails(data);
          setIsLoading(false);
          console.log(data);
        } catch (error) {
          console.log(error);
        }
      };

      fetchData();
    },
    [movieId]
  );

  const displayMovieDetails = (
    <div className="details">
      <header>
        <button className="btn-back" onClick={onBackArrowClick}>
          &larr;
        </button>
        <img src={poster} alt={"Poster of ${movie} movie"} />
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
        <div className="rating">
          <StarRating maxRating={10} size={24} />
        </div>
        <p>
          <em>{plot}</em>
        </p>
        <p>Starring {actors}</p>
        <p>Directed by (director)</p>
      </section>
    </div>
  );

  return <>{isLoading ? <LoadingSpinner /> : displayMovieDetails}</>;
};
