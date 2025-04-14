import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaSearch, FaHome, FaShoppingCart } from 'react-icons/fa';
import { useSearch } from './SearchContext';
import './Navbar.css';

const Navbar = ({ isLoggedIn, setIsLoggedIn, cartCount }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const { searchTerm, setSearchTerm } = useSearch();
  const navigate = useNavigate();
  const username = localStorage.getItem('username');

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('username');
    setIsLoggedIn(false);
    alert('Successfully logged out!');
    navigate('/login', { replace: true });
  };

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    navigate('/home');
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    navigate('/home');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Left Section */}
        <div className="nav-left">
          <div 
            className="user-profile"
            onMouseEnter={() => setShowDropdown(true)}
            onMouseLeave={() => setShowDropdown(false)}
          >
            <div className="user-info">
              <FaUser className="user-icon" />
              {username && <span className="username">Hello, {username}!</span>}
            </div>
            {showDropdown && (
              <div className="dropdown-menu">
                <Link to="/profile" className="dropdown-link">User Profile</Link>
                <Link to="/orders" className="dropdown-link">Orders</Link>
                <Link to="/wishlist" className="dropdown-link">Wishlist</Link>
                {isLoggedIn ? (
                  <button 
                    onClick={handleLogout} 
                    className="dropdown-link logout-button"
                  >
                    Logout
                  </button>
                ) : (
                  <Link to="/login" className="dropdown-link">Login</Link>
                )}
              </div>
            )}
          </div>
          <Link to="/home" className="brand-link">
            <h1 className="brand-name">E-Shop</h1>
          </Link>
        </div>

        {/* Middle Section */}
        <form onSubmit={handleSearchSubmit} className="search-container">
          <input
            type="text"
            placeholder="Search products, brands and more..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="search-input"
          />
          <button type="submit" className="search-button">
            <FaSearch />
          </button>
        </form>

        {/* Right Section */}
        <div className="nav-right">
          <Link to="/home" className="nav-link">
            <FaHome />
            <span>Home</span>
          </Link>
          <Link to="/cart" className="nav-link">
            <FaShoppingCart />
            <span>Cart ({cartCount})</span>
          </Link>
          <Link to="/about" className="nav-link">
            <span>About Us</span>
          </Link>
          <Link to="/contact" className="nav-link">
            <span>Contact</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;