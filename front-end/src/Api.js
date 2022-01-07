export const API_URL = 'http://localhost:3001';

export function LOGIN(body) {
  return {
    method: 'post',
    url: `${API_URL}/login`,
    data: body,
  };
}

export function REGISTER(body) {
  return {
    method: 'post',
    url: `${API_URL}/users/register`,
    data: body,
  };
}