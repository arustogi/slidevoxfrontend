import { useState } from "react";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { fetchAuthSession } from "@aws-amplify/auth"; // ✅ Import session fetcher
import "./App.css";


const API_URL = "https://215lhsh6ie.execute-api.us-east-2.amazonaws.com/v1/upload";

function App() {
  const { user, signOut } = useAuthenticator();
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");
  const [fileUrl, setFileUrl] = useState("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
      setMessage("");
      setFileUrl("");
    }
  };

  const uploadFile = async () => {
    if (!file) {
      alert("Please select a PDF file.");
      return;
    }

    setUploading(true);
    setMessage("");

    try {
      // ✅ Get Auth Session to retrieve JWT token
      const session = await fetchAuthSession();
      const token = session.tokens?.idToken?.toString(); // ✅ Fetch JWT token

      if (!token) {
        throw new Error("No authentication token found.");
      }

      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/pdf",
          "x-api-key": "CAaJOxCLmS9S8vwiI1d3s9JnVJmJ6Z6V4oqymjdx",
          "Authorization": `Bearer ${token}`, // ✅ Use the token
        },
        body: file,
        mode: "cors",
      });

      const responseText = await response.text();
      console.log("Raw API Response:", responseText);

      let result;
      try {
        result = JSON.parse(responseText);
      } catch (error) {
        throw new Error("Failed to parse JSON response");
      }

      if (response.ok) {
        setMessage("✅ Upload successful!");
        setFileUrl(result.file_url);
      } else {
        setMessage(`❌ Upload failed: ${result.error || "Unknown error"}`);
      }
    } catch (error) {
      setMessage(`⚠️ Error uploading file: ${error}`);
    }

    setUploading(false);
  };

  return (
    <div className="app-container">
      <nav className="navbar">
        <div className="logo">SlideVox</div>
        <div className="nav-links">
          <a href="#about">About</a>
          <a href="#developers">Developers</a>
          <a href="#login">Log In</a>
          <button className="get-started" onClick={signOut}>Sign Out</button> {/* ✅ Sign out */}
        </div>
      </nav>

      <div className="hero-section">
        <div className="content">
          <h1>Welcome, {user?.username}!</h1> {/* ✅ Show username */}
          <h2>Upload Your PDF. <span className="highlight-text">Get It Processed.</span></h2>
          <p>Fast, AI-powered file processing.</p>

          <label className="file-input">
            <input type="file" accept="application/pdf" onChange={handleFileChange} />
            {file ? file.name : "Choose a PDF file"}
          </label>

          <button onClick={uploadFile} disabled={!file || uploading}>
            {uploading ? "Uploading..." : "Upload PDF"}
          </button>

          {message && <p className="message">{message}</p>}

          {fileUrl && (
            <p>
              ✅ <a href={fileUrl} target="_blank" rel="noopener noreferrer">
                View Uploaded File
              </a>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
