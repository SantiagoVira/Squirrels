import React, { useState, useEffect, useRef } from "react";
import {Link} from "react-router-dom";
import "./User.css";
import Row from "../../Row";
import Col from "../../Col";
import api from "../../api";

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

function User(props) {
    const [userData, setUserData] = useState({ votes: "", posts: "" });
    const bgColor = useRef(getColor());

    useEffect(() => {
        const getUserData = async () => {
            if (!props.user.profile) {
                return null;
            }
            const response = await api.get(
                `/api/users/${props.user.profile.id}/posts/`
            );
            await setUserData({
                votes: response.data.total_votes,
                posts: response.data.count,
            });
        };
        getUserData();
    }, [props.user]);

    if (!props.user.profile) {
        return null;
    }

    const UserDataStyles = { fontSize: "20px", fontWeight: "500" };
    const pfpSize = getComputedStyle(document.documentElement)
        .getPropertyValue("--profileSize")
        .slice(0, -2)
        .trim();
    const pfpTxtSize = pfpSize / Math.sqrt(2);

    return (
        <div className="user">
            <Row>
                <div
                    className="circular--portrait"
                    style={{ backgroundColor: bgColor.current }}
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
                        Total Votes: <strong>{userData.votes}</strong>
                    </p>
                    <Link
                        className="link"
                        style={UserDataStyles}
                        to={`/?user=${props.user.profile.id}`}
                    >
                        Posts: <strong>{userData.posts}</strong>
                    </Link>
                </Col>
            </Row>
        </div>
    );
}

export default User;
