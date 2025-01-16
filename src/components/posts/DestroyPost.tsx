import axios from "axios";
import { Post } from "../../interfaces";

async function DestroyPost(post: Post | undefined, navigate: any): Promise<boolean> {
    // Return early for empty post
    if (!post) {
        return false;
    }

    const API_URL: string | undefined = import.meta.env.VITE_API_URL;
    // Get token to verify current user to authorize deleting comment data
    const token = localStorage.getItem('auth_token');

    try {
        const response = await axios.delete(`${API_URL}/posts/${post.id}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `${token}`
            }, 
        })

        if (response.status === 401) {
            // status UNATHORIZED
            alert("You must log in first")
            navigate("/login")
        } else {
            alert("Post deleted successfully!");
            return true;
        }
    } catch(e) {
        alert('Failed to delete post');
    }
    return false;
}


export default DestroyPost;