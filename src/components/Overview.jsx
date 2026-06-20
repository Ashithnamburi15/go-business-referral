import React from 'react';

export function Overview({ metrics }) {
  return (
    <section className="section-block" aria-label="Overview metrics">
      <h2>Overview</h2>
      <div className="metric-grid">
        {metrics.map(metric => (
          <article className="metric-card" key={metric.id || metric.label}>
            <span>{metric.label}</span>
            <strong>{metric.value}</strong>
          </article>
        ))}
      </div>
    </section>
  );
}

export function ServiceSummary({ serviceSummary }) {
  return (
    <section className="section-block" aria-label="Service summary">
      <h2>Service summary</h2>
      <div className="summary-grid">
        <SummaryItem label="Service" value={serviceSummary.service} />
        <SummaryItem label="Your Referrals" value={serviceSummary.yourReferrals} />
        <SummaryItem label="Active Referrals" value={serviceSummary.activeReferrals} />
        <SummaryItem
          label="Total Ref. Earnings"
          value={serviceSummary.totalRefEarnings}
        />
      </div>
    </section>
  );
}

function SummaryItem({ label, value }) {
  return (
    <div className="summary-item">
      <span>{label}</span>
      <strong>{value || '-'}</strong>
    </div>
  );
}
