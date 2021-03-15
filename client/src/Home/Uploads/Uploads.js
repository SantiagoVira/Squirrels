import React, { useState, useEffect } from "react";
import api from "../../api";

import "./Uploads.css";
import Card from "../../Card/Card.js";

function Uploads(props) {
    const [posts, setPosts] = useState([]);
    const user = props.user;

    useEffect(() => {
        loadPosts();
    }, [props.match]);

    //Loads all custom posts (excluding user 1)
    const loadPosts = async () => {
        try {
            const params = new URLSearchParams(props.match.location.search);
            //Get posts by user if querystring is provided
            if(params.get("user")) {
                const response = await api.get(
                    `/api/users/${props.user.profile.id}/posts`
                );
                setPosts(response.data.results)
                props.changeShowBackButton(true);
            } else {
                let response = await api.get("/api/SquirreLogs/uploads/");
                let tmp_posts = [...response.data.results];
                while (response.data.next !== null) {
                    response = await api.get(response.data.next);
                    tmp_posts.push(...response.data.results);
                }
                setPosts(tmp_posts);
                props.changeShowBackButton(false);
            }
        } catch(err) {}
    };

    const loadByHashtag = async (name) => {
        try {
            const topicResponse = await api.get("/api/Topics/");
            //Since topics are unique, you can find exactly one matching topic
            //Note: this will NOT attempt to find hashtags with '#', since they are broken and pointless
            const foundTopic = topicResponse.data.results.find(topic => (
                topic.topic_name.toString().trim() ===
                name.toString().replace("#", "").trim()
            ))
            
            //Detail route returns topic info and list of associated logs
            let logResponse = await api.get(foundTopic.SquirreLogs);
            let tmp_posts = logResponse.data.results;
            while (logResponse.data.next !== null) {
                logResponse = await api.get(logResponse.data.next);
                tmp_posts = [...tmp_posts, ...logResponse.data.results];
            }
            setPosts(tmp_posts);
            props.changeShowBackButton(true);
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
                        story={post}
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
