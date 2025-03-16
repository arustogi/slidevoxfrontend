// import { useState } from "react";
// import "./App.css";

// const API_URL = "https://215lhsh6ie.execute-api.us-east-2.amazonaws.com/v1/upload";

// function App() {
//   const [file, setFile] = useState<File | null>(null);
//   const [uploading, setUploading] = useState(false);
//   const [message, setMessage] = useState("");
//   const [fileUrl, setFileUrl] = useState("");

//   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     if (event.target.files && event.target.files.length > 0) {
//       setFile(event.target.files[0]);
//       setMessage("");
//       setFileUrl("");
//     }
//   };

//   const uploadFile = async () => {
//     if (!file) {
//       alert("Please select a PDF file.");
//       return;
//     }

//     setUploading(true);
//     setMessage("");

//     try {
//       const response = await fetch(API_URL, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/pdf",
//           "x-api-key": "CAaJOxCLmS9S8vwiI1d3s9JnVJmJ6Z6V4oqymjdx",
//         },
//         body: file,
//         mode: "cors",
//       });

//       const responseText = await response.text();
//       console.log("Raw API Response:", responseText);

//       let result;
//       try {
//         result = JSON.parse(responseText);
//       } catch (error) {
//         throw new Error("Failed to parse JSON response");
//       }

//       if (response.ok) {
//         setMessage("✅ Upload successful!");
//         setFileUrl(result.file_url);
//       } else {
//         setMessage(`❌ Upload failed: ${result.error || "Unknown error"}`);
//       }
//     } catch (error) {
//       setMessage(`⚠️ Error uploading file: ${error}`);
//     }

//     setUploading(false);
//   };

//   return (
//     <div className="app-container">
//       {/* 🔹 Navigation Bar */}
//       <nav className="navbar">
//         <div className="logo">SlideVox</div>
//         <div className="nav-links">
//           <a href="#about">About</a>
//           <a href="#developers">Developers</a>
//           <a href="#login">Log In</a>
//           <button className="get-started">Get Started</button>
//         </div>
//       </nav>

//       {/* 🔹 Hero Section */}
//       <div className="hero-section">
//         <div className="content">
//           <h1>
//             Upload Your PDF. <span className="highlight-text">Get It Processed.</span>
//           </h1>
//           <p>Fast, AI-powered file processing.</p>

//           {/* 🔹 File Upload */}
//           <label className="file-input">
//             <input type="file" accept="application/pdf" onChange={handleFileChange} />
//             {file ? file.name : "Choose a PDF file"}
//           </label>

//           {/* 🔹 Upload Button */}
//           <button onClick={uploadFile} disabled={!file || uploading}>
//             {uploading ? "Uploading..." : "Upload PDF"}
//           </button>

//           {/* 🔹 Status Message */}
//           {message && <p className="message">{message}</p>}

//           {/* 🔹 File URL Display */}
//           {fileUrl && (
//             <p>
//               ✅ <a href={fileUrl} target="_blank" rel="noopener noreferrer">
//                 View Uploaded File
//               </a>
//             </p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default App;

import { useState } from "react";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { useNavigate } from "react-router-dom";
import { fetchAuthSession } from "@aws-amplify/auth";
import "./App.css";

const API_URL = "https://215lhsh6ie.execute-api.us-east-2.amazonaws.com/v1/upload";

function App() {
  const { user, signOut } = useAuthenticator();
  const navigate = useNavigate();
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
      // ✅ Fetch Auth Session to get JWT Token
      const session = await fetchAuthSession();
      const token = session.tokens?.idToken?.toString();
  
      if (!token) {
        throw new Error("No authentication token found.");
      }
  
      console.log("🛡️ Retrieved JWT Token:", token);
  
      // ✅ Read file content as base64
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = async () => {
        const base64File = reader.result?.toString().split(",")[1];
  
        const response = await fetch(API_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
            "x-api-key": "CAaJOxCLmS9S8vwiI1d3s9JnVJmJ6Z6V4oqymjdx",
          },
          body: JSON.stringify({
            "body-json": base64File, // ✅ Ensure body format matches Lambda expectations
          }),
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
      };
    } catch (error) {
      console.error("⚠️ Error uploading file:", error);
      setMessage(`⚠️ Error uploading file: ${error}`);
    }
  
    setUploading(false);
  };

  return (
    <div className="app-container">
      <nav className="navbar">
        <div className="logo">SlideVox</div>
        <button className="logout-btn" onClick={() => { signOut(); navigate("/"); }}>Sign Out</button> {/* ✅ Sign Out */}
      </nav>

      <div className="upload-section">
        <h1>Upload Your PDF</h1>
        <p>Welcome, {user?.username}!</p>
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
  );
}

export default App;
