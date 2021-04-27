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
import HamburgerMenu from "./HamburgerMenu";

function Menu(props) {
    const [scrolled, setScrolled] = useState(
        window.pageYOffset > 0 ? "scrolled" : ""
    );
    const [page, setPage] = useState(window.location.pathname);

    useEffect(() => {
        window.addEventListener("scroll", onScroll);
        setPage(window.location.pathname);
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
        const underlined = path === page || path === page.slice(0, page.length - 1)
            ? "MenuIconFocused" : "";
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

    if(props.size < 935) {
        return (
            <HamburgerMenu 
                page={page}
                user={props.user}
                changeUser={props.changeUser}
            />
        );
    }

    return (
        <div className={`menu ${scrolled}`}>
            <Row className="left">
                {renderLink(HomeIcon, "Home", "/")}
                {renderLink(AppsIcon, "Archive", "/archive")}
                {props.user.isLoggedIn &&
                    renderLink(AddBoxIcon, "Create", "/create")}
            </Row>
            <div className="right">{renderAuth()}</div>
        </div>
    );
}

export default Menu;
