import React, { useState } from "react";
import "./Home.css";
import Uploads from "./Uploads/Uploads";
import User from "./User/User";

function Home(props) {
    const [searching, setSearching] = useState(false);
    return (
        <div className="homePageMain">
            <Uploads
                user={props.user}
                changeUser={props.changeUser}
                searching={searching}
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
