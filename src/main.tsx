import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { Amplify } from "aws-amplify";
import App from "./App";
import Home from "./Home";
import "./index.css";
import "@aws-amplify/ui-react/styles.css";

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: "us-east-2_6hw6kjiBB",
      userPoolClientId: "2ot7jlmmkd17mll5kldgqkrum",
      loginWith: {
        oauth: {
          domain: "slidevox-auth.auth.us-east-2.amazoncognito.com",
          scopes: ["email", "openid", "profile"],
          redirectSignIn: ["https://theslidevox.com/upload"],
          redirectSignOut: ["https://theslidevox.com/"],
          responseType: "code" as const 
        }
      }
    }
  }
});


ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} /> {/* Home Screen */}
        <Route path="/upload" element={<App />} />
      </Routes>
    </Router>
  </React.StrictMode>
);