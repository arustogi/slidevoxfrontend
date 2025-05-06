



import { useAuthenticator, Authenticator } from "@aws-amplify/ui-react";
import "./App.css";
import { fetchAuthSession, getCurrentUser } from "aws-amplify/auth";

import { useState, useEffect } from "react";

const API_URL = "https://215lhsh6ie.execute-api.us-east-2.amazonaws.com/v1/generate-presigned-url";
function UploadPage() {
  const { signOut } = useAuthenticator();
  const [email, setEmail] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");
  const [fileUrl, setFileUrl] = useState("");

useEffect(() => {
  const fetchEmail = async () => {
    try {
      const user = await getCurrentUser();
      const session = await fetchAuthSession();

      console.log("User object:", user);
      console.log("Session:", session);

      // Check user attributes or decode tokens here
      const idToken = (await fetchAuthSession()).tokens?.idToken;
      const payload = idToken?.payload;
      setEmail(String(payload?.email ?? ""));

    } catch (err) {
      console.error("Failed to get current user or session", err);
    }
  };

  fetchEmail();
}, []);


  // Handle file selection
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
      setMessage("");
      setFileUrl("");
    }
  };

  // Handle file upload
  const uploadFile = async () => {
    if (!file || !email) {
      alert("Please select a PDF file and ensure you're signed in.");
      return;
    }
  
    setUploading(true);
    setMessage("");
  
    try {
      // Step 1: Get a pre-signed URL from Lambda via API Gateway
      const presignRes = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": "CAaJOxCLmS9S8vwiI1d3s9JnVJmJ6Z6V4oqymjdx",
        },
        body: JSON.stringify({}) // You can send file metadata here later
      });
  
      const { upload_url, file_key } = await presignRes.json();
      console.log("🧾 Received Pre-Signed URL:", upload_url);
  
     // Step 2: Upload file directly to S3 using the pre-signed URL
     const s3UploadRes = await fetch(upload_url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/pdf",
      },
      body: file,
    });
      if (s3UploadRes.ok) {
        setMessage("✅ Upload successful!");
        const fileUrl = `https://slidevox-pdf-storage.s3.amazonaws.com/${file_key}`;
        setFileUrl(fileUrl);
        await fetch("https://215lhsh6ie.execute-api.us-east-2.amazonaws.com/v1/submit-metadata", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": "CAaJOxCLmS9S8vwiI1d3s9JnVJmJ6Z6V4oqymjdx"
          },
          body: JSON.stringify({
            file_key: file_key,
            email: email.trim()
          })
        });
      } else {
        throw new Error("❌ Failed to upload to S3");
      }
    } catch (error) {
      console.error("⚠️ Error uploading file:", error);
      setMessage(`⚠️ Upload error: ${error}`);
    } finally {
      setUploading(false);
    }
  };
  

return (
  <div className="app-container">
    <nav className="navbar">
      <div className="logo">SlideVox</div>
      <button className="login-btn" onClick={signOut}>Sign Out</button>
    </nav>

    <main>
      <div className="user-profile">
        <h2>User Profile</h2>
        <p><strong>Email:</strong> {email}</p>
        <p><strong>Plan:</strong> Premium (changeable later)</p>
        <div className="uploads-section">
          <h3>Previous Uploads</h3>
          <ul>
            <li><a href="#">Converted File 1</a></li>
            <li><a href="#">Converted File 2</a></li>
          </ul>
        </div>
      </div>

      <div className="upload-section">
        <h1>Upload Your PDF</h1>
        <label className="file-input">
          <input
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
            disabled={uploading}
          />
          {file ? file.name : "Choose a PDF file"}
        </label>

        <button onClick={uploadFile} disabled={!file || uploading}>
          {uploading ? "Uploading..." : "Upload PDF"}
        </button>

        {message && <p className="message">{message}</p>}

        {fileUrl && (
          <p>
            ✅ <a href={fileUrl} target="_blank" rel="noopener noreferrer">View Uploaded File</a>
          </p>
        )}
      </div>
    </main>
  </div>
);
}

function App() {
  return (
    <Authenticator socialProviders={['google']}>
      <UploadPage />
    </Authenticator>

  );
}

export default App;










