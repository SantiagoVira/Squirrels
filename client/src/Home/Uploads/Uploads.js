import React, { useState, useEffect } from "react";
import api from "../../api";
import axios from "axios";

import "./Uploads.css";
import Card from "../../Card/Card.js";

function Uploads() {
    const [posts, setPosts] = useState([]);

    useEffect(async () => {
        // Changed some paths in backend
        const response = await axios.get('http://localhost:8000/api/SquirreLogs/');

        // If you want to comment those paths back, this is what was here before:
        // const response = await axios.get("http://localhost:8000/api/logs/");
        setPosts(response.data);
    }, []);

    const delete_log = async (id) => {
        await api.delete(`/api/log/${id}/`);
        setPosts(posts.filter(post => post.id !== id))
    }

    return (
        <div className="posts">
            {posts.map((post) => {
                return <Card post={post} key={post.id} onDelete={delete_log} />;
            })}
            <h1>Posts go here</h1>
        </div>
    );
}

export default Uploads;
