// One place for all calls to your PHP API.
// ALWAYS use relative paths that start with /api/ so the same code works:
//   - locally   (Vite forwards /api to XAMPP, see vite.config.js)
//   - staging   (https://<you>-dev.aws-deployhost.online/api/...)
//   - production(https://<you>.aws-deployhost.online/api/...)
// Never hard-code http://localhost/... in your React code.

async function request(path, options = {}) {
  const res = await fetch(`/api/${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) throw new Error(data.error || `Request failed (${res.status})`)
  return data
}

export const api = {
  get: (path) => request(path),
  post: (path, body) => request(path, { method: 'POST', body: JSON.stringify(body) }),
  put: (path, body) => request(path, { method: 'PUT', body: JSON.stringify(body) }),
  del: (path) => request(path, { method: 'DELETE' }),
}
