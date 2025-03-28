import React, { useEffect, useState } from "react";
import { getPosts, getComments } from "../api/api";

const TrendingPosts = () => {
    const [trendingPosts, setTrendingPosts] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTrendingPosts = async () => {
            try {
                const postsResponse = await getPosts();
                const commentsResponse = await getComments();

                if (!postsResponse.data || !commentsResponse.data) {
                    throw new Error("Invalid API response");
                }

                const postCommentCount = postsResponse.data.map(post => ({
                    ...post,
                    commentCount: commentsResponse.data.filter(comment => comment.postId === post.id).length
                }));

                const maxComments = Math.max(...postCommentCount.map(post => post.commentCount), 0);
                const trending = postCommentCount.filter(post => post.commentCount === maxComments);

                setTrendingPosts(trending);
            } catch (err) {
                console.error("Error fetching trending posts:", err);
                setError("Failed to fetch trending posts.");
            }
        };

        fetchTrendingPosts();
    }, []);

    return (
        <div>
            <h2>Trending Posts</h2>
            {error ? <p style={{ color: "red" }}>{error}</p> : null}
            <ul>
                {trendingPosts.length > 0 ? (
                    trendingPosts.map(post => (
                        <li key={post.id}>{post.title} - {post.commentCount} comments</li>
                    ))
                ) : (
                    <p>No trending posts found.</p>
                )}
            </ul>
        </div>
    );
};

export default TrendingPosts;
