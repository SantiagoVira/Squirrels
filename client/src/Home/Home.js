import React from "react";
import "./Home.css";
import Uploads from "./Uploads/Uploads";
import User from "./User/User";

function Home(props) {
    return (
        <div className="homePageMain">
            <Uploads user={props.user} changeUser={props.changeUser} />
            <User />
        </div>
    );
}

export default Home;
