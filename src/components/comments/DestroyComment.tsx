import axios from "axios";
import { Comment } from "../../interfaces";

async function DestroyComment(comment: Comment | undefined, navigate: any): Promise<boolean> {
    // Return early for empty comment
    if (!comment) {
        return false;
    }

    const API_URL: string | undefined = import.meta.env.VITE_API_URL;
    // Get token to verify current user to authorize deleting comment data
    const token = localStorage.getItem('auth_token');

    try {
        const response = await axios.delete(`${API_URL}/comments/${comment.id}`, {
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
            alert("Comment deleted successfully!");
            return true;
        }
    } catch(e) {
        alert('Failed to delete comment');
    }
    return false;
}


export default DestroyComment;