const API_URL = 'https://skate-sharpening-tracker-production.up.railway.app';

export function getKey() {
  return localStorage.getItem('apiKey');
}

export function saveKey(key) {
  localStorage.setItem('apiKey', key);
}

export function clearKey() {
  localStorage.removeItem('apiKey');
}

export async function apiFetch(path, options = {}) {
  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      ...options.headers,
      'x-api-key': getKey(),
    },
  });

  if (res.status === 401) {
    clearKey();
    window.location.reload();
  }

  return res;
}