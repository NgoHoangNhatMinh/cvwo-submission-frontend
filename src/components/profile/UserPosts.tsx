import { useEffect, useState } from "react";
import { useUser } from "../contexts/UserContext";
import { Post } from "../../interfaces";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getDateDifference } from "../GlobalFunctions";

function UserPosts() {
    const {user} = useUser();
    const navigate = useNavigate();
    const API_URL: string | undefined = import.meta.env.VITE_API_URL;
    const [posts, setPosts] = useState<Post[]>([]);

    function navigateToPost(id: number) {
        navigate(`/posts/${id}`);
    }

    // Get current user's posts data
    useEffect(() => { 
        if (user) {
            try {
                axios.get(`${API_URL}/users/${user.id}/posts`)
                    .then(response => setPosts(response.data))
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
        <h1>User's posts</h1>
        {
            posts.length > 0
                ? posts.map(post => {
                    const today = new Date();
                    const postDate = new Date(post.created_at);
                    const diff = getDateDifference(today, postDate);

                    return <div className="PostBorder" key={post.id}>
                        <div onClick={() => navigateToPost(post.id)} className="Post Clickable">
                            <div className="PostText">
                                <h2>{post.topic}</h2>
                                <p className={post.category.name.charAt(0).toUpperCase() + post.category.name.slice(1) + "Category"}>
                                    {post.category.name.charAt(0).toUpperCase() + post.category.name.slice(1)}
                                </p>
                                <p className='PostContent'>{post.content}</p>
                            </div>
                            <div className="PostMetadata">
                                <p>{diff + " ago"}</p>
                                <div className="CommentCount">
                                    <p>{post.comment_count}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    })
                : <p>No posts available</p>
        }
    </div>
}

export default UserPosts