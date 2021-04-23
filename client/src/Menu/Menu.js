import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Menu.css";
import AddBoxIcon from "@material-ui/icons/AddBox";
import AppsIcon from "@material-ui/icons/Apps";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import HomeIcon from "@material-ui/icons/Home";

import Row from "../Row";

function Menu(props) {
    const [scrolled, setScrolled] = useState(
        window.pageYOffset > 0 ? "scrolled" : ""
    );
    const [page, setPage] = useState(window.location.href);

    useEffect(() => {
        window.addEventListener("scroll", onScroll);
        setPage(window.location.href);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const onScroll = () => {
        window.pageYOffset > 0 ? setScrolled("scrolled") : setScrolled("");
    };

    function logout() {
        localStorage.removeItem("token");
        props.changeUser({ isLoggedIn: false, profile: null });
    }

    // Note: 'Icon' must start with a capital I, since it's rendered as JSX
    const renderLink = (Icon, label, path) => {
        const underlined = page.endsWith(path) ? "MenuIconFocused" : "";
        return (
            <Link to={path}>
                <Icon className={underlined} />
                <p className="menuBarIconLabel">{label}</p>
            </Link>
        );
    };

    function renderAuth() {
        if (props.user.isLoggedIn) {
            return (
                <Link to="#" onClick={() => logout()}>
                    <ExitToAppIcon />
                    <p className="menuBarIconLabel">Logout</p>
                </Link>
            );
        } else {
            return (
                <Row>
                    {renderLink(AccountCircleIcon, "Login", "/login")}
                    {renderLink(PersonAddIcon, "Register", "/register")}
                </Row>
            );
        }
    }

    return (
        <div className={`menu ${scrolled}`}>
            <Row className="left">
                {renderLink(HomeIcon, "Home", "/")}
                {renderLink(AppsIcon, "Archive", "/archive")}
                {props.user.isLoggedIn &&
                    renderLink(AddBoxIcon, "Create", "/create")}
            </Row>
            <div className="right">{renderAuth(page)}</div>
        </div>
    );
}

export default Menu;
