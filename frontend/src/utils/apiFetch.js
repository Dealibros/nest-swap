import HandleApiError from './apiErrorHandler';

export async function apiFetch(url, method, body = null, options = {}) {
  const headers = {
    'X-Api-Key': options.apiKey,
    authorization: 'Bearer ' + localStorage.getItem('token'),
  };

  if (body && !options.isFormData) {
    headers['Content-Type'] = 'application/json';
    body = JSON.stringify(body);
  }

  const response = await fetch(url, {
    method,
    headers,
    body: method === 'GET' || method === 'HEAD' ? null : body,
  });

  if (response.status === 401) {
    HandleApiError({ error: { response } });
  }

  return response.json();
}
