import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Menu.css";

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

    const links = [
        { to: "/about", name: "About" },
        { to: "/gallery", name: "Gallery" },
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
                            <Link to={"/create"}>Create</Link>
                        </strong>
                    ) : (
                        <Link key={unique()} to={"/create"}>
                            Create
                        </Link>
                    ))}
            </div>
            <div className="right">{renderAuth(page)}</div>
        </div>
    );
}

export default Menu;
