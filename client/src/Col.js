import React from "react";
import "./index.css";
function Col(props) {
    return (
        <div
            style={Object.assign(
                {},
                {
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "space-evenly",
                },
                props.style
            )}
            className={`ColComponent ${props.className}`}
        >
            {props.children}
        </div>
    );
}
export default Col;
