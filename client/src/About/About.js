import React from "react";
import "./About.css";
import Person from "./Person/Person";

import Dashiell from "./Images/Dashiell.jpg";
import Santiago from "./Images/Santiago.jpg";
import Aramie from "./Images/Aramie.jpg";
import Ramon from "./Images/Ramon.jpg";

function About() {
    return (
        <div className="container">
            <Person
                src={Santiago}
                name="Santiago"
                desc="We are making Squirrel-cial Media"
            />
            <Person
                src={Aramie}
                name="Aramie"
                desc="Thats what the mainstream dog media wants you to believe"
            />
            <Person
                src={Ramon}
                name="Ramon"
                desc="This is our new invention: squirrels"
            />
            <Person
                src={Dashiell}
                name="Dashiell"
                desc="I dont like facial recognition, but if it's being used on squirrels it's worth it"
            />
        </div>
    );
}

export default About;
