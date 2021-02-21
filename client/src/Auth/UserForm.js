import React, { useState } from "react";
import api from "../api";
import history from "../history";
import "./UserForm.css";

function UserForm(props) {
    const [form, setForm] = useState({ username: "", password: "" });
    const [error, setError] = useState("");

    const onFormSubmit = async (e, form) => {
        try {
            e.preventDefault();
            const response = await api.post(props.path, form);

            //Set JWT in localstorage
            localStorage.setItem("token", response.data.token);
            await props.changeUser({
                isLoggedIn: true,
                username: response.data.username,
            });
            history.push("/");
        } catch (err) {
            if (err.response && err.response.status === 400) {
                // Get response's default error message
                setError(Object.values(err.response.data)[0][0]);
            } else {
                setError("Something went wrong. Please try again later.");
            }
        }
    };

    function Label(props) {
        return (
            <div className="label">
                <h1>{props.children}</h1>
            </div>
        );
    }

    return (
        <div className="UserFormContainer">
            <div>{error}</div>
            <form onSubmit={(e) => onFormSubmit(e, form)}>
                <div className="inputs">
                    <Label>Username:</Label>
                    <input
                        type="text"
                        value={form.username}
                        onChange={(e) =>
                            setForm({ ...form, username: e.target.value })
                        }
                        maxLength={20}
                        required={true}
                    />
                    <Label>Password:</Label>
                    <input
                        type="password"
                        value={form.password}
                        onChange={(e) =>
                            setForm({ ...form, password: e.target.value })
                        }
                        required={true}
                    />
                </div>
                <button className="Submit">{props.text}</button>
            </form>

            <div
                style={{
                    width: "100%",
                    textAlign: "center",
                    paddingTop: "30px",
                }}
            >
                <a className="AuthLinks" href={props.link}>
                    {props.label}
                </a>
            </div>
        </div>
    );
}

export default UserForm;
