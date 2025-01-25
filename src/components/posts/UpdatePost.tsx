import axios from "axios";
import { Post, PostData } from "../../interfaces";
import { useState } from "react";
import { TextField } from "@mui/material";

function UpdatePost({post, handleEditState, handleChange, navigate}: 
    {
        post: Post | undefined, 
        handleEditState: (state: boolean) => void, 
        handleChange: (topic: string, content: string) => void, 
        navigate: any}): JSX.Element {
    // To return early for empty post
    if (!post) {
        return <div>
            <h1>Nothing to see here...</h1>
        </div>;
    }

    const [topic] = useState<string>(post.topic);
    const [content, setContent] = useState<string>(post.content);

    const API_URL: string | undefined = import.meta.env.VITE_API_URL;

    async function handleUpdate(e: React.FormEvent) {
        e.preventDefault()

        if (!post)
            return

        // Get token to verify current user to authorize updating comment data
        const token = localStorage.getItem('auth_token');

        const postData: PostData = {
            post: {topic, content, category_id: post.category_id},
        }

        // Send PUT request to server with the updated post data
        try {
            const response = await axios.put(`${API_URL}/posts/${post.id}`, postData, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `${token}`
                },
            })

            if (response.status === 401) {
                alert("You must log in first")
                navigate("/login")
            } else {
                handleChange(topic, content);
            }
        } catch (error) {
            alert("Failed to update post");
        }
        // Toggle back to read mode
        handleEditState(false);
        // Update post topic and content in read mode
    }

    return (
        <div>
            <form onSubmit={handleUpdate}>
                <div className="EditPostContainer">
                    <TextField
                        fullWidth
                        id="filled-textarea"
                        placeholder="Type your content here"
                        value={content}
                        onChange={e => setContent(e.target.value)}
                        multiline
                        variant="filled"
                        required 
                    />
                </div>
                <button onClick={() => handleEditState(false)}>Cancel</button>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}


export default UpdatePost;