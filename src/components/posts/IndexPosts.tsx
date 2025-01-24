import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Post } from '../../interfaces';
import '../../styles/IndexPosts.css'
import { InputLabel, FormControl, Select, MenuItem } from '@mui/material';
import axios from 'axios';

function IndexPosts(): JSX.Element {
    const API_URL: string | undefined = import.meta.env.VITE_API_URL;
    const navigate = useNavigate();
    const [sortOption, setSortOption] = useState('');
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState<Boolean>(true);
    const [error, setError] = useState<string>("");
    const [searchParams, setSearchParams] = useSearchParams();

    function navigateToPost(id: number) {
        navigate(`/posts/${id}`);
    }

    function handleSort(event: any) {
        setSortOption(event.target.value);
        // Clone existing params
        const newParams = new URLSearchParams(searchParams); 
        // Add or update the "sort" parameter
        newParams.set("sort", event.target.value); 
        // Update the URL with the new parameters
        setSearchParams(newParams); 
    }

    // fetch posts data on mount or when search params are updated
    useEffect(() => {
        axios.get(`${API_URL}/posts/?${searchParams}`)
            .then(response => {
                setPosts(response.data);
                setLoading(false);
            })
            .catch(error => {
                setError(error.message);
                setLoading(false);
            })
    }, [searchParams]);

    if (error) {
        return <div>{error}</div>;
    }

    if (loading) {
        return <div>Loading...</div>
    }

    if (!posts) {
        return <div>There are no posts</div>
    }

    return (
        <div className="PostsContainer">
            <FormControl className='FormControlSelect' sx={{ m: 1, minWidth: 200 }}>
                <InputLabel id="sort-select-label">Sort By</InputLabel>
                <Select
                    className="Select"
                    labelId="sort-select-label"
                    id="sort-select"
                    value={sortOption}
                    onChange={handleSort}
                    label="Sort By"
                >
                    <MenuItem value="time">Newest</MenuItem>
                    <MenuItem value="rate">Oldest</MenuItem>
                </Select>
            </FormControl>
            {
                posts.map((post) => {
                    return <div className="PostBorder" key={post.id}>
                        <div onClick={() => navigateToPost(post.id)} className="Post">
                            <p>{post.category.name.charAt(0).toUpperCase() + post.category.name.slice(1)}</p>
                            <h2>{"Post " + post.id + " - " + post.topic}</h2>
                            <p>{post.content}</p>
                            <p>{new Date(post.created_at).toLocaleDateString()}</p>
                        </div>
                    </div>
                })
            }
        </div>
    )
}

export default IndexPosts;
