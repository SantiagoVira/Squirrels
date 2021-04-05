import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./User.css";
import Row from "../../Row";
import Col from "../../Col";
import api from "../../api";

import Avatar from "react-avatar-edit";
import PublishIcon from "@material-ui/icons/Publish";
import imog from "./foxcirc.png";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";

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
    const [uPFP, setUPFP] = useState(null);
    const bgColor = useRef(getColor());
    const [avRef, setAvRef] = useState(null);
    const [pfpOp, setPfpOp] = useState(
        getComputedStyle(document.documentElement).getPropertyValue("--pfpOp")
    );
    const [pfpLoadSize, setPfpLoadSize] = useState({ width: 75, height: 75 });

    function onClose() {
        setPreview(null);
        setPfpLoadSize({ width: 75, height: 75 });
    }

    function onCrop(preview) {
        setPreview(preview);
    }

    function onBeforeFileLoad(el) {
        console.log(el.target.files[0]);
        if (el.target.files[0].size > 255000) {
            alert("File is too big!");
            el.target.value = "";
        } else {
            setPfpLoadSize({ height: 150 });
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
        api.patch(`/api/users/${props.user.profile.id}/`, { pfp: preview });
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
                    onMouseEnter={() => setPfpOp(0.1)}
                    onMouseLeave={() => setPfpOp(1)}
                >
                    <Avatar
                        width={pfpLoadSize.width}
                        height={pfpLoadSize.height}
                        onCrop={onCrop}
                        onClose={onClose}
                        onBeforeFileLoad={onBeforeFileLoad}
                        labelStyle={{ color: "black", opacity: pfpOp }}
                        ref={(ref) => setAvRef(ref)}
                        borderStyle={{
                            borderRadius: "50%",
                            textAlign: "center",
                            backgroundColor: !uPFP && bgColor.current,
                            backgroundImage: `url(${uPFP})` /*/////////////////////////////////set the users pfp from the database*/,
                            fontSize: pfpTxtSize,
                            backgroundPosition: "center",
                            backgroundSize: "100% auto",
                        }}
                        label={
                            !uPFP &&
                            props.user.profile.username
                                .slice(0, 1)
                                .toUpperCase()
                        }
                    />
                    {!preview && !uPFP && (
                        <PublishIcon className="UserBreakdownUploadIcon" />
                    )}
                    {preview && !uPFP && (
                        <CheckCircleOutlineIcon
                            className="UserBreakdownSubmitPfp"
                            onClick={() => {
                                avRef.onCloseClick();
                                onAvatarSubmit();
                            }}
                        />
                    )}
                </div>

                <Row className="UserBreakdownUsernameAndImage">
                    <img
                        src={preview}
                        alt=""
                        className="UserBreakdownPreview"
                    />{" "}
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
