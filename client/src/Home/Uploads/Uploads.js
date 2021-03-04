import React, { useState, useEffect } from "react";
import api from "../../api";

import "./Uploads.css";
import Card from "../../Card/Card.js";

function Uploads(props) {
    const [posts, setPosts] = useState([]);
    const user = props.user;

    useEffect(async () => {
        try {
            const response = await api.get("/api/NoOneSquireLogs/");
            await setPosts(response.data.results);
        } catch (err) {}
    }, []);

    const loadPosts = async (Filter) => {
        try {
            const response = await api.get("/api/NoOneSquireLogs/");
            await setPosts(
                response.data.results.filter((post) => Filter(post))
            );
        } catch (err) {}
    };
    const loadByHashtag = async (post, name) => {
        try {
            const response = await api.get("/api/Topics/");
            response.some(async (topic) => {
                if (topic.topic_name === name) {
                    setPosts(topic.map((topicLink) => {}));
                }
            });
        } catch (err) {}
    };
    //loadPosts((post) => checkForHashtags(post, "Sqqrlz"));

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
                        user={user}
                        changeUser={props.changeUser}
                    />
                );
            })}
        </div>
    );
}

export default Uploads;
