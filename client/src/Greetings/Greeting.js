import React, { useEffect, useState } from "react";
import "./Greeting.css";
import Wave from "react-wavify";
import Col from "../Col";
import { Link } from "react-router-dom";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import { IconButton } from "@material-ui/core";

function WaveSection(props) {
    return (
        <Col className="greetingMainWrapper">
            <Wave
                fill="#00a1e4"
                paused={false}
                options={{
                    height: 10,
                    amplitude: 10,
                    speed: 0.55,
                    points: 4,
                }}
                className="greetingMainTop"
            />
            <div className="greetingMainMiddle">{props.children}</div>
            <Wave
                fill="#00a1e4"
                paused={false}
                options={{
                    height: 10,
                    amplitude: 10,
                    speed: 0.55,
                    points: 3,
                }}
                className="greetingMainBottom"
            />
        </Col>
    );
}

function Greeting() {
    const [display, setDisplay] = useState(false);

    useEffect(() => {
        if (!localStorage.getItem("firstVist")) {
            localStorage.setItem("firstVist", true);
            setDisplay(true);
        }
    }, []);
    return (
        display && (
            <div className="greetingWrapper">
                <WaveSection>
                    <div className="greetingText">
                        <h1 className="greetingTitle">Welcome to Sqrrlz!</h1>
                        <p className="greetingDescription">
                            Mental health, squirrels, and a whole lot more!
                            <br />
                            Visit{" "}
                            <Link to="/about" className="greetingAboutLink">
                                our About page
                            </Link>{" "}
                            to learn about our story or you can explore our
                            website! We have an Archive page that is sure to
                            brighten your day, as well as a page to view real
                            peoples' posts as they post them! Enjoy!
                        </p>
                    </div>
                    <IconButton
                        className="greetingExitButton"
                        onClick={() => {
                            setDisplay(false);
                        }}
                    >
                        <HighlightOffIcon className="greetingExitIcon" />
                    </IconButton>
                </WaveSection>
            </div>
        )
    );
}

export default Greeting;
