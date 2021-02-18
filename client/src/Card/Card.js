import api from "../api";
import React, { useState } from "react";
import "./Card.css";

function Card({ post }) {
    //When we call the card component, pass the id to access it on the server
    const [votes, setVotes] = useState(post.votes);

    async function vote(id, op) {
        if (id) {
            const upvote = op === "up" ? true : false;
            //Set card's votes in the database to votes variable
            const response = await api.put(
                "/api/vote/",
                { id: id, upvote: upvote }
            );
            setVotes(response.data.votes);
        }
    }

    function Arrow(props) {
        return (
            <div
                onClick={() => {
                    vote(props.id, props.class);
                }}
                className={"voteBtn " + props.class}
            ></div>
        );
    }

    return (
        <div className="squirrelCard">
            <h1>{post.topic}</h1>
            <p>{post.note}</p>
            {!post.gallery ? (
                <div className="buttons">
                    <div className="btnWrapper">
                        <Arrow class="up" id={post.id} />
                        <p className="votes">{votes}</p>
                        <Arrow class="down" id={post.id} />
                    </div>
                </div>
            ) : null}
        </div>
    );
}

export default Card;
