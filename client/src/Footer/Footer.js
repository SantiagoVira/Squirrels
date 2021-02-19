import React from "react";
import "./Footer.css";
import Banner from "./banner logo 2.png";
import { Link } from "react-router-dom";

function Footer() {
    return (
        <div>
            <div style={{ height: "20vh" }}></div>
            <div className="footer">
                <img src={Banner} alt="Sqrrlz" />
                <p>
                    Sqrrlz was made by <Link to="/about">4 talented idiots</Link> who chose to make an
                    app to share pictures and stories of tree rodents rather
                    than... literally anything else. <br/>
                    But, let's be honest, nothing is better than "squirrels" spelled in a hip way.
                </p>
            </div>
        </div>
    );
}

export default Footer;
