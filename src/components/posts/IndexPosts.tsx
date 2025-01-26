import { useState, useEffect } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Post } from '../../interfaces';
import '../../styles/Post.css'
import { InputLabel, FormControl, Select, MenuItem, Box } from '@mui/material';
import axios from 'axios';
import SideBar from '../SideBar';
import { getDateDifference } from '../GlobalFunctions';
import ChatIcon from '@mui/icons-material/Chat';

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
        return <div className='MainContainer'>{error}</div>;
    }

    if (loading) {
        return <div className='MainContainer'>Loading...</div>
    }

    if (!posts) {
        return <div className='MainContainer'>There are no posts</div>
    }

    return (
        <div className='MainContainer'>
            <SideBar/>
            <div className="Content">
                <Box>
                <FormControl sx={{
                    minWidth:120
                }}>
                    <InputLabel id="SortLabel" className='CustomLabel'>Sort By</InputLabel>
                    <Select
                    labelId="SortLabel"
                    id="Sort"
                    value={sortOption}
                    label="Sort By"
                    onChange={handleSort}
                    >
                        <MenuItem value="" disabled>Sort By</MenuItem>  {/* Placeholder */}
                        <MenuItem value="time">Newest</MenuItem>
                        <MenuItem value="rate">Oldest</MenuItem>
                    </Select>
                </FormControl>
                </Box>
                {
                    posts.map((post) => {
                        const today = new Date();
                        const postDate = new Date(post.created_at);
                        const diff = getDateDifference(today, postDate);

                        return <div className="PostBorder" key={post.id}>
                            <Link to={"/posts/" + post.id}>
                                <div onClick={() => navigateToPost(post.id)} className="Post Clickable">
                                    <div className="PostText">
                                        <h2>{post.topic}</h2>
                                        <p className={post.category.name.charAt(0).toUpperCase() + post.category.name.slice(1) + "Category Category"}>
                                            {post.category.name.charAt(0).toUpperCase() + post.category.name.slice(1)}
                                        </p>
                                        <p className='PostContent'>{post.content}</p>
                                    </div>
                                    <div className="PostMetadata">
                                        <p>{diff + " ago"}</p>
                                        <div className="CommentCount">
                                            <ChatIcon/>
                                            <p>{post.comment_count}</p>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    })
                }
            </div>
        </div>
    )
}

export default IndexPosts;
