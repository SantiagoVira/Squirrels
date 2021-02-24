import api from "../api";
import React, { useEffect, useState } from "react";
import "./Card.css";
import IconButton from "@material-ui/core/IconButton";
import CodeIcon from "@material-ui/icons/Code";
import DeleteIcon from "@material-ui/icons/Delete";
import CreateIcon from "@material-ui/icons/Create";
import { Redirect } from "react-router-dom";
import Row from "../Row";
import Col from "../Col";

function Card({ post, onDelete, user, changeUser, enableVoting }) {
    //When we call the card component, pass the id to access it on the server
    const [votes, setVotes] = useState(post.votes);
    const [copied, setCopied] = useState("Copy Embed Link");
    const [redirect, setRedirect] = useState();
    const [voteType, setVoteType] = useState("none");
    const [story, setStory] = useState(post.note);
    const [editing, setEditing] = useState(false);

    useEffect(() => {
        if(enableVoting) {
            if (user.profile && user.profile.liked_posts.includes(post.id)) {
                setVoteType("liked");
            }
            if (!user.profile) {
                setVoteType("none");
            }
        }
    }, [user]);

    async function vote(id) {
        if (!user.isLoggedIn) {
            setRedirect(<Redirect to="/login" />);
        }
        try {
            //Set card's votes in the database to votes variable
            const response = await api.put(`/api/SquirreLogs/${id}/vote/`);

            // Change user's liked posts on the frontend
            changeUser({
                ...user,
                profile: response.data.user,
            });
            setVotes(response.data.log.votes);
            setVoteType(response.data.result);
        } catch (err) {}
    }

    function unique() {
        return Math.floor(
            Math.random() * Math.floor(Math.random() * Date.now())
        ).toString();
    }

    function getPosition(string, subString, index) {
        return string.split(subString, index).join(subString).length;
    }
    function GetEmbedLink() {
        return (
            <div className="tooltip">
                <IconButton
                    className="copier"
                    onMouseOut={() => {
                        setCopied("Copy Embed Link");
                    }}
                    onClick={() => {
                        setCopied("Copied!");
                        navigator.clipboard.writeText(
                            `<iframe src="${
                                window.location.href.slice(
                                    0,
                                    getPosition(window.location.href, "/", 3)
                                ) + `/card/${post.id}`
                            }" title="Sqrrlz Card" />`
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
        return (
            <div 
                onClick={() => vote(props.id, props.class)}
                className={`voteBtn up ${voteType}`}
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
                        topic = topic.topic_name ? topic.topic_name : topic;
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
            {!post.gallery ? (
                <div className="leftSideWrapper">
                    <div className="buttons">
                        <Arrow class="up" id={post.id} />
                        <p className="votes">{votes}</p>
                    </div>
                    {
                        /*onDelete &&
                    user.profile &&
                    post.owner == user.profile.id*/ true ? (
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
                        ) : null
                    }
                    <GetEmbedLink />
                </div>
            ) : null}
            <div>
                <br />
                <p
                    contentEditable={editing}
                    className={`CardStory ${editing ? "StoryIsEditable" : ""}`}
                >
                    {story}
                </p>
                {/* Renders delete button only if this component is passed onDelete */}

                {redirect}
            </div>
            <Hashtags className="HashtagsRow">
                {post.SquirrelTopics ? post.SquirrelTopics : post.topics}
            </Hashtags>
        </div>
    );
}

export default Card;
