import { useState } from "react";
import { useAuthenticator, Authenticator } from "@aws-amplify/ui-react";
import { fetchAuthSession } from "@aws-amplify/auth";
import "./App.css";

const API_URL = "https://215lhsh6ie.execute-api.us-east-2.amazonaws.com/v1/upload"; // Using /upload for auth test

function UploadSection() {
  const { user, signOut } = useAuthenticator();
  const [authMessage, setAuthMessage] = useState("");

  const testAuthAPI = async () => {
    try {
      // ✅ Step 3.2: Retrieve JWT Token
      const session = await fetchAuthSession();
      const token = session.tokens?.idToken?.toString();

      if (!token) {
        throw new Error("No authentication token found.");
      }

      console.log("🛡️ Sending request with token:", token);

      // ✅ Send a GET request to /upload just to test authentication
      const response = await fetch(API_URL, {
        method: "GET", // 🚨 This is a test request, not an upload
        headers: {
          "Authorization": `Bearer ${token}`, // ✅ Send JWT Token
          "x-api-key": "CAaJOxCLmS9S8vwiI1d3s9JnVJmJ6Z6V4oqymjdx", // ✅ Keep API Key if required
        },
      });

      const responseText = await response.text();
      console.log("🔹 API Response:", responseText);

      setAuthMessage(`✅ Auth Test Successful: ${responseText}`);
    } catch (error) {
      console.error("⚠️ Error sending auth request:", error);
      setAuthMessage(`❌ Auth Test Failed: ${error}`);
    }
  };

  return (
    <div className="app-container">
      {/* 🔹 Navigation Bar */}
      <nav className="navbar">
        <div className="logo">SlideVox</div>
        <button className="logout-btn" onClick={signOut}>Sign Out</button>
      </nav>

      {/* 🔹 Authentication Test Section */}
      <div className="auth-test-section">
        <h1>Test API Gateway Authentication</h1>
        <p>Welcome, {user?.username}!</p>

        {/* 🔹 Button to Test Authentication */}
        <button onClick={testAuthAPI}>Test API Authentication</button>

        {/* 🔹 Show API Response */}
        {authMessage && <p className="message">{authMessage}</p>}
      </div>
    </div>
  );
}

function App() {
  return (
    <Authenticator>
      <UploadSection />
    </Authenticator>
  );
}

export default App;
