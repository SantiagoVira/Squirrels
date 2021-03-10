import api from "../api";
import React, { useEffect, useState } from "react";
import "./Card.css";
//Using this library because it fixes mouse movement bug
//More Info: https://stackoverflow.com/questions/47257519/react-contenteditable-cursor-jumps-to-beginning
import ContentEditable from "react-contenteditable";
import IconButton from "@material-ui/core/IconButton";
import CodeIcon from "@material-ui/icons/Code";
import DeleteIcon from "@material-ui/icons/Delete";
import CreateIcon from "@material-ui/icons/Create";
import FavoriteIcon from "@material-ui/icons/Favorite";
import Row from "../Row";
import Col from "../Col";
import history from "../history";

function Card({
    post,
    onDelete,
    user,
    changeUser,
    disableCardMenu,
    findHashtag,
}) {
    //When we call the card component, pass the id to access it on the server
    const [votes, setVotes] = useState(post.votes);
    const [liked, setLiked] = useState();
    const [copied, setCopied] = useState("Copy Embed Link");
    const [editing, setEditing] = useState(false);
    const [editValue, setEditValue] = useState(post.note);
    const [username, setUsername] = useState("");

    useEffect(() => {
        const getUserVote = async () => {
            if (user && user.isLoggedIn) {
                const response = await api.get(user.profile.liked_posts);
                //'Find' returns truthy if current post is found in liked posts
                setLiked(response.data.results.find(liked_post => liked_post.id === post.id));
            }
        }
        getUserVote();
    }, [user]);

    useEffect(() => {
        const getUsername = async () => {
            const data = await api.get(`/api/users/`);
            data.data.results.some((res) => {
                if (res.id === post.owner) {
                    setUsername(res.username);
                    return true;
                }
                return false;
            });
            return true;
        };
        getUsername();
    }, []);
    async function vote(id) {
        if (!user.isLoggedIn) {
            history.push("/login");
        }

        try {
            //Set card's votes in the database to votes variable
            const response = await api.put(
                `/api/SquirreLogs/${post.id}/vote/`
            );
            
            // Liked_by stores a list of user urls
            setLiked(response.data.log.liked_by.find(url => (
                url === response.data.user.url
            )));
            setVotes(response.data.log.votes);
            changeUser({ ...user, profile: response.data.user });
        } catch (err) {}
    }

    function unique() {
        return Math.floor(
            Math.random() * Math.floor(Math.random() * Date.now())
        ).toString();
    }

    function GetEmbedLink() {
        return (
            <div className="tooltip">
                <IconButton
                    className="copier"
                    onMouseOut={() => setCopied("Copy Embed Link")}
                    onClick={() => {
                        setCopied("Copied!");
                        navigator.clipboard.writeText(
                            `<iframe src="${window.location.origin}/card/${post.id}"
                            title="Sqrrlz Card" />`
                        );
                    }}
                >
                    <span className="tooltiptext" id="myTooltip">
                        {copied}
                    </span>
                    <CodeIcon className="codeIcon" />
                </IconButton>
            </div>
        );
    }

    function Hashtags(props) {
        return (
            <Row className={props.className}>
                {props.children &&
                    props.children.map((topic) => {
                        // Uses topic_name for home page uploads
                        topic =
                            typeof topic.topic_name != undefined
                                ? topic.topic_name
                                : topic;
                        return topic.trim() !== "" ? (
                            <div
                                className="hashtagWrappper"
                                key={unique()}
                                onClick={() => {
                                    if (findHashtag) {
                                        findHashtag(topic.trim());
                                    }
                                }}
                            >
                                <p>
                                    {topic.trim().startsWith("#") ? "" : "#"}
                                    {topic.trim()}
                                </p>
                            </div>
                        ) : null;
                    })}
            </Row>
        );
    }

    return (
        <div className="squirrelCard">
            {!disableCardMenu ? (
                <div className="leftSideWrapper">
                    <div className="buttons">
                        <IconButton
                            className={`editOrDeleteButton up ${
                                liked ? "liked" : ""
                            }`}
                            onClick={() => vote()}
                        >
                            <FavoriteIcon className="up" />
                        </IconButton>
                        <p className="votes">{votes}</p>
                    </div>
                    {onDelete &&
                    user.isLoggedIn &&
                    user.profile &&
                    post.owner === user.profile.id ? (
                        <Col>
                            <IconButton
                                className="editOrDeleteButton"
                                onClick={() => onDelete(post.id)}
                            >
                                <DeleteIcon />
                            </IconButton>
                            <IconButton
                                className="editOrDeleteButton"
                                onClick={() => setEditing(!editing)}
                            >
                                <CreateIcon />
                            </IconButton>
                        </Col>
                    ) : null}
                    <GetEmbedLink />
                </div>
            ) : null}

            <Col>
                <Row>
                    <h4>{username}</h4>
                </Row>

                <br />
                <Row>
                    <ContentEditable
                        className={`CardStory ${editing && "StoryIsEditable"}`}
                        disabled={!editing}
                        html={editValue || ""}
                        onChange={(e) =>
                            setEditValue(e.currentTarget.textContent)
                        }
                        onBlur={(e) =>
                            api.patch(`/api/SquirreLogs/${post.id}/`, {
                                note: e.currentTarget.textContent,
                            })
                        }
                    />
                </Row>
                {/* Renders delete button only if this component is passed onDelete */}
            </Col>

            <Hashtags className="HashtagsRow">{post.SquirrelTopics}</Hashtags>
        </div>
    );
}

export default Card;
