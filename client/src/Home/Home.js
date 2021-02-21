import React from "react";
import "./Home.css";
import Uploads from "./Uploads/Uploads";
import User from "./User/User";

function Home(props) {
    return (
        <div className="main">
            <Uploads user={props.user} />
            <User />
        </div>
    );
}

export default Home;
