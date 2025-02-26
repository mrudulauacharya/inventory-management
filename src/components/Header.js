import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

function Header({ title }) {
  const isAuthenticated = useSelector((state) => state.isAuthenticated);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };

  return (
    <nav className="navbar navbar-dark bg-dark py-2">
      <div className="container d-flex justify-content-center">
        <Link to="/" className="navbar-brand title-center w-100 mb-0">{title}</Link>
        <div>
          {isAuthenticated ? (
            <>
              <button onClick={handleLogout} className="btn btn-danger me-2">Logout</button>
            </>
          ) : (
            <Link to="/login" className="btn btn-primary">Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Header;
