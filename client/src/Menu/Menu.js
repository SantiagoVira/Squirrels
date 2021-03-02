import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Menu.css";
import AddBoxIcon from "@material-ui/icons/AddBox";
import CollectionsIcon from "@material-ui/icons/Collections";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import HomeIcon from "@material-ui/icons/Home";

function Menu(props) {
    const [scrolled, setScrolled] = useState(
        window.pageYOffset > 0 ? "scrolled" : ""
    );
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

    function renderAuth(page) {
        if (props.user.isLoggedIn) {
            return (
                <Link to="#" onClick={() => logout()}>
                    <ExitToAppIcon />
                </Link>
            );
        } else {
            const links = [
                { to: "/login", name: <AccountCircleIcon /> },
                { to: "/register", name: <PersonAddIcon /> },
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

    const links = [
        { to: "/", name: <HomeIcon /> },
        { to: "/gallery", name: <CollectionsIcon /> },
    ];
    return (
        <div className={`menu ${scrolled}`}>
            <div className="left">
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
                {props.user.isLoggedIn &&
                    (page.endsWith("/create") ? (
                        <strong key={unique()}>
                            <Link to={"/create"}>
                                <AddBoxIcon />
                            </Link>
                        </strong>
                    ) : (
                        <Link key={unique()} to={"/create"}>
                            <AddBoxIcon />
                        </Link>
                    ))}
            </div>
            <div className="right">{renderAuth(page)}</div>
        </div>
    );
}

export default Menu;
