import { useState, useEffect } from 'react'
import { Comment } from '../../interfaces';
import DestroyComment from './DestroyComment';
import UpdateComment from './UpdateComment';
import CreateComment from './CreateComment';
import "../../styles/Comment.css"
import { useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import axios from 'axios';
import { Avatar } from '@mui/material';
import CrudMenu from '../CrudMenu';

function IndexComments({post_id}: {post_id: number}): JSX.Element {
    const API_URL: string | undefined = import.meta.env.VITE_API_URL;
    const [comments, setComments] = useState<Comment[]>([]);
    const [loading, setLoading] = useState<Boolean>(true);
    const [error, setError] = useState<string>("");
    // 
    const [edit, setEdit] = useState<Record<number,boolean>>({});
    const navigate = useNavigate();
    const {user} = useUser();

    async function handleDelete(comment: Comment) {
        // Request DELETE current post to the server
        // return true for successful deletion and false otherwise
        const success: boolean = await DestroyComment(comment, navigate);

        // If DELETE successfully, stop displaying comment
        if (success) {
            setComments((prevComments) =>
                prevComments.filter((c) => c.id !== comment.id)
            );
        }
    }

    function handleEdit(comment: Comment) {
        setEdit(prevEdit => ({
            ...prevEdit,
            [comment.id]: !prevEdit[comment.id], 
        }))
    }

    // So that updated comment appears immediately without having to reload page to fetch from server
    function handleChange(updatedContent: string, id: number) {
        if (!user) {
            return;
        }
        setComments(prevComments => prevComments.map(
            comment => comment.id === id
                ? {
                    ...comment, 
                    content: updatedContent, 
                 }
                : comment 
        ))
    }

    // So that new comment appears immediately without having to reload page to fetch from server
    function handleNew(comment: Comment) {
        setComments(prevComments => [comment, ...prevComments])
    }

    // fetch comments data on mount
    useEffect(() => {
        axios.get(`${API_URL}/posts/${post_id}/comments`)
            .then(response => {
                setComments(response.data);
                setLoading(false)
            })
            .catch(error => {
                setError(error.message);
                setLoading(false);
            })
    }, []);

    if (error) {
        return <div>{error}</div>;
    }

    if (loading) {
        return <div>Loading...</div>
    }

    if (!comments) {
        return <div>There are no comments</div>
    }

    // Display most recent 10 comments

    return (
        <div className="CommentsContainer">
            <CreateComment post_id={post_id} handleNew={handleNew} navigate={navigate}/>
            <div className="IndexComments">
                <h4>Comments</h4>
                {
                    comments.map((comment) => {
                        return <div key={comment.id} className='Comment'>
                            <Avatar src={user?.image_url} alt="" className='UserAvatar'/>
                            <div className="CommentInfo">
                                <div className="CommentTitle">
                                    <p className='CommentUser'>{comment.user.username}</p>
                                    {
                                        user !== undefined && comment.user_id === user.id
                                            ? <CrudMenu handleEditState={() => handleEdit(comment)} handleDelete={() => handleDelete(comment)} mediaType="comment"/>
                                            : <></>
                                    }
                                </div>
                                {
                                    !edit[comment.id]
                                        ? <p className='CommentBody'>{comment.content}</p>
                                        : <UpdateComment comment={comment} handleEditState={handleEdit} handleChange={handleChange} navigate={navigate}/>

                                }
                            </div>
                        </div>
                    })
                }
            </div>
        </div>
    )
}

export default IndexComments;
