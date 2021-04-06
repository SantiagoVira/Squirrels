import React, { useState } from "react";
import "./Greeting.css";
import Wave from "react-wavify";
import Col from "../Col";

function WaveSection() {
    const [display, setDisplay] = useState(false);
    const height = 10;
    const amp = 10;
    return (
        display && (
            <Col className="greetingMainWrapper">
                <Wave
                    fill="#00a1e4"
                    paused={false}
                    options={{
                        height: height,
                        amplitude: amp,
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
                        height: height,
                        amplitude: amp,
                        speed: 0.55,
                        points: 3,
                    }}
                    className="greetingMainBottom"
                />
            </Col>
        )
    );
}

function Greeting() {
    return (
        <div className="greetingWrapper">
            <WaveSection />
        </div>
    );
}

export default Greeting;
