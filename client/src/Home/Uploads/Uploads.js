import React, { useState, useEffect } from "react";
import api from "../../api";

import "./Uploads.css";
import Card from "../../Card/Card.js";

function Uploads() {
    const [posts, setPosts] = useState([]);

    useEffect(async () => {
        try {
            const response = await api.get("/api/logs/");
            setPosts(response.data);
        } catch(err) {}
    }, []);

    const delete_log = async (id) => {
        try {
            await api.delete(`/api/log/${id}/`);
            setPosts(posts.filter((post) => post.id !== id));
        } catch(err) {}
    };

    return (
        <div className="posts">
            {posts.map((post) => {
                return <Card post={post} key={post.id} onDelete={delete_log} />;
            })}
            <h1>Posts go here</h1>
            <h1>Posts go here</h1>
            <h1>Posts go here</h1>
            <h1>Posts go here</h1>
            <h1>Posts go here</h1>
            <h1>Posts go here</h1>
            <h1>Posts go here</h1>
            <h1>Posts go here</h1>
            <h1>Posts go here</h1>
            <h1>Posts go here</h1>
            <h1>Posts go here</h1>
            <h1>Posts go here</h1>
            <h1>Posts go here</h1>
            <h1>Posts go here</h1>
            <h1>Posts go here</h1>
            <h1>Posts go here</h1>
            <h1>Posts go here</h1>
            <h1>Posts go here</h1>
            <h1>Posts go here</h1>
            <h1>Posts go here</h1>
            <h1>Posts go here</h1>
            <h1>Posts go here</h1>
            <h1>Posts go here</h1>
            <h1>Posts go here</h1>
            <h1>Posts go here</h1>
            <h1>Posts go here</h1>
            <h1>Posts go here</h1>
            <h1>Posts go here</h1>
            <h1>Posts go here</h1>
            <h1>Posts go here</h1>
            <h1>Posts go here</h1>
            <h1>Posts go here</h1>
            <h1>Posts go here</h1>
            <h1>Posts go here</h1>
            <h1>Posts go here</h1>
            <h1>Posts go here</h1>
            <h1>Posts go here</h1>
            <h1>Posts go here</h1>
            <h1>Posts go here</h1>
            <h1>Posts go here</h1>
        </div>
    );
}

export default Uploads;
