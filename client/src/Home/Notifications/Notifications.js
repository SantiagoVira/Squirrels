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

function Notifications() {
    const [newNotif, SetNewNotif] = useState(false);

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
                        <li>
                            <a href={`#card_id_${821 /*post.id*/}`}>Messages</a>
                        </li>
                        <li>
                            <a href="#123">Trips</a>
                        </li>
                        <li>
                            <a href="#123">Saved</a>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    );
}

export default Notifications;
