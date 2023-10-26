import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <script type="module" src="/my-element.js"></script>
    <App />
  </React.StrictMode>
);
