import { useAuthenticator, Authenticator } from "@aws-amplify/ui-react";
import { useNavigate } from "react-router-dom";
import "./App.css";
import { fetchAuthSession } from "@aws-amplify/auth";
import { useEffect } from "react";
function AppContent() {
  const { user, signOut } = useAuthenticator();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const session = await fetchAuthSession();
        const token = session.tokens?.idToken?.toString();

        if (!token) {
          console.warn("⚠️ No authentication token found.");
        } else {
          console.log("🛡️ Retrieved JWT Token:", token);  // ✅ Should appear in browser console
        }
      } catch (error) {
        console.error("⚠️ Error fetching session:", error);
      }
    };

    checkAuth();
  }, []);

  return (
    <div className="app-container">
      <nav className="navbar">
        <div className="logo">SlideVox</div>
        <button className="logout-btn" onClick={() => signOut()}>Sign Out</button>
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
