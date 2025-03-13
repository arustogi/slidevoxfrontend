// import { useEffect, useState } from "react";
// import type { Schema } from "../amplify/data/resource";
// import { generateClient } from "aws-amplify/data";

// const client = generateClient<Schema>();

// function App() {
//   const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);

//   useEffect(() => {
//     client.models.Todo.observeQuery().subscribe({
//       next: (data) => setTodos([...data.items]),
//     });
//   }, []);

//   function createTodo() {
//     client.models.Todo.create({ content: window.prompt("Todo content") });
//   }

//   return (
//     <main>
//       <h1>My todos</h1>
//       <button onClick={createTodo}>+ new</button>
//       <ul>
//         {todos.map((todo) => (
//           <li key={todo.id}>{todo.content}</li>
//         ))}
//       </ul>
//       <div>
//         🥳 App successfully hosted. Try creating a new todo.
//         <br />
//         <a href="https://docs.amplify.aws/react/start/quickstart/#make-frontend-updates">
//           Review next step of this tutorial.
//         </a>
//       </div>
//     </main>
//   );
// }

// export default App;


import { useState } from "react";
const API_URL = "https://215lhsh6ie.execute-api.us-east-2.amazonaws.com/v1/upload"
function App() {
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
      // Create a FormData object and append the file
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/pdf",
            "x-api-key": "CAaJOxCLmS9S8vwiI1d3s9JnVJmJ6Z6V4oqymjdx", 
        },
        body: file,
        mode: "cors",
    });
    const responseText = await response.text(); // ✅ Get raw response
    console.log("Raw API Response:", responseText); // ✅ Debugging

    // ✅ Ensure JSON parsing doesn't fail
    let result;
    try {
        result = JSON.parse(responseText);
    } catch (error) {
        throw new Error("Failed to parse JSON response");
    }

    if (response.ok) {
        setMessage(`✅ Upload successful! File URL: ${result.file_url}`);
    } else {
        setMessage(`❌ Upload failed: ${result.error || "Unknown error"}`);
    }
} catch (error) {
    setMessage(`⚠️ Error uploading file: ${error}`);
}
    setUploading(false);
};

  return (
    <main className="container">
      <h1>📄 Upload a PDF File</h1>
      <p>Choose a PDF file and upload it to the cloud.</p>

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
          ✅ <a href={fileUrl} target="_blank" rel="noopener noreferrer">View Uploaded File</a>
        </p>
      )}
    </main>
  );
}

export default App;