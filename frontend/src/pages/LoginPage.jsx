import '../styles/RegisterLogin.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/navbar/Navbar';

export default function Login() {
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });

  let navigate = useNavigate();

  const loginUser = (e) => {
    e.preventDefault();

    const encodedData = window.btoa(
      credentials.username + ':' + credentials.password,
    );

    return fetch('http://localhost:8080/authentication/login', {
      method: 'POST',
      headers: {
        authorization: 'Basic ' + encodedData,
      },
    })
      .then((response) => response.text())
      .then((token) => {
        localStorage.setItem('token', token);
        localStorage.setItem('username', credentials.username);
        navigate('/homePage');
        navigate(0);
      })
      .catch((err) => {
        alert('Wrong username or password, try again!');
        console.error(err);
      });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }));
  };

  return (
    <>
      <Navbar />
      <div className="login-root">
        <div
          className="box-root flex-flex flex-direction--column"
          style={{ minHeight: '80vh', flexGrow: 1 }}
        >
          <div
            className="box-root more flex-flex flex-direction--column"
            style={{ flexGrow: 1, zIndex: 9 }}
          >
            <div className="title-div-login">
              <span className="swap-nest-title-register-login">SwapNest</span>
            </div>
            <div className="formbg-outer">
              <div className="formbg">
                <div className="formbg-inner side">
                  <span className="low span-login">Log in</span>
                  <form id="stripe-login">
                    <div className="field less">
                      <label className="label" htmlFor="username">
                        Username
                      </label>
                      <input
                        name="username"
                        value={credentials.username}
                        onChange={handleChange}
                        type="email"
                        required
                      />
                    </div>
                    <div className="field less">
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

                    <div className="field less">
                      <button
                        className="submit-button-form"
                        onClick={(e) => loginUser(e)}
                        type="submit"
                        name="submit"
                      >
                        Submit
                      </button>
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
