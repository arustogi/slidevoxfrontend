import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Authenticator } from "@aws-amplify/ui-react";
import { Amplify } from "aws-amplify";
import outputs from "../amplify_outputs.json";
import App from "./App";
import Home from "./Home";
import "./index.css";
import "@aws-amplify/ui-react/styles.css";


Amplify.configure(outputs);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} /> {/* Home Screen */}
        <Route path="/upload" element={<Authenticator><App /></Authenticator>} /> {/* Protected Upload Page */}
      </Routes>
    </Router>
  </React.StrictMode>
);