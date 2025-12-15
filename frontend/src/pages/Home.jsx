/**
 * Home Page
 * ---------
 * Fetches all posts and displays them.
 *
 * useState:
 * - Stores data/state for this component (posts, loading, error).
 *
 * useEffect:
 * - Runs a function when the component loads (like "on page open").
 * - Here, we fetch posts once when Home loads.
 */

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPosts } from "../api";

function preview(text, maxLen = 140) {
  const t = String(text || "");
  if (t.length <= maxLen) return t;
  return `${t.slice(0, maxLen)}...`;
}

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function load() {
    setLoading(true);
    setError("");
    try {
      const data = await getPosts();
      setPosts(data.posts || []);
    } catch (e) {
      setError(e.message || "Failed to load posts.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="grid">
      <div className="card">
        <h1 className="title">Blog Posts</h1>
        <p className="muted">
          This page calls a Firebase Function (serverless) to fetch posts.
        </p>
        <div className="btnRow">
          <button onClick={load} disabled={loading}>
            Refresh
          </button>
        </div>
      </div>

      {loading && (
        <div className="card">
          <p>Loading…</p>
        </div>
      )}

      {error && (
        <div className="error">
          <strong>Error:</strong> {error}
        </div>
      )}

      {!loading && !error && posts.length === 0 && (
        <div className="card">
          <p className="muted">No posts yet. Add one from the Admin page.</p>
          <Link to="/admin">Go to Admin</Link>
        </div>
      )}

      {!loading &&
        !error &&
        posts.map((p) => (
          <div key={p.id} className="card">
            <h2 style={{ margin: "0 0 6px" }}>
              <Link to={`/post/${p.id}`}>{p.title}</Link>
            </h2>
            <div className="muted" style={{ fontSize: 14 }}>
              {p.author || "Unknown"} •{" "}
              {p.createdAt ? new Date(p.createdAt).toLocaleString() : "No date"}
            </div>
            <p style={{ marginTop: 10 }}>{preview(p.content)}</p>
            <Link to={`/post/${p.id}`}>Read more</Link>
          </div>
        ))}
    </div>
  );
}


