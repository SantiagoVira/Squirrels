import React, { useState, useEffect } from "react";
import api from "../../api";

import "./Uploads.css";
import Card from "../../Card/Card.js";

function Uploads(props) {
    const [posts, setPosts] = useState([]);
    const [hashtagSearching, setHashtagSearching] = useState(false);
    const [MeSearching, setMeSearching] = useState(false);
    const user = props.user;

    useEffect(() => {
        loadAllPosts();
    }, []);

    useEffect(() => {
        if (props.searching) {
            loadByMe();
        }
    }, [props.searching]);
    useEffect(() => {
        if (!props.special) {
            loadAllPosts();
        }
    }, [props.special]);

    //Loads all custom posts (excluding user 1)
    const loadAllPosts = async () => {
        try {
            const response = await api.get("/api/NoOneSquireLogs/");
            setPosts(response.data.results);
        } catch (err) {}
    };

    const loadByHashtag = async (name) => {
        try {
            if (!hashtagSearching) {
                const topicResponse = await api.get("/api/Topics/");
                const topics = topicResponse.data.results;

                for (let i = 0; i < topics.length; i++) {
                    if (
                        topics[i].topic_name
                            .toString()
                            .replace("#", "")
                            .trim() === name.toString().replace("#", "").trim()
                    ) {
                        const logResponse = await api.get(
                            topics[i].SquirreLogs
                        );
                        setPosts(logResponse.data.results);
                        setHashtagSearching(true);
                        props.setSpecial(true);
                    }
                }
            } else {
                loadAllPosts();
                setHashtagSearching(false);
            }
        } catch (err) {
            console.log(err);
        }
    };
    const loadByMe = async () => {
        try {
            if (!MeSearching) {
                const MyApi = await api.get(
                    `/api/users/${props.user.profile.id}/`
                );
                const MyPosts = MyApi.data.results;
                setPosts(MyPosts);
                setMeSearching(true);
                props.setSpecial(true);
            } else {
                loadAllPosts();
                setMeSearching(false);
            }
        } catch (err) {
            console.log(err);
        }
    };

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
