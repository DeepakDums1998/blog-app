/**
 * API helper (frontend)
 * --------------------
 *
 * The frontend does NOT talk to Firestore directly.
 * Instead, it calls Firebase Functions (serverless endpoints) using fetch().
 *
 * Why?
 * - This keeps your database logic in one place (the backend).
 * - In real apps, this is where you'd also enforce security and validation.
 */

// In CRA, environment variables must start with REACT_APP_
// Example (local emulator):
// REACT_APP_FUNCTIONS_BASE_URL=http://127.0.0.1:5001/<projectId>/<region>/api
const BASE_URL =
  process.env.REACT_APP_FUNCTIONS_BASE_URL ||
  // A placeholder that makes it obvious what the user must set.
  "http://127.0.0.1:5001/YOUR_PROJECT_ID/us-central1/api";

async function request(path, options = {}) {
  const url = `${BASE_URL}${path}`;

  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  // Read response body (usually JSON).
  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    const msg = data.error || `Request failed: ${res.status}`;
    throw new Error(msg);
  }

  return data;
}

export function getPosts() {
  return request("/getPosts");
}

export function getPostById(id) {
  const qs = new URLSearchParams({ id }).toString();
  return request(`/getPostById?${qs}`);
}

export function createPost(post) {
  return request("/createPost", {
    method: "POST",
    body: JSON.stringify(post),
  });
}

export function updatePost(id, post) {
  const qs = new URLSearchParams({ id }).toString();
  return request(`/updatePost?${qs}`, {
    method: "PUT",
    body: JSON.stringify(post),
  });
}

export function deletePost(id) {
  const qs = new URLSearchParams({ id }).toString();
  return request(`/deletePost?${qs}`, {
    method: "DELETE",
  });
}


