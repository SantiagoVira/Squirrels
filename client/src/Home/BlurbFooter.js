import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";
function BlurbFooter() {
    function Personal(props) {
        return (
            <span
                onClick={() => {
                    window.open(props.link, "_blank");
                }}
            >
                {props.name}
                {" ● "}
            </span>
        );
    }
    const personals = [["Santiago Vira", "https://santiagovira.netlify.app/"]];
    return (
        <div>
            <p className="BlurbFooterLinks">
                <Link to="/about">About</Link>
                {" ● "}
                {personals.map((stuff) => (
                    <Personal name={stuff[0]} link={stuff[1]} />
                ))}
            </p>
        </div>
    );
}

export default BlurbFooter;
