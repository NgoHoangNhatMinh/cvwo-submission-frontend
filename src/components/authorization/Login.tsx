import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useUser } from "../contexts/UserContext";
import "../../styles/Authorization.css"
import axios from "axios";

function Login() {
    const {setLoggedIn} = useAuth();
    const {setUser} = useUser();
    const [login, setLogin] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const API_URL: string | undefined = import.meta.env.VITE_API_URL;
    const navigate = useNavigate();

    async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        try {
            // Send a POST request to /login with the user login and password
            const response = await axios.post(`${API_URL}/login`, {user: { login, password }}, {
                headers: { 'Content-Type': 'application/json' },
            })

            // The server respond with an authorization token to verify user + user data
            const token = response.headers["authorization"];
            const userData = response.data.data;

            // Save the token to browser to allow user to stay logged in until token expire (in 30 minutes) 
            // Save current user data for display
            localStorage.setItem('auth_token', token);
            localStorage.setItem('user_data', userData);

            setLoggedIn(true);
            setUser(userData);

            // Go to homepage
            navigate("/")
        } catch (error) {
            console.error("Login error:", error);
            alert("No such user");
        }
    };

    return <div className="LoginContainer">
        <h1>Welcome Back</h1>
        <p>Enter your credentials to access your account</p>
        <form onSubmit={handleLogin}>
                <div>
                    <input
                        type="text"
                        placeholder="Enter your email or username"
                        value={login}
                        onChange={e => setLogin(e.target.value)}
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
                <button type="submit">Log In</button>
            </form>
    </div>
}

export default Login;