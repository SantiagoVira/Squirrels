import React, { useEffect, useState } from "react";
import "./Home.css";
import Uploads from "./Uploads/Uploads";
import User from "./User/User";
import ArrowUpwardRoundedIcon from "@material-ui/icons/ArrowUpwardRounded";

function Home(props) {
    const [scrolled, setScrolled] = useState(
        window.pageYOffset > 250 ? "" : "scrolled"
    );
    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    function handleScroll() {
        window.pageYOffset > 250 ? setScrolled("") : setScrolled("scrolled");
    }
    return (
        <div className="homePageMain">
            {!scrolled && (
                <div className="backuptotopdiv">
                    <button
                        className={`GoBackUpToTheTop`}
                        onClick={() => window.scrollTo(0, 0)}
                    >
                        <ArrowUpwardRoundedIcon />
                    </button>
                </div>
            )}

            {window.innerWidth < 935 && <User user={props.user} />}
            <Uploads
                user={props.user}
                changeUser={props.changeUser}
                page={props.page}
                setScrolled={setScrolled}
            />
            {window.innerWidth > 935 && <User user={props.user} />}
        </div>
    );
}

export default Home;
