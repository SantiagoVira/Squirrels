import React, { useState } from "react";
import api from "../api";
import history from "../history";

import "./Create.css";

// Since we have an owner property, we need a way to find the currently logged in user
// Maybe this should only be shown when someone is logged in?
function Create() {
    // Stores form inputs to be sent to server
    const [request, setRequest] = useState({ topic: "", note: "" });

    const onSubmitClick = async (e) => {
        try {
            e.preventDefault();
            await api.post("http://localhost:8000/api/SquirreLogs/", {
                ...request,
                pub_date: new Date().toISOString(), //Gets current date
            });
            history.push("/");
        } catch(err) {}
    };

    return (
        <div>
            <form onSubmit={(e) => onSubmitClick(e)}>
                <div className="inputs">
                    <h2>Submit a New Story</h2>
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
