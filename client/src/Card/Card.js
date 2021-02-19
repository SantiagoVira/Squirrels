import api from "../api";
import React, { useState } from "react";
import "./Card.css";
import User from "../Home/User/User";

function Card({ post, onDelete}) {
    //When we call the card component, pass the id to access it on the server
    const [votes, setVotes] = useState(post.votes);

    async function vote(id, op) {
        try {
            const currentVote = op === "up";
            //Set card's votes in the database to votes variable
            const response = await api.put(
                `/api/log/${id}/`, 
                {upvote: currentVote}, 
            );
            setVotes(response.data.votes);
        } catch(err) {};
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
            {/* Renders delete button only if this component is passed onDelete */}
            {onDelete &&
                <button onClick={() => onDelete(post.id)}>Delete</button>
            }
        </div>
    );
}

export default Card;
