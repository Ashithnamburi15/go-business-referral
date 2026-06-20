import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Navbar, Footer } from '../components/Navbar';
import { fetchReferralById } from '../api/referrals';

const formatDate = dateValue => {
  if (!dateValue) return '-';
  const clean = String(dateValue).split('T')[0];
  const parts = clean.split('-');
  if (parts.length === 3) {
    return `${parts[0]}/${parts[1]}/${parts[2]}`;
  }
  return clean.split('-').join('/');
};

const formatMoney = value => {
  const number = Number(value);
  if (!Number.isFinite(number)) return '$0';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(number);
};

const pickPayload = json => {
  const data = json?.data;
  return data && typeof data === 'object' ? data : json || {};
};

const normalizeReferral = json => {
  const payload = pickPayload(json);
  if (Array.isArray(payload.referrals)) return payload.referrals[0];
  if (Array.isArray(json?.referrals)) return json.referrals[0];
  if (payload.referral && typeof payload.referral === 'object') return payload.referral;
  if (payload.id || payload.name || payload.serviceName) return payload;
  return null;
};

export function ReferralDetails() {
  const { id } = useParams();
  const [referral, setReferral] = useState(null);
  const [status, setStatus] = useState('loading');
  const [error, setError] = useState('');

  useEffect(() => {
    const loadReferral = async () => {
      setStatus('loading');
      setError('');

      try {
        const response = await fetchReferralById(id);

        if (!response.ok) {
          let errMsg = `${response.status} ${response.statusText}`;
          try {
            const json = await response.json();
            errMsg = json?.message || json?.error || errMsg;
          } catch {}
          setError(errMsg);
          setStatus('not-found');
          return;
        }

        const json = await response.json();
        const row = normalizeReferral(json);
        if (!row || String(row.id) !== String(id)) {
          setStatus('not-found');
          return;
        }

        setReferral(row);
        setStatus('success');
      } catch {
        setError('Unable to load referral.');
        setStatus('not-found');
      }
    };

    loadReferral();
  }, [id]);

  return (
    <div className="app-shell">
      <Navbar />
      <main className="detail-page">
        <Link className="back-link" to="/">
          Back to dashboard
        </Link>
        {status === 'loading' ? <p className="status-message">Loading referral...</p> : null}
        {status === 'not-found' ? (
          <section className="section-block">
            <h1>Referral not found</h1>
            {error ? <p className="error-message">{error}</p> : null}
          </section>
        ) : null}
        {status === 'success' ? (
          <section className="section-block detail-card">
            <h1>Referral Details</h1>
            <h2>{referral.name}</h2>
            <dl>
              <div>
                <dt>Referral ID</dt>
                <dd>{referral.id}</dd>
              </div>
              <div>
                <dt>Service Name</dt>
                <dd>{referral.serviceName}</dd>
              </div>
              <div>
                <dt>Date</dt>
                <dd>{formatDate(referral.date)}</dd>
              </div>
              <div>
                <dt>Profit</dt>
                <dd>{formatMoney(referral.profit)}</dd>
              </div>
            </dl>
          </section>
        ) : null}
      </main>
      <Footer />
    </div>
  );
}
