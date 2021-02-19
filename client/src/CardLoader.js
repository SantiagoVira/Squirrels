import React from "react";
import Card from "./Card/Card.js";
function CardLoader(props) {
    const id = props.match.params.id;
    console.log(id);
    //Ramons job now
    const post = {};
    return <Card post={post} key={"sdifingjodsfnvuow 3jeifa"} />;
}

export default CardLoader;
