import { useAuthenticator, Authenticator } from "@aws-amplify/ui-react";
import { useNavigate } from "react-router-dom";
import "./App.css";

function AppContent() {
  const { user, signOut } = useAuthenticator();
  const navigate = useNavigate();

  return (
    <div className="app-container">
      <nav className="navbar">
        <div className="logo">SlideVox</div>
        <button className="logout-btn" onClick={() => { signOut(); navigate("/"); }}>
          Sign Out
        </button>
      </nav>

      <div className="upload-section">
        <h1>Welcome, {user?.username}!</h1>
        <p>Now that you're logged in, we will slowly bring back the file upload.</p>
      </div>
    </div>
  );
}

function App() {
  return (
    <Authenticator>
      <AppContent />
    </Authenticator>
  );
}

export default App;
