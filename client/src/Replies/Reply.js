import React, { useState } from "react";
import ContentEditable from "react-contenteditable";

import "./Replies.css";
import api from "../api";
import SideBar from "../Card/SideBar";

var sanitizeHtml = require("sanitize-html");

function Reply({ reply, user, onDelete }) {
    const [editValue, setEditValue] = useState(reply.note);
    const [editing, setEditing] = useState(false);

    return (
        <div className="replyCard">
            <SideBar
                post={reply}
                user={user}
                editing={editing}
                changeEditing={setEditing}
                onDelete={onDelete}
            />
            <div className="content">
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
                <ContentEditable
                    className={`CardStory ${editing && "StoryIsEditable"}`}
                    disabled={!editing}
                    html={sanitizeHtml(editValue) || ""}
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
