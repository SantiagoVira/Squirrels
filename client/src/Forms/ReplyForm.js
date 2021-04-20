import React, { useState } from "react";
import api from "../api";
import "./ReplyForm.css";

const ReplyForm = ({post, changePost, changeReplies, closeForm}) => {
    const [text, setText] = useState("");

    const onFormSubmit = async (e) => {
        e.preventDefault();
        const response = await api.post(`/api/SquirreLogs/${post.id}/replies/`, {
            note: text,
            pub_date: new Date().toISOString(),
            reply_id: post.id,
        });
        changeReplies(response.data.reply)
        changePost(response.data.post)

        // Showing and hiding 
        if(closeForm) {
            closeForm();
        }
    }

    return (
        <div className="replyForm">
            <form onSubmit={(e) => onFormSubmit(e)}>
                <textarea
                    value={text}
                    placeholder="Type your reply here..."
                    onChange={(e) => setText(e.target.value)}
                />
                <button className="submit">Submit</button>
            </form>
        </div>
    );
};

export default ReplyForm;
