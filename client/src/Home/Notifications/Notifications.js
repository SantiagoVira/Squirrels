import "./Notifications.css";
import React, { useState, useRef } from "react";
import { OutsideClick } from "./OutsideClick";

import NotificationsNoneOutlinedIcon from "@material-ui/icons/NotificationsNoneOutlined";
import NotificationsActiveIcon from "@material-ui/icons/NotificationsActive";

function NotificationInactive() {
    return <NotificationsNoneOutlinedIcon />;
}
function NotificationActive() {
    return <NotificationsActiveIcon />;
}

function NotificationItem(props) {
    return (
        <li>
            <a href={`#card_id_${props.id}`} onClick={props.onClick}>
                {props.message}
            </a>
        </li>
    );
}

function Notifications() {
    const [newNotif, SetNewNotif] = useState(false);
    const notifications = [{ id: 821, message: "This is a card" }];

    const dropdownRef = useRef(null);
    const [isActive, setIsActive] = OutsideClick(dropdownRef, false);
    const onClick = () => setIsActive(!isActive);

    return (
        <div>
            <div className="menu-container">
                <button onClick={onClick} className="menu-trigger">
                    {newNotif ? (
                        <NotificationActive />
                    ) : (
                        <NotificationInactive />
                    )}
                </button>
                <nav
                    ref={dropdownRef}
                    className={`NotificationsMenuMain ${
                        isActive ? "active" : "inactive"
                    }`}
                >
                    <ul>
                        {notifications.map((n, i) => (
                            <NotificationItem
                                id={n.id}
                                message={n.message}
                                key={i}
                                onClick={onClick}
                            />
                        ))}
                    </ul>
                </nav>
            </div>
        </div>
    );
}

export default Notifications;
