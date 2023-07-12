import { useState, useEffect } from "react";
import { useLocalStorage } from "./useLocalStorage";

export const useWatchedList = () => {
  const [watched, setWatched] = useLocalStorage("watchedMovies", []);

  const handleAddToWatchedList = (newWatchedMovie) => {
    setWatched((prevWatchedMovies) => {
      const updatedWatchedMovies = [...prevWatchedMovies, newWatchedMovie];
      return updatedWatchedMovies;
    });
  };

  const handleRemoveFromWatchedList = (movieId) => {
    setWatched((prevWatchedMovies) =>
      prevWatchedMovies.filter((movie) => movie.imdbID !== movieId)
    );
  };

  return { watched, handleAddToWatchedList, handleRemoveFromWatchedList };
};
