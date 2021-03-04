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
            //loadByHashtag("abc");
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
    const loadByHashtag = async (name) => {
        try {
            const topicResponse = await api.get("/api/Topics/");
            const topics = topicResponse.data.results
            console.log(topics)
            for(var i = 0; i < topics; i++) {
                console.log("a")
                if (
                    topics[i].topic_name.toString().replace("#", "").trim() ===
                    name.toString().replace("#", "").trim()
                ) {
                    const logResponse = await api.get(topics[i].SquirreLogs);
                    console.log(logResponse)
                    if(i === 0) {
                        setPosts([topicResponse]);
                    } else {
                        setPosts([...posts, topicResponse]);
                    }
                }
            }
            // response.data.results.forEach((topic) => {
            //     if (
            //         topic.topic_name.toString().replace("#", "").trim() ===
            //         name.toString().replace("#", "").trim()
            //     ) {
            //         console.log(topic)
            //         doTheThing(topic);
            //     }
            // });
        } catch (err) {
            console.log(err);
        }
    };
    //loadPosts((post) => checkForHashtags(post, "Sqqrlz"));
console.log(posts)
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
                        findHashtag={loadByHashtag}
                    />
                );
            })}
        </div>
    );
}

export default Uploads;
