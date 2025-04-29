
// import { useNavigate } from "react-router-dom";
// import "./Home.css";

// function Home() {
//   const navigate = useNavigate();

//   return (
//     <div className="home-container">
//       {/* Navigation Bar */}
//       <nav className="navbar">
//         <div className="logo">SlideVox</div>
//         <div className="nav-links">
//           <a href="#features">Features</a>
//           <a href="#pricing">Pricing</a>
//           <a href="#testimonials">Testimonials</a>
//           <a href="#footer">Contact</a>
//         </div>
//         <div className="auth-buttons">
//           <button className="login-btn" onClick={() => navigate("/upload")}>
//             Log In
//           </button>
//           <button className="get-started-btn" onClick={() => navigate("/upload")}>
//             Get Started
//           </button>
//         </div>
//       </nav>

//       {/* Hero Section */}
//       <header className="hero">
//         <div className="hero-content">
//           <h1>THE SLIDE VOX</h1>
//           <p>
//             The ultimate AI-powered slide creation platform. Easily transform your
//             ideas into engaging, professional presentations—instantly.
//           </p>
//           <div className="hero-buttons">
//             <button className="primary-btn" onClick={() => navigate("/upload")}>
//               Try it for Free
//             </button>
//             <button className="secondary-btn">
//               Learn More
//             </button>
//           </div>

//           {/* Optional Mockup Slides Below */}
//           <div className="mockup-slides">
//             <div className="slide">Slide 1</div>
//             <div className="slide">Slide 2</div>
//             <div className="slide">Slide 3</div>
//           </div>
//         </div>
//       </header>

//       {/* Features Section */}
//       <section className="features" id="features">
//         <h2>Why SlideVox?</h2>
//         <div className="features-grid">
//           <div className="feature-card">
//             <h3>AI-Driven Speed</h3>
//             <p>Generate presentations in seconds using advanced AI models.</p>
//           </div>
//           <div className="feature-card">
//             <h3>Professional Designs</h3>
//             <p>Choose from a variety of sleek templates tailored to your needs.</p>
//           </div>
//           <div className="feature-card">
//             <h3>Collaboration</h3>
//             <p>Work with your team in real-time for faster feedback and iteration.</p>
//           </div>
//         </div>
//       </section>

//       {/* Testimonials Section */}
//       <section className="testimonials" id="testimonials">
//         <h2>What Our Users Say</h2>
//         <div className="testimonial-card">
//           <p>
//             "SlideVox saved me hours! The AI-generated slides look professional and on-brand."
//           </p>
//           <span>- Alex J., Marketing Specialist</span>
//         </div>
//       </section>

//       {/* Pricing Section */}
//       <section className="pricing" id="pricing">
//         <h2>Choose Your Plan</h2>
//         <div className="pricing-cards">
//           <div className="pricing-card">
//             <h3>Free</h3>
//             <p>$0 / mo</p>
//             <ul>
//               <li>Basic templates</li>
//               <li>Watermark included</li>
//             </ul>
//             <button onClick={() => navigate("/upload")}>Sign Up</button>
//           </div>
//           <div className="pricing-card">
//             <h3>Pro</h3>
//             <p>$9.99 / mo</p>
//             <ul>
//               <li>Unlimited slides</li>
//               <li>Advanced templates</li>
//               <li>No watermark</li>
//             </ul>
//             <button onClick={() => navigate("/upload")}>Start Free Trial</button>
//           </div>
//           <div className="pricing-card">
//             <h3>Enterprise</h3>
//             <p>Custom</p>
//             <ul>
//               <li>Custom branding</li>
//               <li>Team collaboration</li>
//               <li>Dedicated support</li>
//             </ul>
//             <button>Contact Us</button>
//           </div>
//         </div>
//       </section>

//       {/* Footer Section */}
//       <footer className="footer" id="footer">
//         <div className="footer-content">
//           <h3>SlideVox</h3>
//           <p>© {new Date().getFullYear()} SlideVox. All rights reserved.</p>
//         </div>
//       </footer>
//     </div>
//   );
// }

// export default Home;









import { useNavigate } from "react-router-dom";
import "./Home.css";
import backgroundImage from "./assets/background.jpg";

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
          <button className="get-started-btn" onClick={() => navigate("/upload")}>
            Get Started
          </button>
        </div>
      </nav>

      {/* Splash / Title Page Section */}
      

      {/* Hero Section */}
      <header
        className="hero"
        style={{
          backgroundImage: `url(${backgroundImage})` 
          }}>
        <div className="hero-overlay">
          <div className="hero-content">
            <h1 className="hero-title">Transform Your PDFs into Stunning Presentations</h1>
            <p className="hero-subtitle">AI-powered, professional, and lightning fast. Slide creation has never been easier.</p>
            <div className="hero-buttons">
              <button className="primary-btn" onClick={() => navigate("/upload")}>
                Try It Free
              </button>
              <button className="secondary-btn">Learn More</button>
            </div>
          </div>
        </div>
      </header>



      {/* Features Section (Why SlideVox?) */}
      <section className="features" id="features">
        <h2>Why SlideVox?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <h3>AI-Driven Speed</h3>
            <p>Generate presentations in seconds using advanced AI models.</p>
          </div>
          <div className="feature-card">
            <h3>Professional Designs</h3>
            <p>Choose from a variety of sleek templates tailored to your needs.</p>
          </div>
          <div className="feature-card">
            <h3>Collaboration</h3>
            <p>Work with your team in real-time for faster feedback and iteration.</p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      

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
          <div className="pricing-card">
            <h3>Pro</h3>
            <p>$9.99 / mo</p>
            <ul>
              <li>Unlimited slides</li>
              <li>Advanced templates</li>
              <li>No watermark</li>
            </ul>
            <button onClick={() => navigate("/upload")}>Start Free Trial</button>
          </div>
          <div className="pricing-card">
            <h3>Enterprise</h3>
            <p>Custom</p>
            <ul>
              <li>Custom branding</li>
              <li>Team collaboration</li>
              <li>Dedicated support</li>
            </ul>
            <button>Contact Us</button>
          </div>
        </div>
      </section>

      {/* Footer Section */}
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