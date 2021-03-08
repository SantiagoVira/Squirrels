import React, { useState } from "react";
import "./Home.css";
import Uploads from "./Uploads/Uploads";
import User from "./User/User";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import IconButton from "@material-ui/core/IconButton";
function Home(props) {
    const [searching, setSearching] = useState(false);
    const [special, setSpecial] = useState(false);
    return (
        <div className="homePageMain">
            <IconButton
                className="exitSpecialCardsButton"
                onClick={() => {
                    setSpecial(false);
                }}
            >
                <ExitToAppIcon
                    className={`exitSpecialCardsIcon ${!special && "hide"}`}
                />
            </IconButton>

            <Uploads
                user={props.user}
                changeUser={props.changeUser}
                searching={searching}
                setSpecial={setSpecial}
                special={special}
            />
            <User
                user={props.user}
                searching={searching}
                setSearching={setSearching}
            />
        </div>
    );
}

export default Home;
