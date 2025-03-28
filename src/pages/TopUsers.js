useEffect(() => {
    const fetchTopUsers = async () => {
        try {
            const users = await getUsers();
            const posts = await getPosts();

            if (!Array.isArray(users)) throw new Error("Invalid user data");

            const userPostCount = users.map(user => ({
                ...user,
                postCount: posts.filter(post => post.userId === user.id).length
            }));

            setTopUsers(userPostCount.sort((a, b) => b.postCount - a.postCount).slice(0, 5));
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    fetchTopUsers();
}, []);
