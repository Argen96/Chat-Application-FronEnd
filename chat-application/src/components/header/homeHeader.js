import React, { useState } from 'react';
import { useNavigate, Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import './style.css';

function HomeHeader(props) {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState('');

  const onLogout = () => {
    localStorage.removeItem('access_token');
    navigate('/log-in');
  };

  const handleChange = (e) => {
    const newValue = e.target.value;
    setInputValue(newValue);
  };

  async function fetchRandomImage() {
    try {
      const response = await fetch("https://source.unsplash.com/random/300x200");
      if (response.ok) {
        return response.url;
      } else {
        return "";
      }
    } catch (error) {
      console.error("Error occurred while fetching random image:", error);
      return "";
    }
  }
  const handleSearch = async () => {
    const first_name = inputValue.split(' ')[0];
    const last_name = inputValue.split(' ')[1];
    console.log(last_name);
    const token = localStorage.getItem('access_token');
    const headers = {
      authorization: `Bearer ${token}`,
    };
    const response = await fetch(`http://localhost:80/api/search-user/?first_name=${first_name}&last_name=${last_name}`, {
      method: 'GET',
      headers: headers,
    });
    const data = await response.json();
    const resultsWithRandomImages = await Promise.all(data.map(async (result) => ({
      ...result,
      randomImage: await fetchRandomImage(),
    })));

    if (data.length > 0) {
      props.setSearchResults(resultsWithRandomImages);
    }
    if (data.length === 0) {
      props.setNoResults('No search results found.');
      props.setSearchResults([])
    }
  };

  const goToHomePage = () => {
    props.setNoResults('');
    props.setSearchResults([])
  }

  return (
    <header className="custom-header">
      <h1 className="text-center custom-header-text" onClick={(goToHomePage)}>Argen Chat-App</h1>
      <div className="header-controls">
        <div className="header-controls-right">
          <div className="message-icon">
          <Link to="/show-chat"> <FontAwesomeIcon  icon={faEnvelope} /> </Link>
          </div>
          <div className="search-bar-container" onChange={handleChange}>
            <input
              type="text"
              placeholder="Search..."
              className="search-bar"
            />
            <button className="search-button" >
              <FontAwesomeIcon icon={faSearch} onClick={handleSearch} />
            </button>
          </div>
          <button className="logout-button" onClick={onLogout}>
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}

export default HomeHeader;

