import React, { useEffect, useState } from "react";
import "./Greeting.css";
import Wave from "react-wavify";
import Col from "../Col";

function WaveSection() {
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
            <div className="greetingMainMiddle" />
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
                <WaveSection />
            </div>
        )
    );
}

export default Greeting;
