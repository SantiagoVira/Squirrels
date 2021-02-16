import React, { useState } from "react";
import axios from "axios";

import "./Uploads.css";
import Card from "../../Card/Card.js";

function Uploads() {
    const [posts, setPosts] = useState(
        axios.get("http://localhost:8000/logs/") /*idk*/
    );
    /* Imma comment it out until the server stuff is ready

      return <div>
        {posts.map((post) => {<Card title={post.topic} content={post.note}/>})}
      </div>

    */
    return <h1>Users' squirrels here.</h1>;
}

export default Uploads;
