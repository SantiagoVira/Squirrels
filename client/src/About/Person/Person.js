import React from "react";
import "./Person.css";

function Person(props) {
    return (
        <div>
            <div className="white">
                <div className="rectImgWrapper">
                    <img
                        src={props.src}
                        alt={props.name}
                        className={props.side}
                    />
                </div>
                <br />
                <div className="name">
                    <b>{props.name}</b>
                </div>
                <p className="quote">"{props.desc}"</p>
            </div>
        </div>
    );
}

export default Person;
