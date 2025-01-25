import { useEffect, useState } from "react";
import { useUser } from "../contexts/UserContext";
import { Comment } from "../../interfaces";
import axios from "axios";
import { getDateDifference } from "../GlobalFunctions";
import { useNavigate } from "react-router-dom";

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

                    console.log(comment);

                    // return <div className="PostBorder" key={comment.id}>
                    //     <div onClick={() => navigateToPost(comment.post.id)} className="Post Clickable">
                    //         <div className="PostText">
                    //             <h2>{comment.post.topic}</h2>
                    //             <p className={comment.post.category.name.charAt(0).toUpperCase() + comment.post.category.name.slice(1) + "Category"}>
                    //                 {comment.post.category.name.charAt(0).toUpperCase() + comment.post.category.name.slice(1)}
                    //             </p>
                    //             <p className='PostContent'>{comment.post.content}</p>
                    //         </div>
                    //         <div className="PostMetadata">
                    //             <p>{diff + " ago"}</p>
                    //         </div>
                    //     </div>
                    // </div>

                    return <div key={comment.id} onClick={() => navigateToPost(comment.post.id)} className="Comment Clickable">
                        <h2 className="CommentTitle">{comment.post.topic}</h2>
                        <div className="CommentContent">
                            <p>{comment.user.username + " - " + diff + " ago"}</p>
                            {comment.content}
                        </div>
                    </div>
                    
                    })
                : <p>No comments available</p>
        }
    </div>
}

export default UserComments