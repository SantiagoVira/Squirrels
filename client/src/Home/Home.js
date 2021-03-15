import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import Uploads from "./Uploads/Uploads";
import User from "./User/User";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import IconButton from "@material-ui/core/IconButton";
import ArrowUpwardRoundedIcon from "@material-ui/icons/ArrowUpwardRounded";

function Home(props) {
    const [showBackButton, setShowBackButton] = useState(false);
    const [scrolled, setScrolled] = useState("scrolled");

    const changeShowBackButton = (value) => {
        setShowBackButton(value);
    };

    return (
        <div className="homePageMain">
            {showBackButton ? (
                <Link to="/">
                    <ExitToAppIcon className="exitSpecialCardsIcon" />
                </Link>
            ) : (
                scrolled && (
                    <ArrowUpwardRoundedIcon className="homepagebacktotop" />
                )
            )}

            <Uploads
                user={props.user}
                changeUser={props.changeUser}
                changeShowBackButton={changeShowBackButton}
                match={props.match}
                setScrolled={setScrolled}
            />
            <User user={props.user} />
        </div>
    );
}

export default Home;
