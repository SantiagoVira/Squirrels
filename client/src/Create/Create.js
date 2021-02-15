import React, {useState} from "react";
import axios from "axios";

function Create() {
    // Stores form inputs to be sent to server
    const [request, setRequest] = useState({topic: "", note: ""});

    const onSubmitClick = (e) => {
        e.preventDefault();
        axios.post("http://localhost:8000/logs/", {
            ...request, 
            pub_date: new Date().toISOString()  //Gets current date
        });
    };

    return (
        <div>
            <form onSubmit={(e) => onSubmitClick(e)}>
                <input 
                    type="text" 
                    value={request.topic} 
                    onChange={(e) => setRequest({...request, topic: e.target.value})}
                    placeholder="Topic" />
                <input 
                    type="text" 
                    value={request.note} 
                    onChange={(e) => setRequest({...request, note: e.target.value})}
                    placeholder="Note" />
                <button>Submit</button>
            </form>
        </div>
    )
}

export default Create;