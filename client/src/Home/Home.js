import React, { useEffect, useState } from "react";
import api from "../api";
import "./Home.css";
import Uploads from "./Uploads/Uploads";
import User from "./User/User";
import ArrowUpwardRoundedIcon from "@material-ui/icons/ArrowUpwardRounded";

function Home(props) {
    const [counts, setCounts] = useState({ votes: 0, posts: 0 });
    const [scrolled, setScrolled] = useState(
        window.pageYOffset > 250 ? "" : "scrolled"
    );
    
    useEffect(() => {
        function handleScroll() {
            window.pageYOffset > 250 ? setScrolled("") : setScrolled("scrolled");
        }

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        if(props.user.isLoggedIn) {
            getCounts();
        }
    }, [props.user]);

    const getCounts = async () => {
        const response = await api.get(
            `/api/users/${props.user.profile.id}/posts/`
        );
        setCounts({
            votes: response.data.total_votes,
            posts: response.data.count,
        });
    };

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

            {window.innerWidth < 935 && 
                <User user={props.user} counts={counts} />
            }
            <Uploads
                user={props.user}
                changeUser={props.changeUser}
                page={props.page}
                setScrolled={setScrolled}
                getCounts={getCounts}
            />
            {window.innerWidth > 935 && 
                <User user={props.user} counts={counts} />
            }
        </div>
    );
}

export default Home;
