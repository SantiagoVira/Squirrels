import React from "react";
import "./About.css";
import Person from "./Person/Person";

import Dashiell from "./Images/Dashiell.jpg";
import Santiago from "./Images/Santiago.jpg";
import Aramie from "./Images/Aramie.jpg";
import Ramon from "./Images/Ramon.jpg";

function About() {
    return (
        <div>
            <div className="story">
                <p className="storyText">
                    You may be wondering.... wtf? Why? Wha... wh.. why though?
                    Don't worry, we got you. This is the story of our
                    Squirrel-cial media site.
                    <br />
                    <br />
                    In early February 2021, 4 young programmers were tasked with
                    creating a project to [How would yall phrase it]. As they
                    were looking through the provided datasets, the stumbled
                    across the perfect idea. In 2018, the New York City
                    Government conducted a squirrel census in Central Park,
                    recording sightings of squirrels as well as their colors and
                    attitudes towards the census takers. As the group was
                    laughing at how absurd this was, the idea was formed. They
                    realized they could share the mental health boost provided
                    by the absurdity of a squirrel census with the rest of the
                    world. Just as they thought it couldn't get any better, well
                    you can probably guess. It got better. There was another
                    dataset about squirrels. But this one, this one was about
                    the stories. The events that took place during a sighting of
                    a squirrel. Neatly tagged and packed into categories, these
                    stories were often ridiculous, and some didn't even relate
                    to squirrels at all.
                    <br />
                    It was perfect.
                    <br />
                    <br />
                    And that is how <strong>Sqrrlz</strong> was formed. Taking
                    these silly squirrel stories and posting them, just to share
                    a litle bit of laughter in this ****storm of a time. You're
                    Welcome.
                </p>
            </div>
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
        </div>
    );
}

export default About;
