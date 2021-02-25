import "./Header.css";
import React from "react";

function Header() {
    return (
        <div className="topContainer">
            <svg className="top" viewBox="0 0 500 100">
                <path d="M0, 50 C150, 150 350, 30 550, 85 L500, 0 L0, 0 Z" />
            </svg>
            <h1
                className="title"
                to="/"
                onClick={() => (window.location.href = "/")}
            >
                SQRRLZ
            </h1>
        </div>
    );
}

export default Header;
