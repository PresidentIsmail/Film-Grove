import { useState, useEffect } from "react";


export const useMovieSearch = (query) => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await fetch(
          `https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`
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
        setIsLoading(false);
        setMovies([]);
      }
    };

    if (query.length > 2) {
      fetchData();
    }
  }, [query]);

  return { movies, isLoading, error };
};
