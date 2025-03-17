import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signUpUser, loginUser } from "../services/authService"; // Will implement later

const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isSignup, setIsSignup] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            if (isSignup) {
                await signUpUser(email, password);
            } else {
                await loginUser(email, password);
            }
            navigate("/upload"); 
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div>
            <h2>{isSignup ? "Sign Up" : "Log In"}</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <input 
                    type="email" 
                    placeholder="Email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required
                />
                <input 
                    type="password" 
                    placeholder="Password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required
                />
                <button type="submit">{isSignup ? "Sign Up" : "Log In"}</button>
            </form>
            <button onClick={() => setIsSignup(!isSignup)}>
                {isSignup ? "Already have an account? Log In" : "New here? Sign Up"}
            </button>
        </div>
    );
};

export default Auth;
