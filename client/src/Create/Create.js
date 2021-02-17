import React, { useState } from "react";
import axios from "axios";

import "./Create.css";

function Create() {
    // Stores form inputs to be sent to server
    const [request, setRequest] = useState({ topic: "", note: "" });

    const onSubmitClick = (e) => {
        e.preventDefault();
        axios.post("http://localhost:8000/api/logs/", {
            ...request,
            pub_date: new Date().toISOString(), //Gets current date
        });
    };

    return (
        <div>
            <form onSubmit={(e) => onSubmitClick(e)}>
                <div className="inputs">
                    <input
                        value={request.topic}
                        onChange={(e) =>
                            setRequest({ ...request, topic: e.target.value })
                        }
                        placeholder="Topics"
                        className="Topics"
                        maxLength={400}
                        rows={1}
                        required={true}
                    />
                    <br />
                    <div style={{ marginBottom: "10px" }} />
                    <textarea
                        value={request.note}
                        onChange={(e) =>
                            setRequest({ ...request, note: e.target.value })
                        }
                        placeholder="Story"
                        className="Story"
                        maxLength={400}
                        required={true}
                        rows={3}
                    />
                </div>
                <button className="Submit">Post</button>
            </form>
        </div>
    );
}

export default Create;
