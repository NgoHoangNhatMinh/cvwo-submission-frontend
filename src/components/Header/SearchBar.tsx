import { Button, FormControl, InputAdornment, TextField } from "@mui/material";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import SearchIcon from '@mui/icons-material/Search';

export default function SearchBar() {
    const [search, setSearch] = useState<string>("")
    const [searchParams, setSearchParams] = useSearchParams();

    function handleSearch(event: any) {
        event.preventDefault()

        const newParams = new URLSearchParams(searchParams); // Clone existing params
        newParams.set("q", search); // Add or update the "q" parameter
        setSearchParams(newParams); // Update the URL with the new parameters

        setSearch("");
    }

    return <FormControl
        className="Form"
        component="form" // Ensures this acts as a form element
        onSubmit={handleSearch}
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
            id="searchbox"
            label="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            slotProps={{
            input: {
                startAdornment: (
                <InputAdornment position="start">
                    <SearchIcon />
                </InputAdornment>
                ),
            },
            }}
            variant="outlined"
        />
        <Button type='submit'>Search</Button>
    </FormControl>
}