import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./User.css";
import Row from "../../Row";
import Col from "../../Col";
import api from "../../api";

import Avatar from "react-avatar-edit";

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
    const [preview, setPreview] = useState(null);
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

    function onClose() {
        setPreview(null);
    }

    function onCrop(preview) {
        setPreview(preview);
    }

    function onBeforeFileLoad(elem) {
        if (elem.target.files[0].size > 716800) {
            alert("File is too big!");
            elem.target.value = "";
        }
    }

    const onAvatarSubmit = () => {
        api.patch(`/api/users/${props.user.profile.id}/`, {avatar: preview});
    }

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
                        <img 
                            src={props.user.profile.avatar} 
                            alt={props.user.profile.username.slice(0, 1).toUpperCase()}
                        />
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
                    <Link to="/about" className="AboutTextLink">
                        ⋅ About ⋅
                    </Link>
                    <Avatar
                        width={200}
                        height={200}
                        onCrop={onCrop}
                        onClose={onClose}
                        onBeforeFileLoad={onBeforeFileLoad}
                        labelStyle={{ color: "#fae9cf" }}
                    />
                    <button onClick={() => onAvatarSubmit()}>
                        Submit
                    </button>
                    <img src={preview} alt="" />
                </Col>
            </Row>
        </div>
    );
}

export default User;
