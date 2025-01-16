import { useUser } from "../contexts/UserContext";
import { Outlet, useNavigate } from "react-router-dom";
import "../../styles/Profile.css"
import { Avatar, Button } from "@mui/material";

function Profile () {
    const {user} = useUser();
    const navigate = useNavigate()

    function handlePosts() {
        navigate("/user/posts")
    }

    function handleComments() {
        navigate("/user/comments")
    }

    function handleOverview() {
        navigate("/user")
    }
    
    if (!user) {
        return (
            <div>
                <h1>No such user</h1>
                <p>Awkward...</p>
            </div>
        )
    }

    return <div>
        <div className="ProfileContainer">
            {user?.image_url
                            ? <Avatar src={user?.image_url} sx={{ width: 150, height: 150 }}></Avatar>
                            : <Avatar sx={{ width: 150, height: 150 }}>{user?.username}</Avatar>
                        }
            <div className="ProfileInfo">
                <h1>{`${user.username}`}</h1>
                <p>{`${user.email}`}</p>
            </div>
        </div>
        <Button onClick={handleOverview}>Overview</Button>
        <Button onClick={handlePosts}>Posts</Button>
        <Button onClick={handleComments}>Comments</Button>     
        <Outlet/>
    </div>
}

export default Profile;