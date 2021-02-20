import React from "react";
import "./index.css";
function Row(props) {
    return (
        <div
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-evenly",
            }}
            className={props.className}
        >
            {props.children}
        </div>
    );
}
export default Row;
