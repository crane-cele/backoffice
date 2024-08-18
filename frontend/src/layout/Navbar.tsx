import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectAuth } from '../redux/reducers/authReducer';
import { logout } from '../redux/actions/authActions'

const Navbar: React.FC = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector(selectAuth);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="/">
        BackOffice
      </Link>
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav ml-auto">
          {isAuthenticated ? (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/dashboard">Dashboard</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/messages">Messages</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/segments">Segments</Link>
              </li>
              <li className="nav-item">
                <button className="btn btn-link nav-link" onClick={handleLogout}>Logout</button>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/">Login</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/register">Register</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;