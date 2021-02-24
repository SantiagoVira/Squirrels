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
            <Card
                post={{
                    topics: [{ topic_name: "Squirrel Poems" }],
                    note: `               There once was a squirrel named Ralph,
                Who wanted to live way down south,
                The park in the center
                Of the city to remember
                Finally has a census he can enter`,
                    votes: 42,
                }}
                key={13204930}
                onDelete={delete_log}
                user={user}
            />
            <Card
                post={{
                    topics: [{ topic_name: "Wise Quotes" }],
                    note: `"They say dont reinvent the wheel, but they never said don't reinvent the squirrel" Aramie Ewen 2.12.21`,
                    votes: 10,
                }}
                key={432325}
                onDelete={delete_log}
                user={user}
            />
            <Card
                post={{
                    topics: [{ topic_name: "Insights" }],
                    note: "Insquirrelgram. I like it.",
                    votes: 4,
                }}
                key={32223454}
                onDelete={delete_log}
                user={user}
            />
        </div>
    );
}

export default Uploads;
