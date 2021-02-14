import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Menu.css";

function Menu() {
    const [scrolled, setScrolled] = useState("");
    const [page, setPage] = useState(window.location.href);

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
    ];

    return (
        <div className={`menu ${scrolled}`}>
            {links.map((link) =>
                !page.endsWith(link.to) ? (
                    <strong key={unique()}>
                        <Link to={link.to}>{link.name}</Link>
                    </strong>
                ) : (
                    <Link
                        key={unique()}
                        to={link.to}
                        onClick={() => {
                            setPage(window.location.href);
                        }}
                    >
                        {link.name}
                    </Link>
                )
            )}
        </div>
    );
}

export default Menu;
//change which is stong based on seleccted
