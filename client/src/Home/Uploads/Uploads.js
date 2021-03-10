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
            var response = await api.get("/api/SquirreLogs/uploads/");
            var tmp_posts = response.data.results;
            setPosts(tmp_posts);
            while (response.data.next !== null) {
                response = await api.get(response.data.next);
                setPosts([...tmp_posts, ...response.data.results]);
                tmp_posts = response.data.results;
            }
        } catch(err) {}
    };

    const loadByHashtag = async (name) => {
        try {
            if (!hashtagSearching) {
                const topicResponse = await api.get("/api/Topics/");
                //Since topics are unique, you can find exactly one match
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
                setHashtagSearching(true);
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
