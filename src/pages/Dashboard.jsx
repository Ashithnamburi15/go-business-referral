import { useCallback, useEffect, useState } from 'react';
import { Navbar, Footer } from '../components/Navbar';
import { Overview, ServiceSummary } from '../components/Overview';
import { ReferralTable } from '../components/ReferralTable';
import { fetchReferrals } from '../api/referrals';

const ROWS_PER_PAGE = 10;

const asArray = value => (Array.isArray(value) ? value : []);
const pickPayload = json => {
  const data = json?.data;
  return data && typeof data === 'object' ? data : json || {};
};

const normalizeDashboard = json => {
  const payload = pickPayload(json);
  const referrals = asArray(payload.referrals || json?.referrals);

  return {
    metrics: asArray(payload.metrics || json?.metrics),
    serviceSummary: payload.serviceSummary || json?.serviceSummary || {},
    referral: payload.referral || json?.referral || {},
    referrals,
  };
};

export function Dashboard() {
  const [dashboard, setDashboard] = useState({
    metrics: [],
    serviceSummary: {},
    referral: {},
    referrals: [],
  });
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('desc');
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState('loading');
  const [error, setError] = useState('');

  const loadReferrals = useCallback(async () => {
    setStatus('loading');
    setError('');

    try {
      const response = await fetchReferrals(search, sort);

      if (!response.ok) {
        let errMsg = `${response.status} ${response.statusText}`;
        try {
          const json = await response.json();
          errMsg = json?.message || json?.error || errMsg;
        } catch {}
        setError(errMsg);
        setStatus('error');
        return;
      }

      const json = await response.json();
      setDashboard(normalizeDashboard(json));
      setPage(1);
      setStatus('success');
    } catch {
      setStatus('error');
      setError('Unable to load referrals. Please try again.');
    }
  }, [search, sort]);

  useEffect(() => {
    loadReferrals();
  }, [loadReferrals]);

  const totalPages = Math.max(1, Math.ceil(dashboard.referrals.length / ROWS_PER_PAGE));
  const currentPage = Math.min(page, totalPages);
  const startIndex = (currentPage - 1) * ROWS_PER_PAGE;
  const visibleReferrals = dashboard.referrals.slice(startIndex, startIndex + ROWS_PER_PAGE);
  const showingFrom = dashboard.referrals.length === 0 ? 0 : startIndex + 1;
  const showingTo = Math.min(startIndex + ROWS_PER_PAGE, dashboard.referrals.length);

  return (
    <div className="app-shell">
      <Navbar />
      <main className="dashboard-page">
        <section className="page-heading">
          <h1>Referral Dashboard</h1>
          <p>Track your referrals, earnings, and partner activity in one place.</p>
        </section>

        {status === 'loading' ? (
          <p className="status-message">Loading referrals...</p>
        ) : null}
        {status === 'error' ? (
          <p className="error-message" role="alert">
            {error}
          </p>
        ) : null}

        <Overview metrics={dashboard.metrics} />

        <ServiceSummary serviceSummary={dashboard.serviceSummary} />

        <section className="section-block share-block" aria-label="Share referral">
          <h2>Refer friends and earn more</h2>
          <CopyField label="Your Referral Link" value={dashboard.referral.link} />
          <CopyField label="Your Referral Code" value={dashboard.referral.code} />
        </section>

        <section className="section-block referrals-block">
          <div className="table-toolbar">
            <h2>All referrals</h2>
            <div className="filters">
              <label htmlFor="search-referrals">
                <span>Search referrals</span>
                <input
                  id="search-referrals"
                  aria-label="Search referrals"
                  placeholder="Name or service…"
                  value={search}
                  onChange={event => setSearch(event.target.value)}
                />
              </label>
              <label htmlFor="sort-referrals">
                <span>Sort by date</span>
                <select
                  id="sort-referrals"
                  value={sort}
                  onChange={event => setSort(event.target.value)}
                >
                  <option value="desc">Newest first</option>
                  <option value="asc">Oldest first</option>
                </select>
              </label>
            </div>
          </div>

          <ReferralTable visibleReferrals={visibleReferrals} />

          <div className="pagination">
            <p>
              Showing {showingFrom}–{showingTo} of {dashboard.referrals.length} entries
            </p>
            <div>
              <button
                type="button"
                onClick={() => setPage(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              {totalPages > 1 && Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                <button
                  key={p}
                  type="button"
                  className={p === currentPage ? 'active-page' : ''}
                  onClick={() => setPage(p)}
                >
                  {p}
                </button>
              ))}
              <button
                type="button"
                onClick={() => setPage(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

function CopyField({ label, value }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    if (!value) return;
    await navigator.clipboard?.writeText(value);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1200);
  };

  return (
    <label className="copy-field">
      <span>{label}</span>
      <div>
        <input readOnly value={value || ''} />
        <button type="button" onClick={copy}>
          Copy
        </button>
      </div>
      {copied ? <small>Copied</small> : null}
    </label>
  );
}
