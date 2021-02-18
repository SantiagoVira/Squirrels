import React from "react";
import "./Home.css";
import Uploads from "./Uploads/Uploads";
import User from "./User/User";

function Home() {
    return (
        <div className="main">
            <Uploads />
            <User />
        </div>
    );
}

export default Home;
