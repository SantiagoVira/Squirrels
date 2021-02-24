import React, { useState } from "react";
import api from "../api";
import history from "../history";

import "./Create.css";
import Row from "../Row";
import { Redirect } from "react-router-dom";

function unique() {
    return Math.floor(
        Math.random() * Math.floor(Math.random() * Date.now())
    ).toString();
}

// Since we have an owner property, we need a way to find the currently logged in user
// Maybe this should only be shown when someone is logged in?
function Create({ user }) {
    // Stores form inputs to be sent to server
    const [request, setRequest] = useState({ topic: "", note: "" });

    const onSubmitClick = async (e) => {
        request.topic.split("#").forEach((r) => {
            //("#" + r.trim());
        });
        try {
            e.preventDefault();

            await api.post("/api/SquirreLogs/", {
                ...request,
                topics: request.topic
                    .split("#")
                    .filter((topic) => topic !== ""),
                pub_date: new Date().toISOString(), //Gets current date
            });

            history.push("/");
        } catch (err) {}
    };

    function Hashtags(props) {
        return (
            <Row className={props.className}>
                {props.children.map((topic) => {
                    return topic.trim() !== "" ? (
                        <div className="hashtagWrappper" key={unique()}>
                            <p>#{topic.trim()}</p>
                        </div>
                    ) : null;
                })}
            </Row>
        );
    }

    const commonHashtags = ["Squirrels", "Park", "Dogs", "Poems"];

    return user.isLoggedIn ? (
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
                    <Row>
                        Common:
                        <Hashtags className="CommonHastagsRow">
                            {commonHashtags}
                        </Hashtags>
                    </Row>
                </div>
                <button className="Submit">Post</button>
            </form>
        </div>
    ) : (
        <Redirect to="/login" />
    );
}

export default Create;
