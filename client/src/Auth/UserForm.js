import React, { useState } from "react";
import api from "../api";
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
            props.changeUser(true, response.data.token);
        } catch (err) {
            if (err.response && err.response.status === 400) {
                setError("Your username and/or password is incorrect");
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
        <div>
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
        </div>
    );
}

export default UserForm;
