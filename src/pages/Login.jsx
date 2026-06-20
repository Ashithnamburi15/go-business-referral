import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getToken, signIn, setToken } from '../api/auth';

export function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (getToken()) navigate('/', { replace: true });
  }, [navigate]);

  const onSubmit = async event => {
    event.preventDefault();
    setError('');

    try {
      const response = await signIn(email, password);

      if (!response.ok) {
        let errMsg = `${response.status} ${response.statusText}`;
        try {
          const json = await response.json();
          errMsg = json?.message || json?.error || errMsg;
        } catch {}
        setError(errMsg);
        return;
      }

      const json = await response.json();
      const token = json?.data?.token;
      if (!token) {
        setError('Unable to sign in. Please try again.');
        return;
      }

      setToken(token);
      navigate('/', { replace: true });
    } catch {
      setError('Invalid email or password');
    }
  };

  return (
    <main className="login-page">
      <section className="login-panel" aria-labelledby="login-title">
        <Link className="brand brand-large" to="/" aria-label="Go to dashboard home">
          Go Business
        </Link>
        <h1 id="login-title">Sign in to open your referral dashboard.</h1>
        <form className="login-form" onSubmit={onSubmit}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={event => setEmail(event.target.value)}
          />

          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={event => setPassword(event.target.value)}
          />

          {error ? (
            <p className="error-message" role="alert">
              {error}
            </p>
          ) : null}

          <button type="submit">
            Sign in
          </button>
        </form>
      </section>
    </main>
  );
}
