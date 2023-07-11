// Navbar component
export const Navbar = ({ children }) => {
  return (
    <nav className="nav-bar">
      {/* Navbar logo */}
      <div className="logo">
        <span role="img">🍿</span>
        <h1>usePopcorn</h1>
      </div>

      {/* --- */}
      {children}
      {/* --- */}
    </nav>
  );
};
