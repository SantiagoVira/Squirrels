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
    //Ramons job now
    useEffect(async () => {
        const response = await api.get(`/api/SquirreLogs/${id}`);
        setCard(response.data);
    }, []);
    return <Card post={card} key={unique()} user={{ profile: null }} />;
}

export default CardLoader;
