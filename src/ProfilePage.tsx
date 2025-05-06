import { useNavigate } from "react-router-dom";
import "./App.css";

function ProfilePage() {
  const navigate = useNavigate();

  return (
    <div className="app-container">
      <nav className="navbar">
        <div className="logo">SlideVox</div>
        <div className="navbar-buttons">
          <button className="profile-btn" onClick={() => navigate("/upload")}>
            Upload
          </button>
          <button className="logout-btn" onClick={() => navigate("/")}>
            Home
          </button>
        </div>
      </nav>

      <main className="profile-container">
        <div className="profile-section">
          <div className="profile-header">
            <img
              src="/default-avatar.png"
              alt="User Avatar"
              className="profile-avatar"
            />
            <div className="profile-info">
              <h2 className="profile-name">[User Name]</h2>
              <p className="profile-dob">Date of Birth: [MM/DD/YYYY]</p>
              <p className="profile-plan">Membership Plan: [Plan Name]</p>
            </div>
          </div>

          <div className="upload-history">
            <h3>Previous Uploads</h3>
            <ul className="upload-list">
              <li className="upload-item">
                <span className="upload-filename">example-report.pdf</span>
                <div className="upload-links">
                  <a href="#" className="download-link">Download Video</a>
                  <a href="#" className="download-link">Download PPT</a>
                </div>
              </li>
              <li className="upload-item">
                <span className="upload-filename">project-slides.pdf</span>
                <div className="upload-links">
                  <a href="#" className="download-link">Download Video</a>
                  <a href="#" className="download-link">Download PPT</a>
                </div>
              </li>
              {/* Add more upload items as needed */}
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}

export default ProfilePage;