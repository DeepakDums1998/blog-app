/**
 * Admin Page (no auth, learning only)
 * ----------------------------------
 * Here we can create, edit, and delete posts.
 *
 * IMPORTANT:
 * - This is not secure for real apps because there's no authentication.
 * - We do this only to keep the project beginner-friendly.
 */

import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { createPost, deletePost, getPosts, updatePost } from "../api";

export default function Admin() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Form state (useState stores what's typed into inputs)
  const [editingId, setEditingId] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");

  const isEditing = useMemo(() => Boolean(editingId), [editingId]);

  function resetForm() {
    setEditingId(null);
    setTitle("");
    setContent("");
    setAuthor("");
  }

  async function refreshPosts() {
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
    refreshPosts();
  }, []);

  function startEdit(p) {
    setEditingId(p.id);
    setTitle(p.title || "");
    setContent(p.content || "");
    setAuthor(p.author || "");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function onSubmit(e) {
    e.preventDefault();

    // Minimal validation for beginners
    if (!title.trim() || !content.trim() || !author.trim()) {
      alert("Please fill in Title, Content, and Author.");
      return;
    }

    try {
      if (isEditing) {
        await updatePost(editingId, { title, content, author });
        alert("Post updated!");
      } else {
        await createPost({ title, content, author });
        alert("Post created!");
      }

      resetForm();
      // Refresh automatically after create/update
      await refreshPosts();
    } catch (e2) {
      alert(e2.message || "Action failed.");
    }
  }

  async function onDelete(id) {
    const ok = window.confirm("Delete this post? This cannot be undone.");
    if (!ok) return;

    try {
      await deletePost(id);
      alert("Post deleted!");
      // Refresh automatically after delete
      await refreshPosts();
    } catch (e) {
      alert(e.message || "Delete failed.");
    }
  }

  return (
    <div className="grid">
      <div className="card">
        <h1 className="title">Admin</h1>
        <p className="muted">
          Create, edit, and delete posts. (No login in this beginner project.)
        </p>
        <div className="btnRow">
          <Link to="/">← Back to Home</Link>
          <button onClick={refreshPosts} disabled={loading}>
            Refresh posts
          </button>
          {isEditing && (
            <button type="button" onClick={resetForm}>
              Cancel edit
            </button>
          )}
        </div>
      </div>

      <div className="card">
        <h2 style={{ marginTop: 0 }}>{isEditing ? "Edit Post" : "Create Post"}</h2>

        <form onSubmit={onSubmit}>
          <label>Title</label>
          <input value={title} onChange={(e) => setTitle(e.target.value)} />

          <label>Author</label>
          <input value={author} onChange={(e) => setAuthor(e.target.value)} />

          <label>Content</label>
          <textarea value={content} onChange={(e) => setContent(e.target.value)} />

          <div className="btnRow">
            <button type="submit" disabled={loading}>
              {isEditing ? "Update" : "Create"}
            </button>
            {isEditing && (
              <Link className="muted" to={`/post/${editingId}`}>
                View post details
              </Link>
            )}
          </div>
        </form>
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

      <div className="card">
        <h2 style={{ marginTop: 0 }}>Existing Posts</h2>
        <p className="muted" style={{ marginTop: 6 }}>
          Tip: Click “Edit” to load a post into the form above.
        </p>

        {posts.length === 0 ? (
          <p className="muted">No posts yet.</p>
        ) : (
          <div className="grid">
            {posts.map((p) => (
              <div key={p.id} className="card">
                <div className="row" style={{ justifyContent: "space-between" }}>
                  <div>
                    <div style={{ fontWeight: 700 }}>{p.title}</div>
                    <div className="muted" style={{ fontSize: 14 }}>
                      {p.author || "Unknown"} •{" "}
                      {p.createdAt
                        ? new Date(p.createdAt).toLocaleString()
                        : "No date"}
                    </div>
                  </div>
                  <div className="btnRow" style={{ marginTop: 0 }}>
                    <Link to={`/post/${p.id}`}>Open</Link>
                    <button type="button" onClick={() => startEdit(p)}>
                      Edit
                    </button>
                    <button
                      type="button"
                      className="btnDanger"
                      onClick={() => onDelete(p.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}


