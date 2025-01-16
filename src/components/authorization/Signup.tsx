import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useUser } from "../contexts/UserContext";
import axios from "axios";

function Signup() {
    const {setLoggedIn} = useAuth();
    const {setUser} = useUser();
    const [email, setEmail] = useState<string>("");
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const API_URL: string | undefined = import.meta.env.VITE_API_URL;
    const navigate = useNavigate();

    async function handleSignup(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        try {
            // Send a POST request to /signup with the user email, username, and password

            const response = await axios.post(`${API_URL}/signup`, { user: { email, password, username } }, {
                headers: { 'Content-Type': 'application/json' },
            })

            // The server respond with an authorization token to verify user + user data
            const token = response.headers["authorization"]
            const userData = response.data.data;

            // Save the token to browser to allow user to stay logged in until token expire (in 30 minutes) 
            // Save current user data for display
            localStorage.setItem('auth_token', token);
            localStorage.setItem('user_data', userData)

            setLoggedIn(true);
            setUser(response.data.data);

            // Go to homepage
            navigate("/")
        } catch (error) {
            console.error("Sign up error:", error);
            alert("Cannot sign up");
        }
    };

    return <div className="SignupContainer">
        <h1>Welcome</h1>
        <p>Enter your credentials to sign up</p>
        <form onSubmit={handleSignup}>
                <div>
                    <input
                        type="text"
                        placeholder="Enter your email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <input
                        type="text"
                        placeholder="Enter your username"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <input
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Sign Up</button>
            </form>
    </div>
}

export default Signup;