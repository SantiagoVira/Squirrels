import React, { useState, useEffect } from "react";
import axios from "axios";

import "./Uploads.css";
import Card from "../../Card/Card.js";

function Uploads() {
    const [posts, setPosts] = useState([]);

    useEffect(async () => {
        const response = await axios.get("http://localhost:8000/api/logs/");
        setPosts(response.data);
    }, []);

    return (
        <div className="main">
            {posts.map((post) => {
                return (
                    <Card title={post.topic} content={post.note} />
                );
            })}
        </div>
    );
}

export default Uploads;
