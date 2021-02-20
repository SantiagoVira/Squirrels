import React, { useState } from "react";
import "./User.css";
import Row from "../../Row";
import Col from "../../Col";

function User() {
    const [direction, setDirection] = useState();
    const url =
        "https://media.npr.org/assets/img/2017/04/25/istock-115796521-fcf434f36d3d0865301cdcb9c996cfd80578ca99-s800-c85.jpg";
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
    const UserDataStyles = { fontSize: "20px", fontWeight: "500" };
    const user = {
        votes: 69,
        posts: 20,
    };
    return (
        <div className="user">
            <Row>
                <div className="circular--portrait">
                    <img src={url} className={direction} />
                </div>
                <h1>Squirrel McSquirrel</h1>
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
