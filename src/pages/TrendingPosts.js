import React, { useEffect, useState } from "react";
import { getPosts, getComments } from "../api/api";

const TrendingPosts = () => {
    const [trendingPosts, setTrendingPosts] = useState([]);

    useEffect(() => {
        const fetchTrendingPosts = async () => {
            const posts = await getPosts();
            const comments = await getComments();

            const postCommentCount = posts.map(post => ({
                ...post,
                commentCount: comments.filter(comment => comment.postId === post.id).length
            }));

            const maxComments = Math.max(...postCommentCount.map(post => post.commentCount), 0);
            const trending = postCommentCount.filter(post => post.commentCount === maxComments);

            setTrendingPosts(trending);
        };

        fetchTrendingPosts();
    }, []);

    return (
        <div className="trending-posts container">
            <h2>Trending Posts</h2>
            {trendingPosts.length > 0 ? (
                <ul>
                    {trendingPosts.map(post => (
                        <li key={post.id} className="post-card">
                            <img src={post.image} alt="Trending Post" className="post-image" />
                            <h3>{post.title}</h3>
                            <p>{post.commentCount} Comments</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No trending posts found.</p>
            )}
        </div>
    );
};

export default TrendingPosts;
