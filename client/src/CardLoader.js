import React, { useState } from "react";
import { useEffect } from "react";
import Card from "./Card/Card.js";
import api from "./api.js";
function CardLoader(props) {
    const [card, setCard] = useState("");
    const id = props.match.params.id;
    console.log(id);
    //Ramons job now
    useEffect(async () => {
        const response = await api.get(`/api/log/${id}`);
        setCard(response);
    }, []);
    return <Card post={card} key={"sdifingjodsfnvuow 3jeifa"} />;
}

export default CardLoader;
