import React, { useState, useEffect } from "react";
import api from "../../api";
import axios from "axios";

import "./Uploads.css";
import Card from "../../Card/Card.js";

function Uploads(props) {
    const [posts, setPosts] = useState([]);
    console.log(props);
    const isLoggedIn = props.user.isLoggedIn;

    useEffect(async () => {
        try {
            const response = await api.get("/api/SquirreLogs/");
            setPosts(response.data);
        } catch (err) {}
    }, []);

    const delete_log = async (id) => {
        try {
            if (window.confirm("Are you sure you want to delete this post?")) {
                await api.delete(`/api/SquirreLogs/${id}/`);
                setPosts(posts.filter((post) => post.id !== id));
            }
        } catch (err) {}
    };

    return (
        <div className="posts">
            {posts.map((post) => {
                return (
                    <Card
                        post={post}
                        key={post.id}
                        onDelete={delete_log}
                        isLoggedIn={isLoggedIn}
                    />
                );
            })}
            <Card
                post={{ topic: "Helo", note: "bye", votes: 1 }}
                key={13204930}
                onDelete={delete_log}
                isLoggedIn={isLoggedIn}
            />
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
