import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useEffect, useState } from "react";
import { useUser } from "../contexts/UserContext";
import Logo from '../../assets/react.svg'
import { Avatar, Button, } from "@mui/material";
import { useTheme } from "../contexts/ThemeContext";
import axios from "axios";
import { AccountMenu } from "./AccountMenu";
import ContrastIcon from '@mui/icons-material/Contrast';
import AddIcon from '@mui/icons-material/Add';
import SearchBar from "./SearchBar";

function Header() {
    const {loggedIn, setLoggedIn} = useAuth();
    const {setUser} = useUser();
    const {isDarkMode, setIsDarkMode} = useTheme();
    const API_URL: string | undefined = import.meta.env.VITE_API_URL;
    const navigate = useNavigate();
    const [error, setError] = useState<string>("");

    function handleLogout() {
        setLoggedIn(false);
        localStorage.removeItem("auth_token");
        navigate("/");
    }

    function handleLogin() {
        navigate("/login");
    }

    function handleSignup() {
        navigate("/signup");
    }

    function handleCreate() {
        navigate("/posts/new")
    }

    function handleProfile() {
        navigate("/user")
    }

    function handleSetting() {
        navigate("/setting")
    }

    function handleThemeChange() {
        localStorage.setItem('is_dark', String(!isDarkMode));
        setIsDarkMode(!isDarkMode);
    }

    useEffect(() => {
        const token = localStorage.getItem('auth_token');

        // Fetch current user information and logged in status based on token verification
        if (token === null) {
            setLoggedIn(false);
            setUser(undefined);
        } else {
            setLoggedIn(true);
            axios.get(`${API_URL}/current_user`, {
                headers: {
                    "Authorization": `${token}`
                }
            })
                .then(response => {
                    if (response.status === 401) {
                        setLoggedIn(false);
                        localStorage.removeItem('auth_token');
                        return undefined;
                    } else {
                        setUser(response.data)
                    }
                })
                .catch (error => {
                    setError(error.message);
                    throw new Error(error.message);
                }) 
        }

        // Set theme based on existing preference
        const isDark = localStorage.getItem('is_dark');
        if (isDark === null) {
            setIsDarkMode(false);
        } else {
            setIsDarkMode(isDark === "true");
        } 
    }, [])



    useEffect(() => {
        // Toggle dark/light theme by changing the data-theme attribute
        document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
      }, [isDarkMode]);

    return <div className="HeaderContainer">
        <Link to="/" className="LeftHeader"><Avatar src={Logo}></Avatar></Link>
        {/* In small screen, search form should turn into icon that can expand the whole bar upon click */}
        <div className="MiddleHeader">
            <SearchBar/>
        </div>
        <div className="RightHeader">
            <Button onClick={handleThemeChange}><ContrastIcon></ContrastIcon></Button>
            {loggedIn 
                ? <>
                    <Button onClick={handleCreate}><AddIcon/> Create</Button>
                    <AccountMenu handleLogout={handleLogout} handleProfile={handleProfile} handleSetting={handleSetting}/>
                </> 
                : <>
                    <Button onClick={handleSignup}>Sign up</Button>
                    <Button onClick={handleLogin}>Log in</Button>
                </>
            }
        </div>
    </div>
}

export default Header;