import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./User.css";
import Row from "../../Row";
import Col from "../../Col";
import api from "../../api";
import Avatar from "../Avatar/Avatar";

function User(props) {
    const [userData, setUserData] = useState({ votes: "", posts: "" });

    useEffect(() => {
        const getUserData = async () => {
            const response = await api.get(
                `/api/users/${props.user.profile.id}/posts/`
            );
            setUserData({
                votes: response.data.total_votes,
                posts: response.data.count,
            });
        };
        if(props.user.profile) {
            getUserData();
        }
    }, [props.user]);

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
                        Total Votes: <strong>{userData.votes}</strong>
                    </p>
                    <Link
                        className="link userData"
                        to={`/?user=${props.user.profile.id}`}
                    >
                        Posts: <strong>{userData.posts}</strong>
                    </Link>
                    <Link to="/about" className="AboutTextLink">
                        ⋅ About ⋅
                    </Link>
                </Col>
            </Row>
        </div>
    );
}

export default User;
