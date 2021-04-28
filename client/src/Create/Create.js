import React, { useState } from "react";
import api from "../api";
import history from "../history";

import "./Create.css";
import Row from "../Row";
import Hashtags from "../Card/Hashtags";
import { Redirect } from "react-router-dom";

// Since we have an owner property, we need a way to find the currently logged in user
// Maybe this should only be shown when someone is logged in?

function Create({ user }) {
    // Stores form inputs to be sent to server
    const [request, setRequest] = useState({ topic: "", note: "" });

    const onSubmitClick = async (e) => {
        try {
            e.preventDefault();
            await api.post("/api/SquirreLogs/", {
                ...request,
                topics: request.topic
                    .split(" ")
                    .filter((r) => r.trim() !== "")
                    .map((r) => r.replace("#", "").trim()),
                pub_date: new Date().toISOString(), //Gets current date
            });
            history.push("/");
        } catch (err) {}
    };

    const commonHashtags = ["Squirrels", "Park", "Dogs", "Poems"];

    if (user.isLoggedIn === null) {
        return null;
    }

    if (user.isLoggedIn === false) {
        return <Redirect to="/login" />;
    }

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
                        placeholder="#Squirrels_yo #I_<3_Sqrrlz"
                        className="Topics"
                        maxLength={400}
                        rows={1}
                    />
                    <Hashtags>{request.topic.split(" ")}</Hashtags>
                    <Row>
                        Common:
                        <Hashtags>{commonHashtags}</Hashtags>
                    </Row>
                </div>
                <button className="Submit">Post</button>
            </form>
        </div>
    );
}

export default Create;
