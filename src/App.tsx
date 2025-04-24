// import { useAuthenticator, Authenticator } from "@aws-amplify/ui-react";
// import "./App.css";
// import { useState } from "react";

// const API_URL = "https://215lhsh6ie.execute-api.us-east-2.amazonaws.com/v1/upload";

// function UploadPage() {
//   const { signOut } = useAuthenticator();
//   const [file, setFile] = useState<File | null>(null);
//   const [email, setEmail] = useState<string>("");
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
//     if (!file || !email) {
//       alert("Please select a PDF file and enter an email address.");
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
//           "x-user-email": email.trim(),
//         },
//         body: file,
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
//       console.error("⚠️ Error uploading file:", error);
//       setMessage(`⚠️ Error uploading file: ${error}`);
//     }

//     setUploading(false);
//   };

//   return (
//     <div className="app-container">
//       <nav className="navbar">
//         <div className="logo">SlideVox</div>
//         <button className="login-btn" onClick={signOut}>Sign Out</button>
//       </nav>

//       <div className="upload-section">
//         <h1>Upload Your PDF</h1>

//         <label className="file-input">
//           <input type="file" accept="application/pdf" onChange={handleFileChange} />
//           {file ? file.name : "Choose a PDF file"}
//         </label>

//         <input
//           type="email"
//           placeholder="Enter email to send PDF"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           className="email-input"
//         />

//         <button onClick={uploadFile} disabled={!file || !email || uploading}>
//           {uploading ? "Uploading..." : "Upload PDF"}
//         </button>

//         {message && <p className="message">{message}</p>}

//         {fileUrl && (
//           <p>
//             ✅ <a href={fileUrl} target="_blank" rel="noopener noreferrer">
//               View Uploaded File
//             </a>
//           </p>
//         )}
//       </div>
//     </div>
//   );
// }

// function App() {
//   return (
//     <Authenticator>
//       <UploadPage />
//     </Authenticator>
//   );
// }

// export default App;











import { useAuthenticator, Authenticator } from "@aws-amplify/ui-react";
import "./App.css";
import { useState } from "react";

const API_URL = "https://215lhsh6ie.execute-api.us-east-2.amazonaws.com/v1/generate-presigned-url";
function UploadPage() {
  const { signOut, user } = useAuthenticator();
  const email = user?.signInDetails?.loginId;


  const [file, setFile] = useState<File | null>(null);
  //const [email, setEmail] = useState<string>("");
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");
  const [fileUrl, setFileUrl] = useState("");
  console.log("user", user);
  console.log("email", user?.signInDetails?.loginId);

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

        {/* <input
          type="email"
          placeholder="Enter email to send PDF"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="email-input"
          disabled={uploading}
        /> */}

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

function App() {
  return (
    <Authenticator>
      <UploadPage />
    </Authenticator>
  );
}

export default App;