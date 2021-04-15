import React, {useState} from "react";
import api from "../api";

const ReplyForm = ({post, open, changeOpen}) => {
    const [text, setText] = useState("");

    const onFormSubmit = async (e) => {
        e.preventDefault();
        const response = await api.post(`/api/SquirreLogs/${post.id}/replies/`, {
            note: text,
            pub_date: new Date().toISOString(),
            reply_id: post.id
        });
        changeOpen(false);
    }

    if(!open) {
        return null;
    }

    return (
        <div>
            <form onSubmit={(e) => onFormSubmit(e)}>
                <textarea 
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
                <button>Submit</button>
            </form>
        </div>
    )
}

export default ReplyForm;