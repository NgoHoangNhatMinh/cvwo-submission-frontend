import { useEffect, useState } from "react";
import { useUser } from "../contexts/UserContext";
import { Comment } from "../../interfaces";
import axios from "axios";
import { getDateDifference } from "../GlobalFunctions";
import { Link, useNavigate } from "react-router-dom";
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

function UserComments() {
    const {user} = useUser();
    const navigate = useNavigate();
    const API_URL: string | undefined = import.meta.env.VITE_API_URL;
    const [comments, setComments] = useState<Comment[]>([])

    function navigateToPost(id: number) {
        navigate(`/posts/${id}`);
    }

    // Get current user's comments data
    useEffect(() => { 
        if (user) {
            try {
                axios.get(`${API_URL}/users/${user.id}/comments`)
                    .then(response => setComments(response.data))
            } catch (error: any) {
            }
        }
    }, [user, API_URL])
    
    if (!user) {
        return (
            <div>
                <h1>No such user</h1>
                <p>Awkward...</p>
            </div>
        )
    }
    
    return <div>
        <h1>Your comments</h1>
        {
            comments.length > 0
                ? comments.map(comment => {
                    const today = new Date();
                    const postDate = new Date(comment.created_at);
                    const diff = getDateDifference(today, postDate);

                    return <Link to={"/posts/" + comment.post.id}>
                        <div className="CommentBorder" key={comment.id}>
                            <div onClick={() => navigateToPost(comment.post.id)} className="Comment Clickable">
                                <h2 className="CommentTitle">{comment.post.topic}</h2>
                                <div className="CommentContent">
                                    <div className="CommentUser">
                                        <em>{comment.user.username}</em>
                                        <FiberManualRecordIcon
                                            sx={{
                                                fontSize: "0.5rem"
                                            }}
                                        />
                                        <p>{diff + " ago"}</p>
                                    </div>
                                    <p className="CommentBody">{comment.content}</p>
                                </div>
                            </div>
                        </div>
                    </Link>
                    })
                : <p>No comments available</p>
        }
    </div>
}

export default UserComments