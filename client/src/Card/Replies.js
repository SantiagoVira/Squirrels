import React from "react";
import "./Replies.css";

const Replies = ({ replies, open }) => {
    const renderReplies = () => {
        return replies.map((reply, i) => {
            return (
                <div className="replyCard" key={i}>
                    <strong>
                        <div className="owner">Test Owner</div>
                    </strong>
                    <div>{reply.note}</div>
                </div>
            );
        });
    };

    if (!open) {
        return null;
    }

    return <div className="replyWrapper">{renderReplies()}</div>;
};

export default Replies;
