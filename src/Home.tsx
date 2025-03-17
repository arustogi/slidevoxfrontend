// import { useNavigate } from "react-router-dom";
// import "./Home.css";

// function Home() {
//   const navigate = useNavigate();

//   return (
//     <div className="home-container">
//       {/*  Navigation Bar */}
//       <nav className="navbar">
//         <div className="logo">SlideVox</div>
//         <button className="login-btn" onClick={() => navigate("/upload")}>Log In</button>
//       </nav>

//       {/* Hero Section */}
//       <div className="hero">
//         <h1>Welcome to SlideVox</h1>
//         <p>Your AI-powered document processing platform.</p>
//         <button className="get-started-btn" onClick={() => navigate("/upload")}>Get Started</button>
//       </div>
//     </div>
//   );
// }

// export default Home;





import { useNavigate } from "react-router-dom";
import "./Home.css";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="logo">SlideVox</div>
        <div className="nav-links">
          <a href="#">Products</a>
          <a href="#">Case Studies</a>
          <a href="#">Developers</a>
          <a href="#">Insights</a>
          <a href="#">About</a>
        </div>
        <div className="auth-buttons">
          <button className="login-btn" onClick={() => navigate("/upload")}>Log In</button>
          <button className="get-started-btn" onClick={() => navigate("/upload")}>Get Started</button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="hero">
        <div className="hero-text">
          <h1>There's a better way to verify your customers.</h1>
          <p>Smarter anti-fraud and compliance solutions for fast-growing businesses.</p>
          <div className="hero-buttons">
            <button className="primary-btn" onClick={() => navigate("/upload")}>Try it for Free</button>
            <button className="secondary-btn">Learn More</button>
          </div>
        </div>
        
        {/* Illustration of Mobile Verification */}
        <div className="hero-image">
          <div className="mobile-mockup">
            <h3>User Sign Up</h3>
            <div className="input-field">
              <label>Name</label>
              <input type="text" value="Mary Watson" readOnly />
            </div>
            <div className="input-field">
              <label>Phone</label>
              <input type="text" value="(215) 742-5782" readOnly />
            </div>
            <button className="verify-btn">Verify My Identity</button>
            <div className="verified-badge">✔ Verified</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;