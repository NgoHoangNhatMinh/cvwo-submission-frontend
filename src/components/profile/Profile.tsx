import { useUser } from "../contexts/UserContext";
import { Link, Outlet, useNavigate } from "react-router-dom";
import "../../styles/Profile.css"
import { Avatar, Button } from "@mui/material";
import SideBar from "../SideBar";

function Profile () {
    const {user} = useUser();
    const navigate = useNavigate()

    function handlePosts() {
        navigate("/user/posts")
    }

    function handleComments() {
        navigate("/user/comments")
    }
    
    if (!user) {
        return (
            <div>
                <h1>No such user</h1>
                <p>Awkward...</p>
            </div>
        )
    }

    return <>
        <div className="MainContainer">
            <SideBar/>
            <div className="Content Profile">
                <div className="ProfileContainer">
                    <Link to="/setting">
                        <Avatar src={user?.image_url} sx={{ width: 150, height: 150 }}></Avatar>
                    </Link>
                    <div className="ProfileInfo">
                        <h1>{`${user.username}`}</h1>
                        <p>{`${user.email}`}</p>
                    </div>
                </div>
                <div className="ProfileContentOptions">
                    <Link to={"/user/posts"}><Button onClick={handlePosts}>Posts</Button></Link>
                    <Link to={"/user/comments"}><Button onClick={handleComments}>Comments</Button></Link>
                </div>
                <Outlet/>
            </div>
        </div>
    </>
}

export default Profile;