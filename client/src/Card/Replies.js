import React from "react";
import "./Replies.css";

const Replies = ({replies, open}) => {
    const renderReplies = () => {
        return replies.map(reply => {
            return (
                <div className="replyCard">
                    <strong><div className="owner">
                        Test Owner
                    </div></strong>
                    <div>
                        {reply.note}
                    </div>
                </div>
            )
        });
    }

    if(!open) {
        return null;
    }

    return (
        <div className="replyWrapper">
            {renderReplies()}
        </div>
    );
}

export default Replies;