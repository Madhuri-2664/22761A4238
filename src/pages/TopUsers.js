import React, { useEffect, useState } from "react";
import { getUsers, getPosts } from "../api/api";

const TopUsers = () => {
    const [topUsers, setTopUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTopUsers = async () => {
            try {
                const users = await getUsers();
                const posts = await getPosts();

                // Check if API data is valid
                if (!Array.isArray(users) || users.length === 0) {
                    throw new Error("No users found!");
                }
                if (!Array.isArray(posts) || posts.length === 0) {
                    throw new Error("No posts found!");
                }

                const userPostCount = users.map(user => ({
                    ...user,
                    postCount: posts.filter(post => post.userId === user.id).length
                }));

                setTopUsers(userPostCount.sort((a, b) => b.postCount - a.postCount).slice(0, 5));
                setLoading(false);
            } catch (error) {
                console.error("Error fetching users:", error);
                setError(error.message);
                setLoading(false);
            }
        };

        fetchTopUsers();
    }, []);

    return (
        <div className="top-users container">
            <h2>Top Users</h2>
            {loading && <p>Loading users...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}
            <ul>
                {topUsers.map(user => (
                    <li key={user.id} className="user-card">
                        <img src={user.avatar} alt={user.name} className="avatar" />
                        <div>
                            <h3>{user.name}</h3>
                            <p>{user.postCount} Posts</p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TopUsers;
