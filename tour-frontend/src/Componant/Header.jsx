import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';

const Navbar = ({user, setUser}) => {
  const [input, setInput] = useState(""); // State to store the input value for search
  const navigate = useNavigate(); // Hook to navigate to different routes

  // Function to handle search form submission
  const onsearch = (e) => {
    e.preventDefault(); // Prevents the default form submission behavior
    navigate(`/getuser/${input}`); // Navigate to the search results page with the input value
    setInput(""); // Reset the search input field
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        {/* Left: Logo */}
        <a className="navbar-brand" href="#">
          <img
            src="https://via.placeholder.com/50" // Placeholder logo image
            alt="Logo"
            width="50"
            height="50"
            className="d-inline-block align-text-top"
          />
        </a>

        {/* Center: Search Field */}
        <form className="d-flex mx-auto" style={{ flexGrow: 1, maxWidth: '500px' }}>
          <input
            className="form-control"
            type="search"
            value={input} // The current value of the search input
            placeholder="Search"
            aria-label="Search"
            onChange={(e) => setInput(e.target.value)} // Update the input value on change
          />
          {/* Search Button */}
          <button onClick={onsearch} className="btn btn-outline-secondary">
            <FaSearch /> {/* Search icon from react-icons */}
          </button>
        </form>

        {/* Right: Buttons */}
        <div>
          {/* Create Tour Button */}
          <Link to="/create">
            <button className="btn btn-primary me-2">Create Tours</button>
          </Link>
          
          {/* Logout Button */}
          <Link>
            <button className="btn btn-danger" onClick={() => setUser(null)}>Logout</button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
