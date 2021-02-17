import React, { useState } from "react";
import "./Card.css";

function Card(props) {
    //When we call the card component, pass the id to access it on the server
    const [votes, setVotes] = useState(1);

    function vote(id, op) {
        const changer = op === "up" ? 1 : -1;
        const newTotal = votes + changer;
        setVotes(newTotal);
        //access card at [id]
        //Set card's votes in the database to votes variable
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
            <h1>{props.title}</h1>
            <p>{props.content}</p>
            <div className="buttons">
                <div className="btnWrapper">
                    <Arrow class="up" id={props.id} />
                    <p className="votes">{votes}</p>
                    <Arrow class="down" id={props.id} />
                </div>
            </div>
        </div>
    );
}

export default Card;
