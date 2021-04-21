import React, { useState, useEffect } from "react";
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
            <Avatar user={props.user} name={props.user.profile.username} />
            <Row>
                <Col>
                    <p className="userData">
                        Total Votes: <strong>{props.counts.votes}</strong>
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
