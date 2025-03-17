import { useAuthenticator, Authenticator } from "@aws-amplify/ui-react";
import "./App.css";
import { useState } from "react";

const API_URL = "https://215lhsh6ie.execute-api.us-east-2.amazonaws.com/v1/upload";

function UploadPage() {
  const { user, signOut } = useAuthenticator(); // ✅ User logs in but we don't enforce auth for upload
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
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/pdf",
          "x-api-key": "CAaJOxCLmS9S8vwiI1d3s9JnVJmJ6Z6V4oqymjdx", // ✅ Keeping this for now
        },
        body: file,
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
      console.error("⚠️ Error uploading file:", error);
      setMessage(`⚠️ Error uploading file: ${error}`);
    }

    setUploading(false);
  };

  return (
    <div className="app-container">
      {/* 🔹 Navigation Bar */}
      <nav className="navbar">
        <div className="logo">SlideVox</div>
        <button className="logout-btn" onClick={signOut}>Sign Out</button>
      </nav>

      {/* 🔹 Upload Section */}
      <div className="upload-section">
        <h1>Upload Your PDF</h1>
        <p>Welcome, {user?.username}!</p>

        {/* 🔹 File Upload */}
        <label className="file-input">
          <input type="file" accept="application/pdf" onChange={handleFileChange} />
          {file ? file.name : "Choose a PDF file"}
        </label>

        {/* 🔹 Upload Button */}
        <button onClick={uploadFile} disabled={!file || uploading}>
          {uploading ? "Uploading..." : "Upload PDF"}
        </button>

        {/* 🔹 Status Message */}
        {message && <p className="message">{message}</p>}

        {/* 🔹 File URL Display */}
        {fileUrl && (
          <p>
            ✅ <a href={fileUrl} target="_blank" rel="noopener noreferrer">
              View Uploaded File
            </a>
          </p>
        )}
      </div>
    </div>
  );
}

function App() {
  return (
    <Authenticator>
      <UploadPage />
    </Authenticator>
  );
}

export default App;
