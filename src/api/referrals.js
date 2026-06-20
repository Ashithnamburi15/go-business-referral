import { getToken } from './auth';

export const REFERRALS_URL = 'https://v9fes04dwf.execute-api.eu-north-1.amazonaws.com/api/referrals';

export const fetchReferrals = async (search = '', sort = 'desc') => {
  const params = new URLSearchParams();
  if (search.trim()) params.set('search', search.trim());
  if (sort) params.set('sort', sort);
  const url = `${REFERRALS_URL}${params.toString() ? `?${params}` : ''}`;

  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  return response;
};

export const fetchReferralById = async (id) => {
  const response = await fetch(`${REFERRALS_URL}?id=${encodeURIComponent(id)}`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  return response;
};
