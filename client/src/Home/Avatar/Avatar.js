import React, { useState, useEffect, useRef } from "react";
import "./Avatar.css";
import Row from "../../Row";
import api from "../../api";

import AvatarEditor from "react-avatar-edit";
import PublishIcon from "@material-ui/icons/Publish";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";

function Avatar(props) {
    const [preview, setPreview] = useState(null);
    const [image, setImage] = useState(null);
    const [opacity, setOpacity] = useState(1);
    const [size, setSize] = useState({ width: 75, height: 75 });
    const [avatarRef, setAvatarRef] = useState(null);
    const bgColor = useRef("hsl(" + 
        360 * Math.random() + "," +
        (25 + 70 * Math.random()) + "%," +
        (85 + 10 * Math.random()) + "%)"
    );

    useEffect(() => {
        try {
            if(props.user.profile.pfp) {
                setImage(props.user.profile.pfp);
                setOpacity(0);
            }
        } catch(err) {}
    }, [props.user]);
    
    const onClose = () => {
        setPreview(null);
        setSize({ width: 75, height: 75 });
    }

    const onBeforeFileLoad = (el) => {
        if (el.target.files[0].size > 255000) {
            alert("File is too big!");
            el.target.value = "";
        } else {
            setSize({ height: 150 });
        }
    }

    const onAvatarSubmit = () => {
        setImage(preview);
        avatarRef.onCloseClick();
        setOpacity(0);
        api.patch(`/api/users/${props.user.profile.id}/`, {pfp: preview});
    };
    
    const renderIcons = () => {
        if(preview) {
            return (
                <CheckCircleOutlineIcon
                    className="UserBreakdownSubmitPfp"
                    onClick={() => onAvatarSubmit()}
                />
            )
        } else {
            return <PublishIcon className="UserBreakdownUploadIcon" />
        }
    }

    if(!props.user) {
        return null;
    }

    return (
        <div
            className="UserBreakdownTopDiv"
            style={{ flexDirection: preview ? "column" : "row" }}
        >
            {/* Main avatar and edit box */}
            <div
                className="circular--portrait"
                onMouseEnter={() => setOpacity(0.1)}
                onMouseLeave={() => !image ? setOpacity(1) : null}
            >
                <AvatarEditor
                    width={size.width}
                    height={size.height}
                    onCrop={preview => setPreview(preview)}
                    onClose={onClose}
                    onBeforeFileLoad={onBeforeFileLoad}
                    labelStyle={{ color: "black", opacity: opacity }}
                    ref={(ref) => setAvatarRef(ref)}
                    borderStyle={{
                        borderRadius: "50%",
                        textAlign: "center",
                        backgroundColor: !image && bgColor.current,
                        backgroundImage: `url(${image})`,
                        fontSize: size.width / Math.sqrt(2),
                        backgroundPosition: "center",
                        backgroundSize: "100% auto",
                    }}
                    label={props.user.profile.username
                        .slice(0, 1)
                        .toUpperCase()}
                />
                {renderIcons()}
            </div>
            {/* Bottom avatar (when editing) and username */}
            <Row className="UserBreakdownUsernameAndImage">
                {preview &&
                    <img
                        src={preview}
                        alt=""
                        className="UserBreakdownPreview"
                    />
                }
                {props.name &&
                    <h1>{props.name}</h1>
                }
            </Row>
        </div>
    );
}

export default Avatar;
