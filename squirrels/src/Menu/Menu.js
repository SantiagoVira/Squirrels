import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import "./Menu.css";

function Menu() {
    const [scrolled, setScrolled] = useState("");

    useEffect(() => {
        window.addEventListener("scroll", onScroll);
    })

    const onScroll = () => {
        window.pageYOffset > 0 ? setScrolled("scrolled") : setScrolled("")
    }

    return (
        <div className={`menu ${scrolled}`}>
            <strong><Link to="/">Squirrels</Link></strong>
            <Link to="/gallery">Gallery</Link>
            <Link to="/uploads">Uploads</Link>
        </div>
    );
}

export default Menu;
