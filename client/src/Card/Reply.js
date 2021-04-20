import React, { useState } from "react";
import "./Replies.css";
import api from "../api";

import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import CreateIcon from "@material-ui/icons/Create";
import FavoriteIcon from "@material-ui/icons/Favorite";
import Col from "../Col";

function Reply({ reply, user, post, index }) {
    const [editing, setEditing] = useState(false);

    const onDelete = async (id) => {
        try {
            if (window.confirm("Are you sure you want to delete this post?")) {
                const response = await api.get(
                    `/api/SquirreLogs/${id}/replies/`
                );
                const reply = await response.data.results[index];
                await api.delete(reply.url);
            }
        } catch (err) {}
    };

    const renderOwnerBtns = () => {
        try {
            if (user.profile.id === post.owner) {
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
                            onClick={() => setEditing(!editing)}
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

    return (
        <div className="replyCard" key={reply.id}>
            <div className="replyCardSidebar">{renderOwnerBtns()}</div>
            <strong>
                <div className="owner">
                    {reply.owner_details.pfp && (
                        <img
                            src={reply.owner_details.pfp}
                            alt=""
                            className="pfp"
                        />
                    )}
                    {reply.owner_details.username}
                </div>
            </strong>
            <div>{reply.note}</div>
        </div>
    );
}

export default Reply;
