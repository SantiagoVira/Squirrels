import React from "react";
import "./User.css";
import Row from "../../Row";
import Col from "../../Col";
import api from "../../api";

function User(props) {
    function getColor() {
        return (
            "hsl(" +
            360 * Math.random() +
            "," +
            (25 + 70 * Math.random()) +
            "%," +
            (85 + 10 * Math.random()) +
            "%)"
        );
    }
    const UserDataStyles = { fontSize: "20px", fontWeight: "500" };
    const pfpSize = getComputedStyle(document.documentElement)
        .getPropertyValue("--profileSize")
        .slice(0, -2)
        .trim();
    const pfpTxtSize = pfpSize / Math.sqrt(2);
    const user = {
        votes: 69,
        posts: 20,
    };
    return (
        <div className="user">
            <Row>
                <div
                    className="circular--portrait"
                    style={{ backgroundColor: getColor() }}
                >
                    <p style={{ fontSize: pfpTxtSize }}>
                        {props.user.profile.username.slice(0, 1).toUpperCase()}
                    </p>
                </div>
                <h1>{props.user.profile.username}</h1>
            </Row>
            <Row>
                <Col>
                    <p style={UserDataStyles}>
                        Total Votes: <strong>{user.votes}</strong>
                    </p>
                    <p style={UserDataStyles}>
                        Posts: <strong>{user.posts}</strong>
                    </p>
                </Col>
            </Row>
        </div>
    );
}

export default User;
