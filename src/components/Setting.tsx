import { Button, FormControl, InputAdornment, MenuItem, Select, styled, TextField } from "@mui/material";
import { useUser } from "./contexts/UserContext";
import { useState } from "react";
import axios from "axios";
import { AccountCircle } from "@mui/icons-material";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

export default function Setting() {
    const API_URL: string | undefined = import.meta.env.VITE_API_URL;
    const {user, setUser} = useUser();
    const [image, setImage] = useState<FileList | null>();

    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
      });

    if (!user) {
        return <div>
            Nothing to change here
        </div>
    }
    
    async function handleUpdateProfile(e: React.FormEvent) {
        e.preventDefault();

        if (!user) {
            return
        }
    
        // Image cannot be sent as json file, instead append to formData
        const formData = new FormData();
        formData.append("user[username]", user.username);
        if (image) {
            formData.append("user[image]", image[0]);
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

    return <div className="SettingContainer">
            <h1>Setting</h1>
            <h2>Edit user information</h2>

            <FormControl
                className="Form"
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
                <TextField
                    className="TextField"
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

                <Button
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<CloudUploadIcon />}
                >
                Upload files
                <VisuallyHiddenInput
                    type="file"
                    onChange={e => setImage(e.target.files)}
                    multiple
                />
                </Button>

                <Button type="submit">Update</Button>
            </FormControl>
            {/* <Select
            >
                <MenuItem>1</MenuItem>
            </Select> */}
        </div>
}