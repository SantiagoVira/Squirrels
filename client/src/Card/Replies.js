import React from "react";
import "./Replies.css";

const Replies = ({replies}) => {
    const renderReplies = () => {
        return replies.map(reply => {
            return (
                <div className="replyCard" key={reply.id}>
                    <strong><div className="owner">
                        {reply.owner_details.pfp && (
                            <img
                                src={reply.owner_details.pfp}
                                alt=""
                                className="pfp"
                            />
                        )}
                        {reply.owner_details.username}
                    </div></strong>
                    <div>
                        {reply.note}
                    </div>
                </div>
            );
        });
    };

    if(!replies || replies.length === 0) {
        return null;
    }

    return <div className="replyWrapper">{renderReplies()}</div>;
};

export default Replies;
