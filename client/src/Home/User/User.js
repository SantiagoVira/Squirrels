import React, { useState } from "react";
import "./User.css";

function User() {
    const [direction, setDirection] = useState();
    const url =
        "https://pyxis.nymag.com/v1/imgs/6a5/5ba/6e090a007f6e0efc04d65937bfb712e9a3-16-barack-obama.rsquare.w1200.jpg";
    function getMeta(url) {
        var img = new Image();
        img.onload = function () {
            this.width > this.height
                ? setDirection("PFPw")
                : setDirection("PFPh");
        };
        img.src = url;
    }
    getMeta(url);
    function Row(props) {
        return (
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-evenly",
                }}
            >
                {props.children}
            </div>
        );
    }
    function Col(props) {
        return (
            <div
                style={Object.assign(
                    {},
                    {
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "space-evenly",
                    },
                    props.style
                )}
            >
                {props.children}
            </div>
        );
    }
    const UserDataStyles = { fontSize: "20px", fontWeight: "500" };
    const user = {
        votes: 44,
        posts: 44,
    };
    return (
        <div className="user">
            <Row>
                <div className="circular--portrait">
                    <img src={url} className={direction} />
                </div>
                <h1>Barack O.</h1>
            </Row>
            <Row>
                <Col>
                    <p style={UserDataStyles}>
                        Total Votes: <strong>{user.votes}</strong>
                    </p>
                    <p style={UserDataStyles}>
                        Posts: <strong>{user.posts}</strong>
                    </p>
                </Col>
            </Row>
        </div>
    );
}

export default User;
