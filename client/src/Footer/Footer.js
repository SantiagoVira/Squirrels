import React from "react";
import "./Footer.css";
import Banner from "./banner logo 2.png";

function Footer() {
    return (
        <div>
            <div style={{ height: "20vh" }}></div>
            <div className="footer">
                <img src={Banner} alt="Sqrrlz" />
                <p>
                    Sqrrlz was made by 4 talented idiots who chose to make an
                    app to share pictures and stories <br /> of tree rodents rather
                    than... literally anything else
                </p>
            </div>
        </div>
    );
}

export default Footer;
