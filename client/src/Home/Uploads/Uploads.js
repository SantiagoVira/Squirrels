import React, { useState, useEffect } from "react";
import api from "../../api";

import "./Uploads.css";
import Card from "../../Card/Card.js";

function Uploads(props) {
    const [posts, setPosts] = useState([]);
    const user = props.user;

    useEffect(async () => {
        try {
            const response = await api.get("/api/SquirreLogs/");
            setPosts(response.data.filter((post) => post.owner > 1));
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
            {posts.reverse().map((post) => {
                return (
                    <Card
                        post={post}
                        key={post.id}
                        onDelete={delete_log}
                        user={user}
                        changeUser={props.changeUser}
                    />
                );
            })}
        </div>
    );
}

export default Uploads;
