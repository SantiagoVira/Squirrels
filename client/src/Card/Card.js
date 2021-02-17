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
    return (
        <div className="squirrelCard">
            <h1>{props.title}</h1>
            <p>{props.content}</p>
            <div className="buttons">
                <div
                    onClick={() => {
                        vote(props.id, "up");
                    }}
                    className="up"
                ></div>
                <p className="votes">{votes}</p>
                <div
                    onClick={() => {
                        vote(props.id, "down");
                    }}
                    className="down"
                ></div>
            </div>
        </div>
    );
}

export default Card;
