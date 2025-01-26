import { Avatar, Button, FormControl, IconButton, InputAdornment, TextField, Tooltip } from "@mui/material";
import { useUser } from "./contexts/UserContext";
import { useEffect, useState } from "react";
import axios from "axios";
import { AccountCircle } from "@mui/icons-material";
import SideBar from "./SideBar";
import "../styles/Profile.css"

export default function Setting() {
    const API_URL: string | undefined = import.meta.env.VITE_API_URL;
    const {user, setUser} = useUser();
    const [image, setImage] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | undefined>(user?.image_url);

    
    async function handleUpdateProfile(e: React.FormEvent) {
        e.preventDefault();

        if (!user) {
            return
        }
    
        // Image cannot be sent as json file, instead append to formData
        const formData = new FormData();
        formData.append("user[username]", user.username);
        if (image) {
            formData.append("user[image]", image);
        }

        // Get token to verify current user to authorize updating comment data
        const token = localStorage.getItem('auth_token');

        try {
            const response = await axios.patch(`${API_URL}/signup`, formData, {
                headers: {
                    Authorization: `${token}`,
                },
            });
    
            setUser(response.data.data);
        } catch (error) {
        }
    }

    useEffect(() => {
        if (image) {
            const objectUrl = URL.createObjectURL(image);
            setPreview(objectUrl);
      
            // Cleanup URL
            return () => URL.revokeObjectURL(objectUrl);
          } else {
            setPreview(user?.image_url);
          }
    }, [image, user?.image_url]);

    if (!user) {
        return <div>
            Nothing to change here
        </div>
    }

    return <>
        <div className="MainContainer">
            <SideBar/>
            <div className="Content">
                <div className="SettingContainer">
                    <h1>Setting</h1>
                    <h2>Edit user information</h2>
                    <FormControl
                        className="Form Setting"
                        component="form" // Ensures this acts as a form element
                        onSubmit={handleUpdateProfile}
                        sx={{
                            m: 1,
                            minWidth: 200,
                            display: { xs: 'none', sm: 'flex' },
                            flexDirection: "row",
                            gap: 2,
                            alignItems: "center",
                        }
                    }
                    >

                        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <Tooltip title="Change Avatar">
                                <IconButton component="label">
                                <Avatar src={preview} sx={{ width: 150, height: 150 }}></Avatar>

                                {/* Hidden File Input */}
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={e => setImage(e.target.files?.[0] || null)}
                                    style={{ display: "none" }}
                                />
                                </IconButton>
                            </Tooltip>
                        </div>

                        <TextField
                            className="CustomTextField"
                            id="usernamebox"
                            label="Update Username"
                            value={user.username}
                            onChange={e => setUser({...user, username: e.target.value})}
                            slotProps={{
                            input: {
                                startAdornment: (
                                <InputAdornment position="start">
                                    <AccountCircle />
                                </InputAdornment>
                                ),
                            },
                            }}
                            variant="outlined"
                        />

                        <Button type="submit">Update</Button>
                    </FormControl>
                </div>
            </div>
        </div>
    </>
}