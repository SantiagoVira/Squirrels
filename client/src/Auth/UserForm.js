import React, {useState} from "react";
import api from "../api";

function UserForm(props) {
    const [form, setForm] = useState({username: "", password: ""});
    const [error, setError] = useState("");

    const onFormSubmit = async (e, form) => {
        try {
            e.preventDefault();
            const response = await api.post(props.path, form);
            //Set JWT in localstorage
            localStorage.setItem("token", response.data.token)
            props.changeUser(true, response.data.token);
        } catch(err) {
            if(err.response && err.response.status === 400) {
                setError("Your username and/or password is incorrect");
            } else {
                setError("Something went wrong. Please try again later.");
            }
        }
    }

    return (
        <div>
            <div>{error}</div>
            <form onSubmit={e => onFormSubmit(e, form)}>
                <input 
                    type="text" 
                    value={form.username} 
                    onChange={e => setForm({...form, username: e.target.value})} />
                <input 
                    type="password" 
                    value={form.password} 
                    onChange={e => setForm({...form, password: e.target.value})} />
                <button>{props.text}</button>
            </form>
        </div>
    );
}

export default UserForm;