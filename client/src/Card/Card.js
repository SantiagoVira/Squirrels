import api from "../api";
import React, { useState } from "react";
import "./Card.css";
import IconButton from "@material-ui/core/IconButton";
import CodeIcon from "@material-ui/icons/Code";
import DeleteIcon from "@material-ui/icons/Delete";
import CreateIcon from "@material-ui/icons/Create";
import Row from "../Row";
import Col from "../Col";
import history from "../history";

function Card({ post, onDelete, user, changeUser, disableCardMenu }) {
    //When we call the card component, pass the id to access it on the server
    const [votes, setVotes] = useState(post.votes);
    const [copied, setCopied] = useState("Copy Embed Link");
    const [editing, setEditing] = useState(false);

    async function vote(id) {
        if (!user.isLoggedIn) {
            history.push("/login");
        }
        try {
            //Set card's votes in the database to votes variable
            const response = await api.put(`/api/SquirreLogs/${id}/vote/?format=json`);

            // Change user's liked posts on the frontend
            changeUser({ ...user, profile: response.data.user });
            setVotes(response.data.log.votes);
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

    function Arrow(props) {
        const voteColor =
            user.profile && user.profile.liked_posts.includes(post.id)
                ? "liked"
                : "none";
        return (
            <div
                onClick={() => vote(props.id)}
                className={`voteBtn up ${voteColor}`}
            >
                {props.children}
            </div>
        );
    }

    function Hashtags(props) {
        return (
            <Row className={props.className}>
                {props.children &&
                    props.children.map((topic) => {
                        // Uses topic_name for home page uploads
                        console.log(topic.topic_name)
                        topic = typeof topic.topic_name != undefined ? topic.topic_name : topic;
                        console.log(topic);
                        return topic.trim() !== "" ? (
                            <div className="hashtagWrappper" key={unique()}>
                                <p>#{topic.trim()}</p>
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
                        <Arrow class="up" id={post.id} />
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

            <div>
                <br />
                <p
                    contentEditable={editing}
                    className={`CardStory ${editing ? "StoryIsEditable" : ""}`}
                >
                    {post.note}
                </p>
                {/* Renders delete button only if this component is passed onDelete */}
            </div>
            <Hashtags className="HashtagsRow">
                {post.SquirrelTopics}
            </Hashtags>
        </div>
    );
}

export default Card;
