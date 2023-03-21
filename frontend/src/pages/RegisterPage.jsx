import '../styles/RegisterLogin.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/navbar/Navbar';

export default function Register() {
  let navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    username: '',
    email: '',
    password: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }));
  };

  const registerUser = (event) => {
    event.preventDefault();
    fetch('http://localhost:8080/authentication/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.status);
        }
        navigate('/login');
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <Navbar />
      <div className="login-root">
        <div style={{ flexGrow: 1 }}>
          <div style={{ flexGrow: 1, zIndex: 9 }}>
            <div className="title-div">
              <span className="swap-nest-title-register-login">SwapNest</span>
            </div>
            <div className="formbg-outer">
              <div className="formbg">
                <div className="formbg-inner side">
                  <span className="low span-login">Register</span>
                  <form id="stripe-login">
                    <div className="field more">
                      <label className="label" htmlFor="username">
                        Username
                      </label>
                      <input
                        name="username"
                        value={credentials.username}
                        onChange={handleChange}
                        type="text"
                        required
                      />
                    </div>

                    <div className="field more">
                      <div className="grid--50-50">
                        <label className="label" htmlFor="password">
                          Password
                        </label>
                      </div>

                      <input
                        name="password"
                        value={credentials.password}
                        onChange={handleChange}
                        type="password"
                        required
                      />
                    </div>
                    <div className="field more less">
                      <label className="label" htmlFor="email">
                        Email
                      </label>
                      <input
                        name="email"
                        value={credentials.email}
                        onChange={handleChange}
                        type="email"
                        required
                      />
                    </div>

                    <div className="field low">
                      <button
                        className="submit-button-form"
                        onClick={(event) => registerUser(event)}
                        type="submit"
                      >
                        Submit
                      </button>
                    </div>

                    <div className="google-button-div">
                      <div className="google-btn">
                        <div className="google-icon-wrapper">
                          <img
                            className="google-icon"
                            src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                            alt="logo"
                          />
                        </div>
                        <p className="btn-text">
                          <b>Sign in with google</b>
                        </p>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
