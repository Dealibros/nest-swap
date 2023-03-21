import './styles.css';

export default function Navbar(user) {
  function logout() {
    localStorage.clear();
  }

  let userName = localStorage.getItem('username');

  return (
    <nav className="nav">
      <div className="logo">
        <h4>SwapNest</h4>
      </div>
      <div className="menu">
        <a id="home" className="menu-item" href="/homePage">
          Home
        </a>

        <a id="profile" className="menu-item" href="/profile">
          {userName ? userName + "'s" + ' profile' : 'Profile'}
        </a>

        <a id="editProfile" className="menu-item" href="/editprofile">
          Edit Profile
        </a>

        <a id="addHome" className="menu-item" href="/addHome">
          Add Home
        </a>

        {userName ? (
          <a id="logout" onClick={logout} className="menu-item" href="/">
            Logout
          </a>
        ) : (
          <>
            <a id="Login" className="menu-item" href="/login">
              Login
            </a>
            <a id="Register" className="menu-item" href="/register">
              Register
            </a>
          </>
        )}
      </div>
    </nav>
  );
}
