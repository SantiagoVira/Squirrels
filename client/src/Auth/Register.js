import React from "react";
import UserForm from "./UserForm.js";

function Register(props) {
    return (
        <UserForm
            path="/api/current_user/" 
            text="Register"
            changeUser={props.changeUser} />
    );
}

export default Register;
