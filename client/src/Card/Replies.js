import React, { useState } from "react";
import "./Replies.css";
import Reply from "./Reply";

const Replies = ({ replies, changeReplies, user, post }) => {
    const renderReplies = () => {
        return replies.map((reply, i) => {
            return <Reply reply={reply} user={user} post={post} index={i} />;
        });
    };

    if (!replies || replies.length === 0) {
        return null;
    }

    return <div className="replyWrapper">{renderReplies()}</div>;
};

export default Replies;
