/**
 * React entry point
 * -----------------
 * This is where React starts and renders the whole app into <div id="root"></div>.
 *
 * React Router basics:
 * - <BrowserRouter> enables URL-based navigation in the browser.
 * - <App /> contains our routes (Home, Post details, Admin).
 */

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);



