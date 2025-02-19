import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useEffect, useState } from "react";
import { useUser } from "../contexts/UserContext";
import { Button, } from "@mui/material";
import { useTheme } from "../contexts/ThemeContext";
import axios from "axios";
import { AccountMenu } from "./AccountMenu";
import ContrastIcon from '@mui/icons-material/Contrast';
import AddIcon from '@mui/icons-material/Add';
import SearchBar from "./SearchBar";
import LogoDark from '../../assets/cvwo-logo-text-light.svg';
import LogoLight from '../../assets/cvwo-logo-text.svg';

function Header() {
    const {loggedIn, setLoggedIn} = useAuth();
    const {setUser} = useUser();
    const {isDarkMode, setIsDarkMode} = useTheme();
    const API_URL: string | undefined = import.meta.env.VITE_API_URL;
    const navigate = useNavigate();
    const [error, setError] = useState<string>("");
    const [logo, setLogo] = useState('');

    function handleLogout() {
        setLoggedIn(false);
        localStorage.removeItem("auth_token");
        navigate("/");
    }

    function handleLogin() {
        navigate("/authentication/login");
    }

    function handleSignup() {
        navigate("/authentication/signup");
    }

    function handleCreate() {
        navigate("/posts/new")
    }

    function handleProfile() {
        navigate("/user/posts")
    }

    function handleSetting() {
        navigate("/setting")
    }

    function handleThemeChange() {
        localStorage.setItem('is_dark', String(!isDarkMode));
        setIsDarkMode(!isDarkMode);
        setLogo(isDarkMode ? LogoLight : LogoDark);
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
                .catch (e => {
                    setError(e.message);
                    console.log(error);
                    setLoggedIn(false);
                    localStorage.removeItem('auth_token');
                }) 
        }

        // Set theme based on existing preference
        const isDark = localStorage.getItem('is_dark');
        if (isDark === null || isDark === "false") {
            setIsDarkMode(false);
            setLogo(LogoLight);
        } else {
            setIsDarkMode(true);
            setLogo(LogoDark);
        }
    }, [])



    useEffect(() => {
        // Toggle dark/light theme by changing the data-theme attribute
        document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
      }, [isDarkMode]);

    return <div className="HeaderContainer">
        <Link to="/" className="LeftHeader">
            {/* <Avatar src={Logo}></Avatar> */}
            <img src={logo} alt="" style={{ width: "5rem", height: "auto" }} />
        </Link>
        {/* In small screen, search form should turn into icon that can expand the whole bar upon click */}
        <div className="MiddleHeader">
            <SearchBar/>
        </div>
        <div className="RightHeader">
            <Button onClick={handleThemeChange}><ContrastIcon></ContrastIcon></Button>
            {loggedIn 
                ? <>
                    <Link to={"/posts/new"}><Button onClick={handleCreate}><AddIcon/> Create</Button></Link>
                    <AccountMenu handleLogout={handleLogout} handleProfile={handleProfile} handleSetting={handleSetting}/>
                </> 
                : <>
                    <Link to={"/authentication/signup"}><Button onClick={handleSignup}>Sign up</Button></Link>
                    <Link to={"/authentication/login"}><Button onClick={handleLogin}>Log in</Button></Link>
                </>
            }
        </div>
    </div>
}

export default Header;