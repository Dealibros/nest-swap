import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AddHome from './pages/AddHome';
import EditProfile from './pages/EditProfile';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';
import Profile from './pages/Profile';
import RegisterPage from './pages/RegisterPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route>
          <Route index element={<MainPage />} />
          <Route path="homepage" element={<MainPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="profile" element={<Profile />} />
          <Route path="editprofile" element={<EditProfile />} />
          <Route path="addhome" element={<AddHome />} />
          <Route path="home" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
