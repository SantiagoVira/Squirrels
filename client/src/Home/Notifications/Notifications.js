import "./Notifications.css";
import React, { useState } from "react";

import NotificationsNoneOutlinedIcon from "@material-ui/icons/NotificationsNoneOutlined";
import NotificationsActiveIcon from "@material-ui/icons/NotificationsActive";

function NoNotif() {
    return <NotificationsNoneOutlinedIcon />;
}
function Notif() {
    return <NotificationsActiveIcon />;
}

function Notifications() {
    const [newNotif, SetNewNotif] = useState(false);
    return newNotif ? <Notif /> : <NoNotif />;
}

export default Notifications;
