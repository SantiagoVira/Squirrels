import React from "react";
import Logo from "./404logo.png";
import "./404.css";
function Error404() {
    return (
        <div style={{ textAlign: "right", margin: "0" }}>
            <img className="logo404" src={Logo} alt="Detective Squirrel" />
            <br />
            <h1 className="error">Error 404: Squirrel not found</h1>
            <br />
            <h4>
                If you are seeing this, check to make sure your url is correct.
                If it is, this page may have been deleted. Sorry :/
            </h4>
        </div>
    );
}

export default Error404;
