import React from "react";
import api from "../api";
import "./Replies.css";
import Reply from "./Reply";

const Replies = ({ replies, changeReplies, user, post }) => {
    const onDelete = async (id) => {
        try {
            if (window.confirm("Are you sure you want to delete this reply?")) {
                await api.delete(`/api/SquirreLogs/${id}/`);
                changeReplies(replies.filter(reply => reply.id !== id));

            }
        } catch (err) {}
    };

    const renderReplies = () => {
        return replies.map((reply) => {
            return (
                <Reply 
                    reply={reply} 
                    changeReplies={changeReplies}
                    user={user} 
                    post={post} 
                    onDelete={(id) => onDelete(id)}
                    key={reply.id} 
                />
            );
        });
    };

    if (!replies || replies.length === 0) {
        return null;
    }

    return <div className="replyWrapper">{renderReplies()}</div>;
};

export default Replies;
