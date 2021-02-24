import React, { useEffect } from "react";
import "./User.css";
import Row from "../../Row";
import Col from "../../Col";
import api from "../../api";
import { useState } from "react";

function User(props) {
    const [user, setUser] = useState({ votes: "", posts: "" });
    useEffect(() => {
        const getUserData = async () => {
            if (!props.user.profile) {
                return null;
            }
            console.log(props.user.profile);
            const dbUserPerson = await api.get(
                `/api/SquirreLogs/${props.user.profile.id}/user`
            );
            const dbFormattedBullshit = JSON.parse(dbUserPerson.data).map(
                (object) => object.fields
            );
            await setUser({
                votes: dbFormattedBullshit
                    .map((post) => post.votes)
                    .reduce((a, b) => a + b, 0),
                posts: Object.keys(dbFormattedBullshit).length,
            });
            
        };
        getUserData();
    }, [props.user]);

    if (!props.user.profile) {
        return null;
    }

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
