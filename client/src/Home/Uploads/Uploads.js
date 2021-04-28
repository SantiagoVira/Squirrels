import React, { useState, useEffect } from "react";
import api from "../../api";
import { Link } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

import "./Uploads.css";
import Card from "../../Card/Card.js";

function Uploads(props) {
    const [posts, setPosts] = useState(null);
    const [next, setNext] = useState(null);
    const [isBottom, setIsBottom] = useState(false);
    const [backVisible, setBackVisible] = useState(false);

    useEffect(() => {
        const loadPosts = async () => {
            try {
                const userId = new URL(props.page).searchParams.get("user");
                //Get posts by user if querystring is provided
                userId ? getPosts(userId, "user") : getPosts();
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
        const getNext = async () => {
            if (isBottom && next) {
                const response = await api.get(next);
                setPosts([...posts, ...response.data.results]);
                setNext(response.data.next);
                setIsBottom(false);
            }
        };
        getNext();
    }, [isBottom]);

    useEffect(() => {
        const getNext = async () => {
            if (isBottom && next) {
                const response = await api.get(next);
                setPosts([...posts, ...response.data.results]);
                setNext(response.data.next);
                setIsBottom(false);
            }
        };
        getNext();
    }, [isBottom]);

    const getPosts = async (query, key) => {
        let response;
        if(key === "user") {
            response = await api.get(`/api/users/${query}/posts/`);
            setBackVisible(true);
        } else if(key === "hashtag") {
            response = await api.get(`/api/SquirreLogs/uploads?hashtag=${query}`);
            setBackVisible(true);
        } else {
            response = await api.get("/api/SquirreLogs/uploads/");
            setBackVisible(false);
        }
        setPosts(response.data.results);
        setNext(response.data.next);
    };

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

    const deleteLog = async (deletedPost) => {
        try {
            if (window.confirm("Are you sure you want to delete this post?")) {
                await api.delete(`/api/SquirreLogs/${deletedPost.id}/`);
                setPosts(posts.filter((post) => post.id !== deletedPost.id));

                // Updates user's post count
                if(props.user.profile.id === deletedPost.owner) {
                    props.getCounts()
                }
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
            return posts.map((post) => {
                return (
                    <Card
                        story={post}
                        key={post.id}
                        onDelete={deleteLog}
                        user={props.user}
                        changeUser={props.changeUser}
                        findHashtag={(hashtag) =>
                            getPosts(hashtag.slice(1), "hashtag")
                        }
                    />
                );
            });
        }
    };

    return (
        <div className="posts">
            {backVisible && (
                <Link to="/" onClick={getPosts}>
                    <ExitToAppIcon className="exitSpecialCardsIcon" />
                </Link>
            )}
            {renderPosts()}
        </div>
    );
}

export default Uploads;
