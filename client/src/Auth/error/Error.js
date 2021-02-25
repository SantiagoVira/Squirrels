import React from "react";
import "./Error.css";
import PriorityHighIcon from "@material-ui/icons/PriorityHigh";

function Error(props) {
    const message = props.children;
    return (
        <div className="errorContainer">
            <PriorityHighIcon className="ErrorIcon" />
            <p>{message}</p>
        </div>
    );
}

export default Error;
