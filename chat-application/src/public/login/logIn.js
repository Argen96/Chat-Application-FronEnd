import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Header from "../../components/header/header.js";
import Footer from "../../components/footer/footer.js";
import './style.css'

function LogIn(){
 
 const [error,setError] = useState(null);
  const navigate = useNavigate()
  
  const onSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const email = formData.get("email");
    const password = formData.get("password");
    const values = { email, password };
    
    const response = await fetch('http://localhost:80/api/log-in', {
      method: 'POST', headers: {
        'Content-Type': 'application/json; charset=utf-8'
      }, body: JSON.stringify(values)
    })
    const data = await response.json();
    if(response.ok) {
      data.token && localStorage.setItem('access_token', data.token)
      navigate('/welcome')
    }
    else {
      setError(data.message);
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
              <h1 className="text-center fw-bold">Login</h1>
              <form id="login" onSubmit={ onSubmit }>
                <div className="custom-input-group">
                  <label htmlFor="email" className="custom-label">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Email..."
                    required
                    className="form-control custom-input"
                  />
                </div>
                <div className="custom-input-group">
                  <label htmlFor="password" className="custom-label">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Password..."
                    required
                    className="form-control custom-input"
                  />
                </div>
                {error ? (
                  <p className="mt-4 custom-error">{error}</p>
                ) : null}
                <div className="text-center">
                  <button
                    type="submit"
                    name="submit"
                    className="btn btn-dark custom-button"
                  >
                    Enter
                  </button>
                </div>
                <p className="mt-4 fs-6 text-center">
                  You're not a user yet? <Link to="/">Sign up</Link>
                </p>
              </form>
              <Link to="/forgot-password">
             <button 
             className="l"> 
             Forget Password
            </button> 
            </Link> 
            </div>
          </div>
        </div>
      </div>
    </div>
  <Footer />
 </div>
  );
}

export default LogIn;