import React, { useState } from "react";
import axios from "axios";

import "./Create.css";

function Create() {
    // Stores form inputs to be sent to server
    const [request, setRequest] = useState({ topic: "", note: "" });

    const onSubmitClick = (e) => {
        e.preventDefault();
<<<<<<< HEAD
        axios.post("http://localhost:8000/api/logs/", {
            ...request, 
            pub_date: new Date().toISOString()  //Gets current date
=======
        console.log(request);
        axios.post("http://localhost:8000/logs/", {
            ...request,
            pub_date: new Date().toISOString(), //Gets current date
>>>>>>> 6571c4041b163c8c052237f2a29e63de58f594be
        });
    };

    return (
        <div>
            <form onSubmit={(e) => onSubmitClick(e)}>
                <div className="inputs">
                    <textarea
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
