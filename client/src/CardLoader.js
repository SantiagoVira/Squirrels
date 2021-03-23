import React, { useState } from "react";
import { useEffect } from "react";
import Card from "./Card/Card.js";
import api from "./api.js";

function unique() {
    return Math.floor(
        Math.random() * Math.floor(Math.random() * Date.now())
    ).toString();
}

function CardLoader(props) {
    const [card, setCard] = useState("");
    const id = props.match.params.id;
    let gallery = false;

    //Ramons job now
    useEffect(async () => {
        const response = await api.get(`/api/SquirreLogs/${id}`);
        setCard(response.data);
    }, []);

    if (card.owner === 1) {
        gallery = true;
    }
    
    return (
        <Card
            story={card}
            key={unique()}
            user={{ profile: null }}
            disableCardMenu={true}
            disableUsername={gallery}
        />
    );
}

export default CardLoader;
