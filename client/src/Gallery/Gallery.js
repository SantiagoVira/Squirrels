import React, { useEffect, useState } from "react";
import axios from "axios";

import Card from "../Card/Card.js";
import "./Gallery.css";

function unique() {
    return Math.floor(
        Math.random() * Math.floor(Math.random() * Date.now())
    ).toString();
}

function RenderSquirrels(props) {
    //Render the stories, raises: can't render an object
    return props.stories.map((log) => {
        let topics = [];
        for (const property in log) {
            if (property.startsWith("story_topic")) {
                topics.push(
                    property.replace("story_topic", "").replaceAll("_", " ")
                );
            }
        }
        let title = topics.join(" and ");
        return (
            <Card
                title={title}
                content={log.note_squirrel_park_stories}
                key={unique()} // Could hypothetically have duplicate but it's unlikely
            />
        );
    });
}

function Gallery() {
    const [data, setData] = useState(null);
    const [stories, setStories] = useState(null);

    useEffect(async () => {
        const response = await axios({
            method: "get",
            url: "https://data.cityofnewyork.us/resource/gfqj-f768.json",
        });

        setData(response.data);
        randomizeStories(response.data);
    }, []);

    function randomizeStories(stories) {
        // We should have a way to find stories again
        let randomStories = [];
        let randomInt = 0;

        for (let i = 0; i < 10; i++) {
            randomInt = Math.floor(Math.random() * stories.length);
            randomStories.push(stories[randomInt]);
        }
        setStories(randomStories);
    }

    if (!stories) {
        return null;
    }

    return (
        <div>
            <div className="cards">
                <RenderSquirrels stories={stories} />
            </div>
            <div
                onClick={() => randomizeStories(data)}
                className="generate-btn"
            >
                Generate more!
            </div>
        </div>
    );
}

export default Gallery;
