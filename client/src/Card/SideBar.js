import React, { useState } from "react";
import api from "../api";
import history from "../history";

import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import CreateIcon from "@material-ui/icons/Create";
import FavoriteIcon from "@material-ui/icons/Favorite";
import CodeIcon from "@material-ui/icons/Code";

import Col from "../Col";
import "./SideBar.css";

const SideBar = ({
    disableEmbed,
    post,
    changePost,
    user,
    changeUser,
    editing,
    changeEditing,
    onDelete,
}) => {
    const [copied, setCopied] = useState("Copy Embed Link");

    const copyLink = () => {
        setCopied("Copied!");
        navigator.clipboard.writeText(
            `<iframe src="${window.location.origin}/card/${post.id}" title="Sqrrlz Card" />`
        );
    };

    const renderEmbed = () => {
        if (!disableEmbed) {
            return (
                <div className="tooltip">
                    <IconButton
                        className="copier"
                        onMouseOut={() => setCopied("Copy Embed Link")}
                        onClick={() => copyLink()}
                    >
                        <span className="tooltiptext" id="myTooltip">
                            {copied}
                        </span>
                        <CodeIcon className="codeIcon" />
                    </IconButton>
                </div>
            );
        }
    };

    const vote = async () => {
        try {
            if (!user.isLoggedIn) {
                return history.push("/login");
            }

            //Set card's votes in the database to votes variable
            const response = await api.put(`/api/SquirreLogs/${post.id}/vote/`);
            changePost(response.data.log);
            changeUser({ ...user, profile: response.data.user });
        } catch (err) {
            return null;
        }
    };

    const renderVote = () => {
        if(changePost && changeUser && user) {
            const liked = post.liked ? "liked" : "";
            return (
                <React.Fragment>
                    <IconButton
                        className={`editOrDeleteButton up ${liked}`}
                        onClick={() => vote()}
                    >
                        <FavoriteIcon className="up" />
                    </IconButton>
                    <p className="votes">{post.votes}</p>
                </React.Fragment>
            );
        }
    };

    const renderOwnerBtns = () => {
        try {
            if (user.profile.id === post.owner) {
                return (
                    <Col>
                        <IconButton
                            className="editOrDeleteButton"
                            onClick={() => onDelete()}
                        >
                            <DeleteIcon />
                        </IconButton>
                        <IconButton
                            className="editOrDeleteButton"
                            onClick={() => changeEditing(!editing)}
                        >
                            <CreateIcon />
                        </IconButton>
                    </Col>
                );
            }
        } catch (err) {
            return null;
        }
    };

    if (!post) {
        return null;
    }

    return (
        <div className="leftSideWrapper">
            <div className="buttons">{renderVote()}</div>
            {renderOwnerBtns()}
            {renderEmbed()}
        </div>
    );
};

export default SideBar;
