import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import User from "../Home/User/User";
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

    function logout() {
        localStorage.removeItem('token');
        props.changeUser(false, "");
    }

    function renderAuth() {
        if(props.user.isLoggedIn) {
            return <Link to="#" onClick={() => logout()}>Logout</Link>
        } else {
            return (
                <React.Fragment>
                    <Link to="/login">Login</Link>
                    <Link to="/register">Register</Link>
                </React.Fragment>
            )
        }
    }

    const links = [
        { to: "/", name: "Home" },
        { to: "/about", name: "About" },
        { to: "/gallery", name: "Gallery" },
        { to: "/create", name: "Create" },
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
            </div>
            <div className="right">
                {renderAuth()}
            </div>
        </div>
    );
}

export default Menu;
