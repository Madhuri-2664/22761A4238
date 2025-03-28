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

                if (!postsResponse || !postsResponse.data || !commentsResponse || !commentsResponse.data) {
                    throw new Error("Invalid API response");
                }

                // Attach comment count and comments to each post
                const postData = postsResponse.data.map(post => ({
                    ...post,
                    image: post.image || `https://picsum.photos/seed/${post.id}/400/250`, // Random image if API doesn't provide one
                    comments: commentsResponse.data.filter(comment => comment.postId === post.id),
                    commentCount: commentsResponse.data.filter(comment => comment.postId === post.id).length
                }));

                // Find the maximum number of comments
                const maxComments = Math.max(...postData.map(post => post.commentCount), 0);
                
                // Get trending posts (posts with the highest number of comments)
                const trending = postData.filter(post => post.commentCount === maxComments);

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
            <h2>🔥 Trending Posts</h2>
            {error ? <p style={{ color: "red" }}>{error}</p> : null}
            <ul style={{ listStyle: "none", padding: 0 }}>
                {trendingPosts.length > 0 ? (
                    trendingPosts.map(post => (
                        <li key={post.id} style={{
                            background: "#fff",
                            padding: "15px",
                            marginBottom: "15px",
                            borderRadius: "8px",
                            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)"
                        }}>
                            <h3>{post.title}</h3>
                            <img 
                                src={post.image} 
                                alt={post.title} 
                                style={{ width: "100%", height: "auto", borderRadius: "5px" }} 
                            />
                            <p><strong>Comments: {post.commentCount}</strong></p>

                            {/* Display Comments */}
                            <ul style={{ padding: "10px", background: "#f9f9f9", borderRadius: "5px" }}>
                                {post.comments.length > 0 ? (
                                    post.comments.map(comment => (
                                        <li key={comment.id} style={{ padding: "5px 0" }}>
                                            <strong>{comment.name}:</strong> {comment.body}
                                        </li>
                                    ))
                                ) : (
                                    <li>No comments yet.</li>
                                )}
                            </ul>
                        </li>
                    ))
                ) : (
                    <p>No trending posts found.</p>
                )}
            </ul>
        </div>
    );
};

export default TrendingPosts;
