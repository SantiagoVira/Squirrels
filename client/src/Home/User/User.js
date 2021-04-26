import React from "react";
import { Link } from "react-router-dom";
import "./User.css";
import Row from "../../Row";
import Col from "../../Col";
import Avatar from "../Avatar/Avatar";

function User(props) {
    if (!props.user.profile) {
        return null;
    }

    return (
        <div className="user">
            {/* Passing name as prop for more reusability */}
            <div className="UserBreakdownUsernameAndImage">
                <Avatar user={props.user} />
                <Row>
                    <h1 className="UserBreakdownUsername">
                        {props.user.profile.username}
                    </h1>
                </Row>
            </div>
            <Row>
                <Col>
                    <p className="userData">
                        Total Likes: <strong>{props.counts.votes}</strong>
                    </p>
                    <Link
                        className="link userData"
                        to={`/?user=${props.user.profile.id}`}
                    >
                        Posts: <strong>{props.counts.posts}</strong>
                    </Link>
                </Col>
            </Row>
        </div>
    );
}

export default User;
