import React, { useEffect, useState } from "react";
import { getPosts } from "../api/api";

const Feed = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchFeed = async () => {
            try {
                const postsResponse = await getPosts();
                if (!Array.isArray(postsResponse)) {
                    throw new Error("Invalid response format");
                }
                setPosts(postsResponse.sort((a, b) => new Date(b.date) - new Date(a.date)));
            } catch (error) {
                console.error("Error fetching feed:", error);
            }
        };

        fetchFeed();
        const interval = setInterval(fetchFeed, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="feed container">
            <h2>Live Feed</h2>
            {posts.length === 0 ? (
                <p>No posts available.</p>
            ) : (
                <ul>
                    {posts.map(post => (
                        <li key={post.id}>{post.title}</li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Feed;
