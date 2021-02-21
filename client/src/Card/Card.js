import api from "../api";
import React, { useState } from "react";
import "./Card.css";
import IconButton from "@material-ui/core/IconButton";
import CodeIcon from "@material-ui/icons/Code";
import { Redirect } from "react-router-dom";

function Card({ post, onDelete, isLoggedIn }) {
    //When we call the card component, pass the id to access it on the server
    const [votes, setVotes] = useState(post.votes);
    const [copied, setCopied] = useState("Copy Embed Link");
    const [redirect, setRedirect] = useState();

    async function vote(id, op) {
        if (!isLoggedIn) {
            setRedirect(<Redirect to="/login" />);
        }
        try {
            const currentVote = op === "up";
            //Set card's votes in the database to votes variable
            const response = await api.put(`/api/SquirreLogs/${id}/vote/`, {
                upvote: currentVote,
            });
            setVotes(response.data.votes);
        } catch (err) {}
    }

    function Arrow(props) {
        return (
            <div
                onClick={() => {
                    vote(props.id, props.class);
                }}
                className={"voteBtn " + props.class}
            >
                {props.children}
            </div>
        );
    }
    function getPosition(string, subString, index) {
        return string.split(subString, index).join(subString).length;
    }
    return (
        <div className="squirrelCard">
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <h1>{post.topic}</h1>
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
                                        getPosition(
                                            window.location.href,
                                            "/",
                                            3
                                        )
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
            </div>
            <br />
            <p style={{ whiteSpace: "pre-wrap" }}>{post.note}</p>
            {!post.gallery ? (
                <div className="buttons">
                    <div className="btnWrapper">
                        <Arrow class="up" id={post.id} />
                        <p className="votes">{votes}</p>
                        <Arrow class="down" id={post.id} />
                    </div>
                </div>
            ) : null}
            {/* Renders delete button only if this component is passed onDelete */}
            {onDelete && isLoggedIn ? (
                <button
                    className="deleteButton"
                    onClick={() => onDelete(post.id)}
                >
                    Delete
                </button>
            ) : null}
            {redirect}
        </div>
    );
}

export default Card;
