import React from "react";
import "./HamburgerMenu.css";
import MenuIcon from "@material-ui/icons/Menu";
import IconButton from "@material-ui/core/IconButton";
import { useState } from "react";
import { Link } from "react-router-dom";
import Col from "../Col";

function HamburgerMenu(props) {
    const [display, setDisplay] = useState("none");
    const links = [
        { to: "/", name: "Home" },
        { to: "/about", name: "About" },
        { to: "/gallery", name: "Gallery" },
    ];
    function logout() {
        localStorage.removeItem("token");
        props.changeUser({ isLoggedIn: false, profile: null });
    }
    function unique() {
        return Math.floor(
            Math.random() * Math.floor(Math.random() * Date.now())
        ).toString();
    }
    const page = props.page;

    function renderAuth(page) {
        if (props.user.isLoggedIn) {
            return (
                <Link to="#" onClick={() => logout()}>
                    Logout
                </Link>
            );
        } else {
            const links = [
                { to: "/login", name: "Login" },
                { to: "/register", name: "Register" },
            ];
            return (
                <React.Fragment>
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
                </React.Fragment>
            );
        }
    }
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
                className="dropdown-content"
                style={{ display: display }}
                onMouseLeave={() => {
                    setDisplay("none");
                }}
            >
                <Col className="dropdownColumn">
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
                    {renderAuth(page)}
                </Col>
            </div>
        </div>
    );
}

export default HamburgerMenu;
