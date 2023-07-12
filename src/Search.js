import React, { useRef, useEffect } from "react";

// Search field in logo
export const Search = ({ query, setQuery }) => {
  const inputRef = useRef(null);

  useEffect(()=> {
    // focus on searchbar when it loads on screen
    inputRef.current.focus();
  }, [])

  return (
    <input
      ref={inputRef}
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
};
