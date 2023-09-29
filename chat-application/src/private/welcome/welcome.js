import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/footer/footer.js";
import HomeHeader from "../../components/header/homeHeader.js";
import './style.css'

function Welcome() {
  const navigate = useNavigate();
  const [welcome, setWelcome] = useState(null);
  const [potentialContacts, setPotentialContacts] = useState([]);

  useEffect(() => {
    async function welcomeHome() {
      const token = localStorage.getItem('access_token');
      const headers = {
        authorization: `Bearer ${token}`,
      };

      try {
        const response = await fetch('http://localhost:80/api/home', {
          method: 'GET',
          headers: headers,
        });
        if (!response.ok) {
          localStorage.removeItem('access_token');
          navigate('/log-in');
        }

        const { original_user, other_users } = await response.json();
        const [user] = original_user;
        const { first_name, last_name } = user;

        const usersWithImages = await Promise.all(
          other_users.map(async (contact) => {
            const randomImage = await fetchRandomImage(); 
            return {
              ...contact,
              randomImage,
            };
          })
        );

        setPotentialContacts(usersWithImages);
        setWelcome(`Hello ${first_name} ${last_name}`);
      } catch (error) {
        console.error('Error occurred while fetching data:', error);
      }
    }

  
    async function fetchRandomImage() {
      try {
        const response = await fetch('https://source.unsplash.com/random/300x200'); 
        if (response.ok) {
          return response.url;
        } else {
          return ''; 
        }
      } catch (error) {
        console.error('Error occurred while fetching random image:', error);
        return ''; 
      }
    }

    welcomeHome();
  }, [navigate]);

  return (
      <div>
      <HomeHeader />
      <div className="welcome-message">{welcome}</div>
      <div className="welcome-container">
      <div className="welcome-content">
        <h1 className="contact-heading">Users</h1>
        <div className="contact-list">
          {potentialContacts.length > 0 ? (
            potentialContacts.map((contact, i) => (
              <div key={i} className="contact-card">
                <img
                  src={contact.randomImage}
                  alt={`Random Image for ${contact.first_name}`}
                  className="contact-image"
                />
                <div className="contact-name">
                  {contact.first_name} {contact.last_name}
                </div>
              </div>
            ))
          ) : (
            <p className="no-contacts-message">No potential contacts found.</p>
          )}
        </div>
      </div>
      </div>
      <Footer />
      </div>
  );
}

export default Welcome;

