/**
 * App.jsx
 * -------
 * This component defines the pages (routes) for our blog.
 *
 * React Router basics:
 * - <Routes> contains <Route> items.
 * - Each <Route> connects a URL path to a component.
 * - Link lets us navigate WITHOUT refreshing the page.
 */

import React from "react";
import { Link, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Post from "./pages/Post.jsx";
import Admin from "./pages/Admin.jsx";

export default function App() {
  return (
    <div className="container">
      <header className="nav">
        <div className="brand">Personal Blog</div>
        <nav className="navLinks">
          <Link to="/">Home</Link>
          <Link to="/admin">Admin</Link>
        </nav>
      </header>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/post/:id" element={<Post />} />
        <Route path="/admin" element={<Admin />} />
        <Route
          path="*"
          element={
            <div className="grid">
              <div className="card">
                <h2 className="title">Not found</h2>
                <p className="muted">That page does not exist.</p>
                <Link to="/">Go back home</Link>
              </div>
            </div>
          }
        />
      </Routes>
    </div>
  );
}


