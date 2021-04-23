import React from "react";
import { Link } from "react-router-dom";
import "./User.css";
import Row from "../../Row";
import Col from "../../Col";
import Avatar from "../Avatar/Avatar";
import NotificationsNoneOutlinedIcon from "@material-ui/icons/NotificationsNoneOutlined";
import NotificationsActiveOutlinedIcon from "@material-ui/icons/NotificationsActiveOutlined";

function NoNotif() {
    return <NotificationsNoneOutlinedIcon />;
}
function Notif() {
    return <NotificationsActiveOutlinedIcon />;
}

function User(props) {
    if (!props.user.profile) {
        return null;
    }

    return (
        <div className="user">
            {/* Passing name as prop for more reusability */}
            <Row style={{ alignItems: "center" }}>
                <Avatar user={props.user} name={props.user.profile.username} />
                <NoNotif />
            </Row>

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
