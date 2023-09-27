import React from "react";
import {  Link } from "react-router-dom";
import { useState } from "react";
import Footer from "../../components/footer/footer.js";
import Header from "../../components/header/header.js";
import './style.css'

function ForgetPssw () {
    
    const [message,setMessage] = useState(null);
   
    const onSubmit = async (event) => {
       event.preventDefault()
       const form = event.target;
       const formData = new FormData(form);
       const email = formData.get("email");
       const values = { email }
       console.log(values)
       const response = await fetch('http://localhost:80/api/forgot-password', {
        method: 'POST', headers: {
          'Content-Type': 'application/json; charset=utf-8'
        }, body: JSON.stringify(values)
      })
      const data = await response.json();
      if(response.ok) {
        setMessage(data.message)
      }
      else {
        setMessage(data.message);
      }
    };


    return (
 <div>
  <Header />
    <div className="find-account-form">
      <h1>Find your account</h1>
      <p>Please enter your email or mobile number to search for your account.</p>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email..."
            required
            className="form-control custom-input"
          />
        </div>
        <div className="button-group">
          <Link to="/log-in">
            <button type="button" className="btn btn-secondary">
              Cancel
            </button>
          </Link>
          <button type="submit" className="btn btn-primary">
            Search
          </button>
        </div>
      </form>
      <div className="message">{message}</div>
    </div>
  <Footer />
 </div>
  )
}

export default ForgetPssw