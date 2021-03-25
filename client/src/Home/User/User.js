import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./User.css";
import Row from "../../Row";
import Col from "../../Col";
import api from "../../api";

import Avatar from "react-avatar-edit";
import PublishIcon from "@material-ui/icons/Publish";

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
    const [pfpOp, setPfpOp] = useState(
        getComputedStyle(document.documentElement).getPropertyValue("--pfpOp")
    );
    const [pfpLoadSize, setPfpLoadSize] = useState(75);

    function onClose() {
        setPreview(null);
        setPfpLoadSize(75);
    }

    function onCrop(preview) {
        setPreview(preview);
    }

    function onBeforeFileLoad(elem) {
        if (elem.target.files[0].size > 255000) {
            alert("File is too big!");
            elem.target.value = "";
        } else {
            setPfpLoadSize(150);
        }
    }

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

    const onAvatarSubmit = () => {
        api.patch(`/api/users/${props.user.profile.id}/`, { avatar: preview });
    };

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
            <div
                className="UserBreakdownTopDiv"
                style={{ flexDirection: preview ? "column" : "row" }}
            >
                <div
                    className="circular--portrait"
                    onMouseEnter={() => {
                        setPfpOp(0.1);
                    }}
                    onMouseLeave={() => {
                        setPfpOp(1);
                    }}
                >
                    <Avatar
                        width={pfpLoadSize}
                        height={pfpLoadSize}
                        onCrop={onCrop}
                        onClose={onClose}
                        onBeforeFileLoad={onBeforeFileLoad}
                        labelStyle={{ color: "black", opacity: pfpOp }}
                        borderStyle={{
                            borderRadius: "50%",
                            textAlign: "center",
                            backgroundColor: bgColor.current,
                            backgroundImage: preview /*/////////////////////////////////set the users pfp from the database*/,
                            fontSize: pfpTxtSize,
                        }}
                        label={props.user.profile.username
                            .slice(0, 1)
                            .toUpperCase()}
                    />
                    {!preview && (
                        <PublishIcon className="UserBreakdownUploadIcon" />
                    )}
                </div>

                <Row className="UserBreakdownUsernameAndImage">
                    <img src={preview} alt="" />{" "}
                    <h1>{props.user.profile.username}</h1>
                </Row>
            </div>
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
                </Col>
            </Row>
        </div>
    );
}

export default User;
