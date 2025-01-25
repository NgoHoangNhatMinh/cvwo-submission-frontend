import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useUser } from "../contexts/UserContext";
import axios from "axios";
import "../../styles/Authentication.css"
import { Button, FormControl, IconButton, InputAdornment, OutlinedInput } from "@mui/material";
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import { Visibility, VisibilityOff } from "@mui/icons-material";

function Signup() {
    const {setLoggedIn} = useAuth();
    const {setUser} = useUser();
    const [email, setEmail] = useState<string>("");
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [showPassword, setShowPassword] = useState<boolean>(false);
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

    return <>
        <div className="SignupContainer">
        <p>Start your writing journey</p>
        <h2>Sign Up to CVWOForum</h2>
        <FormControl
            className="Form"
            component="form" // Ensures this acts as a form element
            onSubmit={handleSignup}
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
                    type="email"
                    id="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label={"Username"}
                            edge="end"
                          >
                            <MailOutlineIcon/>
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
                    id="username"
                    placeholder="Enter your username"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label={"Username"}
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
            <div className="SignupButton">
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
    </div>
    <div className="LoginOption">
        <p>Have an account?</p>
        <Link to="/authentication/login">Log In</Link>
    </div>
    </>

}

export default Signup;