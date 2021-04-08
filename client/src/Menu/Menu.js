import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Menu.css";
import AddBoxIcon from "@material-ui/icons/AddBox";
import AppsIcon from "@material-ui/icons/Apps";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import HomeIcon from "@material-ui/icons/Home";
import HelpIcon from '@material-ui/icons/Help';

import Row from "../Row";

function Menu(props) {
    const [scrolled, setScrolled] = useState(onScroll);
    const page = props.page;

    useEffect(() => {
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const onScroll = () => {
        window.pageYOffset > 0 ? setScrolled("scrolled") : setScrolled("");
    };

    function unique() {
        return Math.floor(
            Math.random() * Math.floor(Math.random() * Date.now())
        ).toString();
    }

    function logout() {
        localStorage.removeItem("token");
        props.changeUser({ isLoggedIn: false, profile: null });
    }

    function IconLabel(props) {
        return <p className="menuBarIconLabel">{props.children}</p>;
    }

    function renderAuth(page) {
        if (props.user.isLoggedIn) {
            return (
                <Link to="#" onClick={() => logout()}>
                    <ExitToAppIcon />
                    <IconLabel>Logout</IconLabel>
                </Link>
            );
        } else {
            const links = [
                { to: "/login", name: <AccountCircleIcon />, word: "Login" },
                { to: "/register", name: <PersonAddIcon />, word: "Register" },
            ];
            return (
                <Row>
                    {links.map((link) =>
                        page.endsWith(link.to) ? (
                            <strong key={unique()}>
                                <Link to={link.to}>
                                    {link.name}
                                    <IconLabel>{link.word}</IconLabel>
                                </Link>
                            </strong>
                        ) : (
                            <Link key={unique()} to={link.to}>
                                {link.name}
                                <IconLabel>{link.word}</IconLabel>
                            </Link>
                        )
                    )}
                </Row>
            );
        }
    }

    const links = [
        { to: "/", name: <HomeIcon />, word: "Home" },
        { to: "/archive", name: <AppsIcon />, word: "Archive" },
        { to: "/about", name: <HelpIcon />, word: "About"}
    ];
    return (
        <div className={`menu ${scrolled}`}>
            <Row className="left">
                {links.map((link) =>
                    page.endsWith(link.to) ? (
                        <strong key={unique()}>
                            <Link to={link.to}>
                                {link.name}
                                <IconLabel>{link.word}</IconLabel>
                            </Link>
                        </strong>
                    ) : (
                        <Link key={unique()} to={link.to}>
                            {link.name}
                            <IconLabel>{link.word}</IconLabel>
                        </Link>
                    )
                )}
                {props.user.isLoggedIn &&
                    (page.endsWith("/create") ? (
                        <strong key={unique()}>
                            <Link to={"/create"}>
                                <AddBoxIcon />
                                <IconLabel>Create</IconLabel>
                            </Link>
                        </strong>
                    ) : (
                        <Link key={unique()} to={"/create"}>
                            <AddBoxIcon />
                            <IconLabel>Create</IconLabel>
                        </Link>
                    ))}
            </Row>
            <div className="right">{renderAuth(page)}</div>
        </div>
    );
}

export default Menu;
