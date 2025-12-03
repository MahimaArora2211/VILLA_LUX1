import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { getSession, signOutUser } from '../utils/auth';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const session = getSession();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    signOutUser();
    window.location.href = '/';
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  // Scroll to section (About / Contact)
  const handleScrollToSection = (id) => {
    closeMobileMenu();
    if (location.pathname !== '/') {
      navigate('/', { state: { scrollTo: id } });
      setTimeout(() => {
        const section = document.getElementById(id);
        if (section) section.scrollIntoView({ behavior: 'smooth' });
      }, 500);
    } else {
      const section = document.getElementById(id);
      if (section) section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* ✅ Brand name changed here */}
        <Link to="/" className="navbar-brand" onClick={closeMobileMenu}>
          🏝️ Villa Vista
        </Link>

        <button
          className="hamburger"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
          aria-expanded={mobileMenuOpen}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <ul className={`navbar-links ${mobileMenuOpen ? 'mobile-open' : ''}`}>
          <li>
            <Link to="/" onClick={closeMobileMenu}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/villas" onClick={closeMobileMenu}>
              Villas
            </Link>
          </li>
          <li>
            <button
              onClick={() => handleScrollToSection('about')}
              className="nav-link-btn"
              style={{
                background: 'none',
                border: 'none',
                color: 'inherit',
                font: 'inherit',
                cursor: 'pointer',
                padding: 0,
                marginRight: '18px', // 👈 spacing before Contact
              }}
            >
              About Us
            </button>
          </li>
          <li>
            <button
              onClick={() => handleScrollToSection('contact')}
              className="nav-link-btn"
              style={{
                background: 'none',
                border: 'none',
                color: 'inherit',
                font: 'inherit',
                cursor: 'pointer',
                padding: 0,
              }}
            >
              Contact
            </button>
          </li>
        </ul>

        <div className="navbar-auth">
          {session ? (
            <>
              <span className="navbar-user">Hi, {session.firstName}</span>
              <button onClick={handleLogout} className="btn btn-danger">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/signin" className="btn btn-primary">
                Sign In
              </Link>
              <Link to="/signup" className="btn btn-secondary">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
