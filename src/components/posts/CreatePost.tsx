import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Category, PostData } from "../../interfaces";
import "../../styles/Post.css"
import { Button, FormControl, InputLabel, MenuItem, OutlinedInput, Select, TextField } from "@mui/material";
import axios from "axios";
import SideBar from "../SideBar";

function CreatePost(): JSX.Element {
    const API_URL: string | undefined = import.meta.env.VITE_API_URL;
    const [topic, setTopic] = useState<string>("");
    const [content, setContent] = useState<string>("");
    const [categories, setCategories] = useState<Category[]>([]);
    const [categoryID, setCategoryID] = useState<number | undefined>();
    const navigate = useNavigate();

    // On submitting form, send POST request to server with the post data
    async function handleSubmit(e: React.FormEvent<HTMLFormElement>): Promise<void> {
        e.preventDefault();

        if(!categoryID) {
            throw new Error("Must enter category")
        }

        // Get token to verify current user to fetch their comment data
        const token = localStorage.getItem('auth_token');
        const postData: PostData = {
            post: {topic, content, category_id: categoryID},
        }

        try {
            const response = await axios.post(`${API_URL}/posts`, postData, {
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
                navigate(`/posts/${response.data.id}`);
            }
        } catch(e) {
            console.error("Validation errors");
            alert("Failed to create post");
        }
    }

    // Fetch available categories
    useEffect(() => {
        fetch(`${API_URL}/categories`)
            .then(response => response.json())
            .then(data => {setCategories(data)})
    }, [])

    return (
        <div className="MainContainer">
            <SideBar/>
            <div className="Content">
                <div className="CreatePostContainer">
                    <h1>Create new post</h1>
                    <FormControl
                        onSubmit={handleSubmit}
                        className="Form CreatePost"
                        component="form" // Ensures this acts as a form element
                        sx={{
                            m: 1,
                            minWidth: 200,
                            display: { xs: 'none', sm: 'flex' },
                            flexDirection: "column",
                            gap: 2,
                            width: '100%',
                            '& .MuiOutlinedInput-root': {
                            height: '3rem',
                            },
                            '& .MuiSvgIcon-root': {
                            fontSize: '1rem',
                            },
                        }}
                    >
                        <FormControl>
                            <OutlinedInput
                                className="TextField"
                                type="text"
                                id="topic"
                                placeholder="Topic"
                                value={topic}
                                onChange={e => setTopic(e.target.value)}
                                sx={{
                                    minWidth: '350px',
                                }}
                                required
                            />
                        </FormControl>
                        <FormControl sx={{ minWidth: 200, marginBottom: 2 }}>
                            <InputLabel>Category</InputLabel>
                            <Select onChange={e => setCategoryID(Number(e.target.value))}>
                                {categories.map((category => <MenuItem value={category.id} key={category.id}>{category.name.charAt(0).toUpperCase() + category.name.slice(1)}</MenuItem>))}
                            </Select>
                        </FormControl>
                        <div>
                            <TextField
                                fullWidth
                                id="filled-textarea"
                                placeholder="Content"
                                value={content}
                                onChange={e => setContent(e.target.value)}
                                multiline
                                variant="filled"
                                required
                            />
                        </div>
                        <div className="PostOptions">
                            <Button
                                onClick={() => navigate("/")}
                                variant="contained"
                                type="submit"
                                sx={{
                                    width: '10% !important',
                                }}
                            >
                                    Cancel
                            </Button>
                            <Button
                                variant="contained"
                                type="submit"
                                sx={{
                                    width: '10% !important',
                                }}
                            >
                                    Submit
                            </Button>
                        </div>
                    </FormControl>
                </div>
            </div>
        </div>
    )
}

export default CreatePost;