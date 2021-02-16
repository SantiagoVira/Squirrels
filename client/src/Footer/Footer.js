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
                    <br />
                    app to share pictures and stories of tree rodents rather
                    <br />
                    than... literaly anything else
                </p>
            </div>
        </div>
    );
}

export default Footer;
