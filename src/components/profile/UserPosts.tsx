import { useEffect, useState } from "react";
import { useUser } from "../contexts/UserContext";
import { Post } from "../../interfaces";
import axios from "axios";

function UserPosts() {
    const {user} = useUser();
    const API_URL: string | undefined = import.meta.env.VITE_API_URL;
    const [posts, setPosts] = useState<Post[]>([])

    // Get current user's posts data
    useEffect(() => { 
        if (user) {
            try {
                axios.get(`${API_URL}/user/${user.id}/posts`)
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
                ? posts.map(post => {return <div key={post.id}>
                        <h5>{new Date(post.created_at).toLocaleDateString()}</h5>
                        <h4>{`Post ` + post.id}</h4>
                        {post.content}
                    </div>})
                : <p>No posts available</p>
        }
    </div>
}

export default UserPosts