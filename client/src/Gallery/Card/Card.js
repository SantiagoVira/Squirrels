import React from "react";
import "./Card.css";

function Card(props) {
    return (
        <div className="squirrelCard">
            <h1>{props.title}</h1>
            <p>{props.content}</p>
        </div>
    );
}

export default Card;
