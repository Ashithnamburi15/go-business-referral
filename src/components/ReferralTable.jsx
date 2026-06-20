import React from 'react';
import { useNavigate } from 'react-router-dom';

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

export function ReferralTable({ visibleReferrals }) {
  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Service</th>
            <th>Date</th>
            <th>Profit</th>
          </tr>
        </thead>
        <tbody>
          {visibleReferrals.length > 0 ? (
            visibleReferrals.map(referral => (
              <ReferralRow key={referral.id} referral={referral} />
            ))
          ) : (
            <tr>
              <td colSpan="4" className="empty-cell">
                No matching entries
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

function ReferralRow({ referral }) {
  const navigate = useNavigate();
  const openReferral = () => navigate(`/referral/${referral.id}`);

  return (
    <tr
      className="clickable-row"
      onClick={openReferral}
      onKeyDown={event => {
        if (event.key === 'Enter' || event.key === ' ') openReferral();
      }}
      tabIndex="0"
    >
      <td>{referral.name}</td>
      <td>{referral.serviceName}</td>
      <td>{formatDate(referral.date)}</td>
      <td>{formatMoney(referral.profit)}</td>
    </tr>
  );
}
