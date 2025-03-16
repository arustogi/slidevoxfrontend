import { useNavigate } from "react-router-dom";
import "./Home.css";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      {/*  Navigation Bar */}
      <nav className="navbar">
        <div className="logo">SlideVox</div>
        <button className="login-btn" onClick={() => navigate("/upload")}>Log In</button>
      </nav>

      {/* Hero Section */}
      <div className="hero">
        <h1>Welcome to SlideVox</h1>
        <p>Your AI-powered document processing platform.</p>
        <button className="get-started-btn" onClick={() => navigate("/upload")}>Get Started</button>
      </div>
    </div>
  );
}

export default Home;
