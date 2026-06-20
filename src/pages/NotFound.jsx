import { Link } from 'react-router-dom';

export function NotFound() {
  return (
    <main className="not-found-page">
      <section className="section-block">
        <h1>404 - Page Not Found</h1>
        <Link className="primary-link" to="/">
          Back to dashboard
        </Link>
      </section>
    </main>
  );
}
