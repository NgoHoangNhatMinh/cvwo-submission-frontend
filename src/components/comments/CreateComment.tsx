import { CommentData } from "../../interfaces";
import { useState } from "react";
import "../../styles/Comment.css"
import { Button, FormControl, TextField } from "@mui/material";
import { Comment } from "../../interfaces";
import axios from "axios";

function CreateComment({post_id, handleNew, navigate}: {post_id: number, handleNew: (comment: Comment) => void, navigate: any}): JSX.Element {
    const API_URL: string | undefined = import.meta.env.VITE_API_URL;
    const [content, setContent] = useState<string>("");
    
    // On submitting form, send POST request to server with the comment data
    async function handleSubmit(e: React.FormEvent<HTMLFormElement>): Promise<void> {
        e.preventDefault();

        // Get token to verify current user to fetch their comment data
        const token = localStorage.getItem('auth_token');
        const commentData: CommentData = {
            comment: {content, post_id},
        }

        try {
            const response = await axios.post(`${API_URL}/comments`, commentData, {
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
                handleNew(response.data);
                alert("Comment created successfully!");
            }
        } catch(e) {
            alert('Failed to create comment');
        }
        setContent("");
    }

    return (
        <div className="AddComment">
            <FormControl
                className="FormControl"
                component="form" // Ensures this acts as a form element
                onSubmit={handleSubmit}
                sx={{
                    m: 1,
                    minWidth: 200,
                    display: "flex",
                    flexDirection: "row",
                    gap: 2,
                    alignItems: "center",
                }
            }
            >
                <TextField
                    className="TextField"
                    id="addcommentbox"
                    label="Add Comment"
                    variant="outlined"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
                <Button type="submit" variant="contained">Comment</Button>
            </FormControl>
        </div>
    )
}

export default CreateComment;