import React from "react";
import api from "../api";
import "./Replies.css";
import Reply from "./Reply";

const Replies = ({
    replies,
    changeReplies,
    user,
    changeUser,
    post,
    changePost,
}) => {
    const onDelete = async (id) => {
        try {
            if (window.confirm("Are you sure you want to delete this reply?")) {
                await api.delete(`/api/SquirreLogs/${id}/`);
                const postResponse = await api.get(
                    `/api/SquirreLogs/${post.id}/`
                );
                changeReplies(replies.filter((reply) => reply.id !== id));
                changePost(postResponse.data);
            }
        } catch (err) {}
    };

    const renderReplies = () => {
        return replies.map((reply) => {
            //console.log(reply);
            return (
                <Reply
                    reply={reply}
                    user={user}
                    changeUser={changeUser}
                    changeReplies={(newReply) =>
                        changeReplies([...replies, newReply])
                    }
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
