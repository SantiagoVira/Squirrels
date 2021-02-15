import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Menu.css";

function Menu(props) {
    const [scrolled, setScrolled] = useState("");
    const page = props.page;

    useEffect(() => {
        window.addEventListener("scroll", onScroll);
    });

    const onScroll = () => {
        window.pageYOffset > 0 ? setScrolled("scrolled") : setScrolled("");
    };

    function unique() {
        return Math.floor(
            Math.random() * Math.floor(Math.random() * Date.now())
        ).toString();
    }

    const links = [
        { to: "/", name: "Squirrels" },
        { to: "/gallery", name: "Gallery" },
        { to: "/uploads", name: "Uploads" },
        { to: "/about", name: "About" },
        { to: "/create", name: "+"}
    ];

    return (
        <div className={`menu ${scrolled}`}>
            {links.map((link) =>
                page.endsWith(link.to) ? (
                    <strong key={unique()}>
                        <Link to={link.to}>{link.name}</Link>
                    </strong>
                ) : (
                    <Link key={unique()} to={link.to}>
                        {link.name}
                    </Link>
                )
            )}
        </div>
    );
}

export default Menu;
