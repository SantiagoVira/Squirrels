import React, { useState } from "react";
import ContentEditable from "react-contenteditable";

import "./Replies.css";
import api from "../api";
import SideBar from "../Card/SideBar";
import { Link } from "react-router-dom";

function Reply({ user, onDelete, changeUser, ...props }) {
    const [reply, setReply] = useState(props.reply);
    const [editValue, setEditValue] = useState(reply.note);
    const [editing, setEditing] = useState(false);

    return (
        <div className="replyCard">
            <SideBar
                disableEmbed
                post={reply}
                changePost={setReply}
                user={user}
                changeUser={changeUser}
                editing={editing}
                changeEditing={setEditing}
                onDelete={() => onDelete(reply.id)}
            />
            <div className="content">
                <strong>
                    <Link
                        to={`/?user=${reply.owner}`}
                        className="CardUsername pointerOnHover"
                    >
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
                    </Link>
                </strong>
                <ContentEditable
                    className={`CardStory ${editing && "StoryIsEditable"}`}
                    disabled={!editing}
                    html={editValue || ""}
                    onChange={(e) => setEditValue(e.currentTarget.textContent)}
                    onBlur={(e) =>
                        api.patch(`/api/SquirreLogs/${reply.id}/`, {
                            note: e.currentTarget.textContent,
                        })
                    }
                />
            </div>
        </div>
    );
}

export default Reply;
