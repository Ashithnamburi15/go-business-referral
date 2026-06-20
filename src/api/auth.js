import Cookies from 'js-cookie';

export const TOKEN_COOKIE = 'jwt_token';
export const SIGNIN_URL = 'https://v9fes04dwf.execute-api.eu-north-1.amazonaws.com/api/auth/signin';

export const getToken = () => Cookies.get(TOKEN_COOKIE);
export const setToken = (token) => Cookies.set(TOKEN_COOKIE, token);
export const removeToken = () => Cookies.remove(TOKEN_COOKIE);

export const signIn = async (email, password) => {
  const response = await fetch(SIGNIN_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  return response;
};
