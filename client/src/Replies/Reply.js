import React, { useState } from "react";
import ContentEditable from "react-contenteditable";
import { Remarkable } from 'remarkable';

import "./Replies.css";
import api from "../api";
import SideBar from "../Card/SideBar";
import ReplyForm from "./ReplyForm";
import Replies from "./Replies";
import { Link } from "react-router-dom";

function Reply({ user, onDelete, changeUser, changeReplies, ...props }) {
    const [reply, setReply] = useState(props.reply);
    const [childReplies, setChildReplies] = useState(reply.replies);
    const [editValue, setEditValue] = useState(reply.note);
    const [editing, setEditing] = useState(false);
    const [formOpen, setFormOpen] = useState(false);
    const md = new Remarkable();
    
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
                    html={
                      !editing ? md.render(editValue)
                      : editValue ? editValue
                      : ""
                    }
                    onChange={(e) => setEditValue(e.currentTarget.textContent)}
                    onBlur={(e) =>
                        api.patch(`/api/SquirreLogs/${reply.id}/`, {
                            note: e.currentTarget.textContent,
                        })
                    }
                />
                <span
                    className="CardRepliesLink pointerOnHover"
                    onClick={() => setFormOpen(!formOpen)}
                >
                    Reply
                </span>
            </div>
            {formOpen && 
                <ReplyForm 
                    post={reply}
                    changePost={setReply}
                    changeReplies={(newReply) => setChildReplies([...childReplies, newReply])}
                    closeForm={() => setFormOpen(false)}
                />
            }
            {reply.replies && reply.replies.length > 0 &&
                <Replies 
                    replies={childReplies}
                    changeReplies={setChildReplies}
                    user={user}
                    changeUser={changeUser}
                    post={reply}
                    changePost={setReply}
                />
            }
        </div>
    );
}

export default Reply;
