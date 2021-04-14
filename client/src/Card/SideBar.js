import React, {useState} from "react";
import api from "../api";
import history from "../history";

import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import CreateIcon from "@material-ui/icons/Create";
import FavoriteIcon from "@material-ui/icons/Favorite";
import CodeIcon from "@material-ui/icons/Code";

import Col from "../Col";
import "./SideBar.css";

const SideBar = ({disabled, post, changePost, user, changeUser, editing, 
        changeEditing, onDelete, isReply}) => {
    const [copied, setCopied] = useState("Copy Embed Link");

    const copyLink = () => {
        setCopied("Copied!");
        navigator.clipboard.writeText(
            `<iframe src="${window.location.origin}/card/${post.id}" title="Sqrrlz Card" />`
        );
    }

    const renderEmbed = () => {
        if(!isReply) {
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
    }
    
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
    }

    const renderVote = () => {
        if(changePost && changeUser && user) {
            const liked = post.liked ? "liked" : "";
            return (
                <IconButton
                    className={`editOrDeleteButton up ${liked}`}
                    onClick={() => vote()}
                >
                    <FavoriteIcon className="up" />
                </IconButton>
            )
        }
    }

    const renderOwnerBtns = () => {
        try {
            if(user.profile.id === post.owner) {
                return (
                    <Col>
                        <IconButton
                            className="editOrDeleteButton"
                            onClick={() => onDelete(post.id)}
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
        } catch(err) {
            return null;
        }
    }

    if(disabled || !post) {
        return null;
    }

    return (
        <div className="leftSideWrapper">
            <div className="buttons">
                {renderVote()}
                <p className="votes">{post.votes}</p>
            </div>
            {renderOwnerBtns()}
            {renderEmbed()}
        </div>
    )
}

export default SideBar