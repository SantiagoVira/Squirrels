import React from "react";
import UserForm from "./UserForm.js";

function Register(props) {
    return (
        <UserForm
            path="/api/users/"
            text="Register"
            changeUser={props.changeUser}
            link="/login"
            label="Been here before? Log in"
        />
    );
}

export default Register;
