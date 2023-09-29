import React from 'react';
import './style.css';
import { useNavigate } from "react-router-dom";

function HomeHeader() {
const navigate = useNavigate();
  const handleSearch = () => {
    
  };
  
  const onLogout = () => {
    localStorage.removeItem('access_token');
    navigate('/log-in');
  };

  return (
    <header className="custom-header">
      <h1 className="text-center custom-header-text">Argen Chat-App</h1>
      <div className="header-controls">
        <input
          type="text"
          placeholder="Search..."
          className="search-bar"
        />
        <button className="search-button" onClick={handleSearch}>
          Search
        </button>
        <button className="logout-button" onClick={onLogout}>
          Logout
        </button>
      </div>
    </header>
  );
}

export default HomeHeader;

