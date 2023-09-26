import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import Header from "../../components/header/header.js";
import Footer from "../../components/footer/footer.js";
import './style.css'

function SignUp(){
    const [error,setError] = useState(null);
    const navigate = useNavigate()
    const onSubmit = async (event) => {
        event.preventDefault();
        const form = event.target;
        const formData = new FormData(form);
        const email = formData.get("email");
        const password_hash = formData.get("password");
        const first_name = formData.get("first_name");
        const last_name = formData.get("last_name");
        const values = { email, password_hash, first_name, last_name };
        console.log(values)
        const response = await fetch('http://localhost:80/api/sign-up', {
            method: 'POST', headers: {
                'Content-Type': 'application/json; charset=utf-8 '
            }, body: JSON.stringify(values)
        })
        const data = await response.json();
        if(response.ok) {
             window.alert("Account is created!");
             navigate('./log-in');
        }
        else {
             setError(data.message);
        }
    }

    const onClick = async (event) => {
        event.preventDefault();
      
        try {
          const response = await fetch('http://localhost:80/auth/google-initiate', {
            method: 'GET',
            credentials: 'include', 
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
          });
          if (response.ok) {
            const data = await response.json();
            console.log(data.url);
            window.location.href = data.url;
          } else {
            const errorData = await response.json();
            setError(errorData.message || 'An error occurred');
          }
        } catch (error) {
          console.error('An error occurred:', error);
          setError('An error occurred');
        }
      };
      
      

    return (
     <div> 
      <Header/>
        <div className="container mt-5">
          <div className="row justify-content-center">
            <div className="col-md-6">
              <div className="custom-card">
                <div className="custom-card-body">
                  <h1 className="text-center fw-bold">Sign up</h1>
                  <form id="sign-up" onSubmit={onSubmit}>
                    <div className="custom-input-group">
                      <label htmlFor="email" className="custom-label">
                        Email *
                      </label>
                      <input
                        className="form-control custom-input"
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Email..."
                        minLength="5"
                        maxLength="20"
                        required
                      />
                    </div>
                    <div className="custom-input-group">
                      <label htmlFor="password" className="custom-label">
                        Password
                      </label>
                      <input
                        className="form-control custom-input"
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Password..."
                      />
                    </div>
                    <div className="custom-input-group">
                      <label htmlFor="first_name" className="custom-label">
                        First Name
                      </label>
                      <input
                        className="form-control custom-input"
                        type="text"
                        id="first_name"
                        name="first_name"
                        placeholder="First Name..."
                      />
                    </div>
                    <div className="custom-input-group">
                      <label htmlFor="last_name" className="custom-label">
                        Last Name
                      </label>
                      <input
                        className="form-control custom-input"
                        type="text"
                        id="last_name"
                        name="last_name"
                        placeholder="Last Name..."
                      />
                    </div>
                    {error ? <p className="text-danger">{error}</p> : null}
                    <div className="text-center">
                      <button type="submit" className="btn btn-primary custom-button">
                        Create Account
                      </button>
                    </div>
                    <p className="mt-4 fs-6 text-center">
                      Already a user? <Link to="/">Log in</Link>
                    </p>
                  </form>
                  <button onClick={onClick}
                    type="submit"
                    name="submit"
                    className="l"
                  >
                    Sign Up with Google
                 </button>
                </div>
              </div>
            </div>
          </div>
        </div>
       < Footer />
      </div>
      );
};

export default SignUp;
