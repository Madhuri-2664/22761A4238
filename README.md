# 📊 Social Media Analytics Frontend Web App

This is a **React-based frontend application** that provides **real-time analytical insights** using **social media APIs**. The application displays **top users, trending posts, and a live feed** with dynamic updates.

---

## 🚀 Features

✅ **Top Users** – Displays the top 5 users with the highest number of posts.  
✅ **Trending Posts** – Shows posts with the **most comments**.  
✅ **Live Feed** – Automatically updates and fetches new posts every **5 seconds**.  
✅ **Responsive UI** – Built using **Bootstrap/Tailwind CSS** for a modern look.  
✅ **API Integration** – Fetches **users, posts, and comments** dynamically.  

---

## 📂 Folder Structure

social-media-analytics/
│── public/                 # Public assets
│   ├── index.html          # Main HTML file
│   ├── favicon.ico         # Favicon
│   └── assets/             # Store images if needed
│
│── src/                    # Main application source code
│   ├── api/                # API calls
│   │   ├── api.js          # API service file
│   │
│   ├── components/         # Reusable UI components
│   │   ├── Navbar.js       # Navigation bar
│   │   ├── PostCard.js     # Component for displaying a post
│   │
│   ├── pages/              # Application pages
│   │   ├── TopUsers.js     # Displays top users
│   │   ├── TrendingPosts.js# Displays trending posts
│   │   ├── Feed.js         # Displays live feed
│   │
│   ├── styles/             # CSS styles
│   │   ├── App.css         # Main styles
│   │   ├── TopUsers.css    # Styles for TopUsers
│   │   ├── TrendingPosts.css # Styles for TrendingPosts
│   │   ├── Feed.css        # Styles for Feed
│   │
│   ├── App.js              # Main App component
│   ├── index.js            # Renders the app
│   ├── routes.js           # Route configuration (optional)
│
│── package.json            # Project metadata and dependencies
│── tailwind.config.js      # Tailwind CSS configuration (if using Tailwind)
│── .gitignore              # Files to ignore in Git
│── README.md               # Project documentation
