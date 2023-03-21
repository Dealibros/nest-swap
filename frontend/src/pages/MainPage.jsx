import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Hero from '../components/hero/Hero';
import Navbar from '../components/navbar/Navbar';
import { apiFetch } from '../utils/apiFetch';
import LoginPage from './LoginPage';

export default function Homepage() {
  const navigate = useNavigate();
  const afterCredentials = {
    id: '',
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    role: '',
  };

  const [user, setUser] = useState(afterCredentials);

  useEffect(() => {
    apiFetch(
      `http://localhost:8080/user/${localStorage.getItem('username')}`,
      'GET',
      null,
    )
      .then((data) => {
        setUser(data);
      })
      .catch((error) => {
        if (error.response.status === 401) {
          navigate('/register');
        }
      });
  }, []);

  localStorage.setItem('user_id', user.id);

  if (!localStorage.getItem('token')) {
    return <LoginPage></LoginPage>;
  } else {
    return (
      <>
        <Navbar user={user} />
        <Hero />
      </>
    );
  }
}
