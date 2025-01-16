import { FormControl, InputAdornment, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import SearchIcon from '@mui/icons-material/Search';
import axios from "axios";
import { Category } from "../../interfaces";

export default function SearchBar() {
    const API_URL: string | undefined = import.meta.env.VITE_API_URL;
    const [search, setSearch] = useState<string>("")
    const [categoryID, setCategoryID] = useState<number | undefined>();
    const [categories, setCategories] = useState<Category[]>([]);
    const [searchParams, setSearchParams] = useSearchParams();

    function handleSearch(event: any) {
        event.preventDefault()

        const newParams = new URLSearchParams(searchParams); // Clone existing params
        newParams.set("q", search); // Add or update the "q" parameter
        newParams.set("category_id", String(categoryID))
        setSearchParams(newParams); // Update the URL with the new parameters

        setSearch("");
    }

    // Fetch categories data on mount
    useEffect(() => {
        axios.get(`${API_URL}/categories`)
            .then(response => {setCategories(response.data)})
    }, [])

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
            label="Search Forum"
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
        {/* <InputLabel id="category-select-label" sx={{ whiteSpace: "nowrap" }}></InputLabel>
        <Select
            className="Select"
            labelId="category-select-label"
            id="category-select"
            value={categoryID}
            onChange={(e) => setCategoryID(Number(e.target.value))}
        >
            {categories.map((category) => (
            <MenuItem value={category.id} key={category.id}>
                {category.name}
            </MenuItem>
            ))}
        </Select> */}
    </FormControl>
}