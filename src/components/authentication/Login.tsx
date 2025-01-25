import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useUser } from "../contexts/UserContext";
import "../../styles/Authentication.css";
import axios from "axios";
import { Button, FormControl, IconButton, InputAdornment, OutlinedInput } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';

function Login() {
    const {setLoggedIn} = useAuth();
    const {setUser} = useUser();
    const [login, setLogin] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [showPassword, setShowPassword] = useState<boolean>(false);
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

    return <>
    <div className="LoginContainer">
        <h1>Welcome Back</h1>
        <p>Enter your credentials to access your account</p>
        <FormControl
            className="Form"
            component="form" // Ensures this acts as a form element
            onSubmit={handleLogin}
            sx={{
                m: 1,
                minWidth: 200,
                display: { xs: 'none', sm: 'flex' },
                flexDirection: "column",
                gap: 2,
                alignItems: "center",
                width: '100%',
    
                '& .MuiOutlinedInput-root': {
                height: '36px',
                },
                '& .MuiSvgIcon-root': {
                fontSize: '1rem',
                },
            }}
        >
            <FormControl>
                <OutlinedInput
                    className="TextField"
                    type="text"
                    id="login"
                    placeholder="Enter your email or username"
                    value={login}
                    onChange={e => setLogin(e.target.value)}
                    endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label={"Login"}
                            edge="end"
                          >
                            <PersonOutlineIcon/>
                          </IconButton>
                        </InputAdornment>
                      }
                    sx={{
                        minWidth: '350px',
                      }}
                    required
                />
            </FormControl>
            <FormControl>
                <OutlinedInput
                    className="TextField"
                    type={showPassword ? "text" : "password"}
                    id="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    sx={{
                        minWidth: '350px',
                      }}
                    required
                    endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label={
                              showPassword ? 'hide the password' : 'display the password'
                            }
                            onClick={() => setShowPassword(prev => !prev)} style={{ cursor: 'pointer' }}
                            edge="end"
                          >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                />
            </FormControl>
            <div className="LoginButton">
            <Button 
                type="submit" 
                variant="contained"
                sx={{
                    minWidth: '350px !important',
                }}
            >
                Sign Up
            </Button>
            </div>
        </FormControl>
        <div className="LoginOption">
          <p>Don't have an account?</p>
          <Link to="/authentication/signup">Sign up</Link>
        </div>
    </div>
    </>
}

export default Login;