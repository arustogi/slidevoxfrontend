


import { useNavigate } from "react-router-dom";
import "./Home.css";

import pdfToPptImage from "./assets/pdftopptimg.jpeg";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="logo">SlideVox</div>
        <div className="nav-links">
          <a href="#features">Features</a>
          <a href="#pricing">Pricing</a>
          <a href="#testimonials">Testimonials</a>
          <a href="#footer">Contact</a>
        </div>
        <div className="auth-buttons">
          <button className="login-btn" onClick={() => navigate("/upload")}>
            Log In
          </button>
        </div>
      </nav>
      


      {/* Hero Section */}
{/* 
      <header className="hero" id="hero">
        <div className="hero-overlay">
          <div className="hero-content">
            <h1 className="hero-title neon-text">
              Convert PDFs to Presentations and Videos
            </h1>
            <p className="hero-subtitle animated-text">
              Your AI slide assistant, built for speed and style.
            </p>
            <div className="hero-buttons">
              <button className="primary-btn" onClick={() => navigate("/upload")}>Get Started</button>
            </div>
          </div>
        </div>
      </header> */}


       {/* Hero Section */}
       <header className="hero" id="hero">
        <div className="hero-text">
          <h1 className="hero-title neon-text">
            Instantly Convert PDFs to Presentations
          </h1>
          <p className="hero-subtitle animated-text">
            Your AI slide assistant, built for speed and style.
          </p>
          <button className="primary-btn" onClick={() => navigate("/upload")}>
            Get Started
          </button>
        </div>
        <div className="hero-img">
          {/* <img src="/assets/pdftopptimg.jpeg" alt="Slide Preview" /> */}
          <img src={pdfToPptImage} alt="Slide Preview" />
        </div>
      </header>



      {/* Features Section */}
      <section className="features" id="features">
        <h2>Why SlideVox?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <h3>AI-Driven Speed</h3>
            <p>Generate presentations in seconds using advanced AI models.</p>
          </div>
          <div className="feature-card">
            <h3>Professional Designs</h3>
            <p>Choose from sleek templates tailored to your content.</p>
          </div>
          <div className="feature-card">
            <h3>Collaboration</h3>
            <p>Work with your team in real-time and gather feedback instantly.</p>
          </div>
          <div className="feature-card">
            <h3>Cloud-Based Access</h3>
            <p>Access your presentations anytime, anywhere with secure cloud sync.</p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials" id="testimonials">
        <h2>What Our Users Say</h2>
        <div className="testimonial-card">
          <p>"SlideVox saved me hours! The slides are beautiful and on-brand."</p>
          <span>- Alex J., Marketing Specialist</span>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="pricing" id="pricing">
        <h2>Choose Your Plan</h2>
        <div className="pricing-cards">
          <div className="pricing-card">
            <h3>Free</h3>
            <p>$0 / mo</p>
            <ul>
              <li>Basic templates</li>
              <li>Watermark included</li>
            </ul>
            <button onClick={() => navigate("/upload")}>Sign Up</button>
          </div>
          <div className="pricing-card best-value">
            <h3>Pro</h3>
            <p>$9.99 / mo</p>
            <ul>
              <li>Unlimited slides</li>
              <li>Premium templates</li>
              <li>No watermark</li>
            </ul>
            <button onClick={() => navigate("/upload")}>Start Free Trial</button>
          </div>
          <div className="pricing-card">
            <h3>Enterprise</h3>
            <p>Custom</p>
            <ul>
              <li>Team collaboration</li>
              <li>Custom branding</li>
              <li>Dedicated support</li>
            </ul>
            <button>Contact Us</button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer" id="footer">
        <div className="footer-content">
          <h3>SlideVox</h3>
          <p>© {new Date().getFullYear()} SlideVox. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default Home;