import React from "react";
import "./Person.css";

function Person(props) {
    return (
        <div>
            <div className="white">
                <div
                    className={
                        props.square ? "sqrImgWrapper" : "rectImgWrapper"
                    }
                >
                    <img src={props.src} alt={props.name} />
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
