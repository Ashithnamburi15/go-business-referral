import { Link, useNavigate } from 'react-router-dom';
import { removeToken } from '../api/auth';

export function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    removeToken();
    navigate('/login', { replace: true });
  };

  return (
    <header className="topbar">
      <Link className="brand" to="/" aria-label="Go to dashboard home">
        Go Business
      </Link>
      <nav className="primary-nav" aria-label="Primary">
        <Link to="/">Home</Link>
        <button type="button" onClick={logout}>
          Log out
        </button>
      </nav>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="site-footer" aria-label="Footer">
      <span>Go Business</span>
      <nav>
        <a href="/about">About</a>
        <a href="/privacy">Privacy</a>
      </nav>
      <small>© 2024 Go Business</small>
    </footer>
  );
}
