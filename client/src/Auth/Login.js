import React from "react";
import UserForm from "./UserForm.js";

function Login(props) {
    return (
        <UserForm
            path="/api/authenticate/"
            text="Login"
            changeUser={props.changeUser}
            link="/register"
            label="New to Sqrrlz? Sign up"
        />
    );
}

export default Login;
