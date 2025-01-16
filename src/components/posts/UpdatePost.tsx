import axios from "axios";
import { Post, PostData } from "../../interfaces";
import { useState } from "react";

function UpdatePost({post, handleEditState, handleChange, navigate}: 
    {
        post: Post | undefined, 
        handleEditState: () => void, 
        handleChange: (topic: string, content: string) => void, 
        navigate: any}): JSX.Element {
    // To return early for empty post
    if (!post) {
        return <div>
            <h1>Nothing to see here...</h1>
        </div>;
    }

    const [topic, setTopic] = useState<string>(post.topic);
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
                alert("Update successfully");
            }
        } catch (error) {
            alert("Failed to update post");
        }
        // Toggle back to read mode
        handleEditState();
        // Update post topic and content in read mode
    }

    return (
        <div>
            <h1>Editing...</h1>
            <form onSubmit={handleUpdate}>
            <div>
                    <label >Topic: </label>
                    <input 
                        type="text"
                        value={topic}
                        onChange={e => setTopic(e.target.value)}
                        required 
                    />
                </div>
                <div>
                    <label >Content: </label>
                    <input 
                        type="text"
                        value={content}
                        onChange={e => setContent(e.target.value)}
                        required 
                    />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}


export default UpdatePost;