import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav>
            <ul>
                <li><Link to="/">Top Users</Link></li>
                <li><Link to="/trending">Trending Posts</Link></li>
                <li><Link to="/feed">Live Feed</Link></li>
            </ul>
        </nav>
    );
};

export default Navbar;
