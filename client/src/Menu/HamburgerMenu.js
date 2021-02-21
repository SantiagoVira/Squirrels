import React from "react";
import "./HamburgerMenu.css";
import MenuIcon from "@material-ui/icons/Menu";
import IconButton from "@material-ui/core/IconButton";
import { useState } from "react";
import { Link } from "react-router-dom";

function HamburgerMenu(props) {
    const [display, setDisplay] = useState("none");
    const links = [
        { to: "/", name: "Home" },
        { to: "/about", name: "About" },
        { to: "/gallery", name: "Gallery" },
    ];
    function unique() {
        return Math.floor(
            Math.random() * Math.floor(Math.random() * Date.now())
        ).toString();
    }
    const page = props.page;
    return (
        <div className="MenuIconButton dropdown">
            <IconButton
                onClick={() => {
                    setDisplay("block");
                }}
            >
                <MenuIcon className="MenuIcon dropdown" />
            </IconButton>
            <div
                class="dropdown-content"
                style={{ display: display }}
                onMouseLeave={() => {
                    setDisplay("none");
                }}
            >
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
        </div>
    );
}

export default HamburgerMenu;
