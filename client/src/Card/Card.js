import api from "../api";
import React, { useState, useEffect } from "react";
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
import { Link } from "react-router-dom";

// Don't fetch from this component. Add them to the serializer instead!
function Card({
    story,
    onDelete,
    user,
    changeUser,
    disableCardMenu,
    findHashtag,
    disableUsername,
}) {
    //When we call the card component, pass the id to access it on the server
    const [post, setPost] = useState(story);
    const [copied, setCopied] = useState("Copy Embed Link");
    const [editing, setEditing] = useState(false);
    const [editValue, setEditValue] = useState(story.note);

    async function vote() {
        if (!user.isLoggedIn) {
            history.push("/login");
        }

        try {
            //Set card's votes in the database to votes variable
            const response = await api.put(`/api/SquirreLogs/${post.id}/vote/`);

            setPost(response.data.log);
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
                                className="hashtagWrappper pointerOnHover"
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

    if (!post) {
        return null;
    }

    return (
        <div className="squirrelCard">
            {/* Left-side Menu */}
            {!disableCardMenu ? (
                <div className="leftSideWrapper">
                    <div className="buttons">
                        <IconButton
                            className={`editOrDeleteButton up ${
                                post.liked ? "liked" : ""
                            }`}
                            onClick={() => vote()}
                        >
                            <FavoriteIcon className="up" />
                        </IconButton>
                        <p className="votes">{post.votes}</p>
                    </div>
                    {onDelete &&
                        user.isLoggedIn &&
                        user.profile &&
                        post.owner === user.profile.id && (
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
                        )}
                    <GetEmbedLink />
                </div>
            ) : null}

            {/* Post Content and Owner */}
            <Col>
                {disableUsername ? (
                    <h4>Archive</h4>
                ) : (
                    <Link
                        to={`/?user=${post.owner}`}
                        className="CardUsername pointerOnHover"
                    >
                        <Row>
                            {post.owner_details.pfp && (
                                <img
                                    src={post.owner_details.pfp}
                                    alt=""
                                    className="pfp"
                                />
                            )}
                            <h4>{post.owner_details.username}</h4>
                        </Row>
                    </Link>
                )}
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
            </Col>

            {/* Hashtags */}
            <Hashtags className="HashtagsRow">{post.SquirrelTopics}</Hashtags>
        </div>
    );
}

export default Card;
