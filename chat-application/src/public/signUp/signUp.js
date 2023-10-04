import React, { useState }  from 'react';
import { useNavigate, Link } from 'react-router-dom';
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
        const response = await fetch('http://localhost:80/api/sign-up', {
            method: 'POST', headers: {
                'Content-Type': 'application/json; charset=utf-8 '
            }, body: JSON.stringify(values)
        })
        const data = await response.json();
        if(response.ok) {
             window.alert("Account is created!");
             navigate('/log-in');
        }
        else {
             setError(data.message);
        }
    }

    const onClick = async (event) => {
      event.preventDefault();
      window.open('http://localhost:80/auth/google/callback', '_self');
    };

    
    
return (
  <div> 
   <Header/>
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card custom-card">
            <div className="card-body custom-card-body">
              <h1 className="text-center fw-bold mb-4">Sign up</h1>
              <form id="sign-up" onSubmit={onSubmit}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email *
                  </label>
                  <input
                    className="form-control custom-input"
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Email..."
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
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
                <div className="mb-3">
                  <label htmlFor="first_name" className="form-label">
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
                <div className="mb-3">
                  <label htmlFor="last_name" className="form-label">
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
                {error && <p className="text-danger">{error}</p>}
                <div className="text-center">
                  <button type="submit" className="btn btn-primary custom-button">
                    Create Account
                  </button>
                </div>
                <p className="mt-4 fs-6 text-center">
                  Already a user? <Link to="/log-in">Log in</Link>
                </p>
              </form>
              <button onClick={onClick} type="button" className="btn btn-secondary w-100 mt-3 custom-google-button">
                Sign Up with Google
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  <Footer />
</div>
      );
};

export default SignUp;
