export interface Post {
    id: number;
    topic: string;
    content: string;
    created_at: Date;
    updated_at: Date;
    user_id: number;
    category_id: number;
    category: {
        name: string;
        id: number
    }
}

export interface PostData {
    post: {
        topic: string;
        content: string;
        category_id: number;
    }
}

export interface Comment {
    id: number;
    content: string;
    created_at: Date;
    updated_at: Date;
    user_id: number;
    post_id: number;
    user: {
        username: string
    }
}

export interface CommentData {
    comment: {
        content: string;
        post_id: number;
    }
}

export interface Category {
    id: number;
    name: string;
    description: string;
    created_at: string;
    updated_at: string;
}

export interface CategoryData {
    category: {
        name: string;
        description: string;
    }
}

export interface User {
    id: number;
    email: string;
    image_url?: string,
    username: string;
    created_at: string;
}

export interface AuthContextProps {
    loggedIn: boolean;
    setLoggedIn: (value: boolean) => void
}

export interface ThemeContextProps {
    isDarkMode: boolean;
    setIsDarkMode: (value: boolean) => void
}

export interface UserContextProps {
    user: User | undefined;
    setUser: (value: User | undefined) => void;
}