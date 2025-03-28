import axios from "axios";

const API_BASE_URL = "http://localhost:3000"; // Ensure this is correct

// Fetch Users with Random Avatars
export const getUsers = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/users`);
        return response.data.map(user => ({
            ...user,
            avatar: `https://i.pravatar.cc/150?img=${user.id}` // Random avatar for each user
        }));
    } catch (error) {
        console.error("Error fetching users:", error);
        return [];
    }
};

// Ensure this is correct

export const getPosts = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/posts`);
        if (!response.data) throw new Error("No data received");
        return response.data; // Return data directly
    } catch (error) {
        console.error("Error fetching posts:", error);
        return []; // Return an empty array to avoid undefined errors
    }
};


// Fetch Comments
export const getComments = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/comments`);
        return response.data;
    } catch (error) {
        console.error("Error fetching comments:", error);
        return [];
    }
};
