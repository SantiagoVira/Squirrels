import React from "react";
import "./Footer.css";
import Banner from "./banner logo 2.png";
import { Link } from "react-router-dom";

function Footer() {
    return (
        <>
            <div className="spacer"></div>
            <div className="footer">
                <p className="footerBlurb">
                    Sqrrlz was made by
                    <Link to="/about"> 4 talented idiots</Link> who chose to
                    make an app to share stories of tree rodents rather than...
                    literally anything else. <br />
                    But, let's be honest, nothing is better than "squirrels"
                    spelled in a hip way.
                </p>
                <img className="bannerImg" src={Banner} alt="Sqrrlz" />
            </div>
        </>
    );
}

export default Footer;
