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
        request.topic.split("#").forEach((r) => {
            console.log("#" + r.trim());
        });
        try {
            e.preventDefault();

            await api.post("/api/SquirreLogs/", {
                ...request,
                topics: request.topic.split("#"),
                pub_date: new Date().toISOString(), //Gets current date
            });

            history.push("/");
        } catch (err) {}
    };

    return (
        <div>
            <form className="CreatePostForm" onSubmit={(e) => onSubmitClick(e)}>
                <div className="inputs">
                    <h2 style={{ textAlign: "center" }}>Submit a New Story</h2>
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
                    <br />
                    <div style={{ marginBottom: "10px" }} />
                    <input
                        value={request.topic}
                        onChange={(e) =>
                            setRequest({ ...request, topic: e.target.value })
                        }
                        placeholder="e.g. #Squirrels yo #I <3 Sqrrlz"
                        className="Topics"
                        maxLength={400}
                        rows={1}
                        required={true}
                    />
                </div>
                <button className="Submit">Post</button>
            </form>
        </div>
    );
}

export default Create;
