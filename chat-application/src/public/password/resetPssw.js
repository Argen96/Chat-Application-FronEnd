import React from 'react';
import Header from '../../components/header/header.js';
import { useState } from "react";
import { useEffect } from 'react';
import Footer from '../../components/footer/footer.js';
import './style.css'

function ResetPasswordPage() {
    const [error, setError] = useState(null);
    const [codeUrl, setCodeUrl] = useState(null)
    const [message, setMessage] = useState(null)
    useEffect(() => {

        const urlSearchParams = new URLSearchParams(window.location.search);
        const code = urlSearchParams.get('code');
        setCodeUrl(code)
    }, []);

    const onSubmit = async (event) => {
        event.preventDefault()
        const form = event.target;
        console.log(codeUrl)
        const formData = new FormData(form);
        const password = formData.get("password");
        const confirmPassword = formData.get("confirmPassword");
        if (password !== confirmPassword) {
            setMessage(null)
            setError('Passwords do not match')
        }
        else{
         setError (null)
         const values = { password };
         const response = await fetch(`http://localhost:80/api/reset-password/?code=${codeUrl}`, {
            method: 'POST', headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }, body: JSON.stringify(values)
        })
        const data = await response.json();
        if (response.ok) {
            setMessage(data.message)
        }
        else {
            setMessage(data.message);
        }
    }
    };

    return (
   <div>
    < Header />
     <div className="password-reset-form">
      <h1>Password Reset</h1>
       <p>Please reset your password by filling out the form below:</p>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="password" className="form-label">
            New Password:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword" className="form-label">
            Confirm New Password:
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            className="form-control"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Reset Password
        </button>
        <div className="message">
          <span className="success">{message}</span>
          <span className="error">{error}</span>
        </div>
      </form>
    </div>
          <Footer />
        </div>
    );
}

export default ResetPasswordPage;
