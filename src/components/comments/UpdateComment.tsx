import { useState } from "react";
import { Comment, CommentData } from "../../interfaces";
import axios from "axios";
import { TextField } from "@mui/material";

function UpdateComment(
    {comment, handleEditState, handleChange, navigate}: 
    {
        comment: Comment, 
        handleEditState: (comment: Comment) => void, 
        handleChange: (updatedContent: string, id: number) => void, 
        navigate: any
    }): JSX.Element {
    const API_URL: string | undefined = import.meta.env.VITE_API_URL;
    const [content, setContent] = useState<string>(comment.content);

    async function handleSubmit(e: any) {
        e.preventDefault();

        // Get token to verify current user to authorize updating comment data
        const token = localStorage.getItem('auth_token');

        const commentData: CommentData = {
            comment: {
                ...comment,
                content: content,
            }
        }

        try {
            const response = await axios.put(`${API_URL}/comments/${comment.id}`, commentData, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `${token}`
                },
            })

            if (response.status === 401) {
                alert("You must log in first")
                navigate("/login")
            }
        } catch (error) {
            alert("Failed to update comment");
        }

        handleEditState(comment);
        handleChange(content, comment.id);
    }

    return <div>
        <form onSubmit={handleSubmit}>
            <div className="EditCommentContainer">
                <TextField
                    fullWidth
                    id="filled-textarea"
                    placeholder="Type your comment here"
                    value={content}
                    onChange={e => setContent(e.target.value)}
                    multiline
                    variant="filled"
                    required
                />
            </div>
            <button onClick={() => {handleEditState(comment)}}>Cancel</button>
            <button type="submit">Submit</button>
        </form>
    </div>
}

export default UpdateComment;