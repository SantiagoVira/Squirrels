import React, { useState, useEffect } from "react";
import api from "../../api";
import { Link } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import AddRoundedIcon from "@material-ui/icons/AddRounded";

import "./Uploads.css";
import Card from "../../Card/Card.js";

function Uploads(props) {
    const [currentPosts, setCurrentPosts] = useState([]);
    const [posts, setPosts] = useState(null);
    const [isBottom, setIsBottom] = useState(false);
    const [backVisible, setBackVisible] = useState(false);
    const [replies, setReplies] = useState(null);
    const user = props.user;

    useEffect(() => {
        const loadPosts = async () => {
            try {
                const Userid = new URL(props.page).searchParams.get("user");
                const Replyid = new URL(props.page).searchParams.get("replies");

                setReplies(Replyid);
                //Get posts by user if querystring is provided
                if (Userid) {
                    const response = await api.get(
                        `/api/users/${Userid}/posts`
                    );
                    setPosts(response.data.results);
                    setBackVisible(true);
                } else if (Replyid) {
                    const response = await api.get(
                        `/api/SquirreLogs/${Replyid}/replies`
                    );
                    setPosts(response.data.results);
                    setBackVisible(true);
                } else {
                    loadAllPosts();
                }
            } catch (err) {
                setPosts([]);
            }
        };
        loadPosts();
    }, [props.page]);

    //Infinite Scrolling
    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        if (isBottom && posts) {
            //Add the stuff
            const index = currentPosts.length + 1;
            setCurrentPosts([
                ...currentPosts,
                ...posts.slice(index, index + 20),
            ]);
            setIsBottom(false);
        }
    }, [isBottom]);

    function handleScroll() {
        const scrollTop =
            (document.documentElement && document.documentElement.scrollTop) ||
            document.body.scrollTop;
        const scrollHeight =
            (document.documentElement &&
                document.documentElement.scrollHeight) ||
            document.body.scrollHeight;
        if (scrollTop + window.innerHeight + 200 >= scrollHeight) {
            setIsBottom(true);
        }
    }

    const loadAllPosts = async () => {
        let response = await api.get("/api/SquirreLogs/uploads/");
        let d = [...response.data.results];
        setPosts(d);
        setCurrentPosts(d);
        while (response.data.next) {
            response = await api.get(response.data.next);
            d = [...d, ...response.data.results];
            setPosts(d);
        }
        setBackVisible(false);
    };

    const loadByHashtag = async (name) => {
        try {
            const topicResponse = await api.get("/api/Topics/");
            //This will NOT attempt to find hashtags with '#'
            const foundTopic = topicResponse.data.results.find(
                (topic) =>
                    topic.topic_name.toString().trim() ===
                    name.toString().replace("#", "").trim()
            );

            //Detail route returns topic info and list of associated logs
            let logResponse = await api.get(foundTopic.SquirreLogs);
            setPosts(logResponse.data.results);
            while (logResponse.data.next !== null) {
                logResponse = await api.get(logResponse.data.next);
                setPosts([...posts, ...logResponse.data.results]);
            }
            setBackVisible(true);
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

    const renderPosts = () => {
        if (!posts) {
            return (
                <div className="loaderWrapper">
                    <CircularProgress color="inherit" />
                </div>
            );
        } else if (posts.length === 0) {
            return <div>No posts were found.</div>;
        } else {
            return posts
                .filter((post) => {
                    return post.replying_to.length === 0;
                })
                .map((post) => {
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
                });
        }
    };

    return (
        <div className="posts">
            {backVisible && (
                <Link to="/" onClick={() => loadAllPosts()}>
                    <ExitToAppIcon className="exitSpecialCardsIcon" />
                </Link>
            )}
            {replies && (
                <button className="RepliesAddReply">
                    <AddRoundedIcon />
                    Reply
                </button>
            )}
            {renderPosts()}
        </div>
    );
}

export default Uploads;
