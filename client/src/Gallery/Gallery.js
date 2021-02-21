import React, { useEffect, useState } from "react";
import axios from "axios";

import Card from "../Card/Card.js";
import Search from "./Search/Search";
import "./Gallery.css";

function unique() {
    return Math.floor(
        Math.random() * Math.floor(Math.random() * Date.now())
    ).toString();
}

function titleGen(log) {
    let topics = [];
    for (const property in log) {
        if (property.startsWith("story_topic")) {
            topics.push(
                property.replace("story_topic", "").replaceAll("_", " ")
            );
        }
    }
    topics.forEach((topic, index) => {
        topics[index] = topic
            .trim()
            .toLowerCase()
            .split(" ")
            .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
            .join(" ");
    });
    return topics.join(", ");
}

function RenderSquirrels(props) {
    //Render the stories, raises: can't render an object
    return props.stories.map((log) => {
        let title = titleGen(log);
        const post = {
            topic: title,
            note: log.note_squirrel_park_stories,
            key: unique(),
            gallery: true,
        };
        // Placeholder user prop because it must be passed into card
        return <Card post={post} key={unique()} user={{profile: null}} />;
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
        getStories(response.data, "");
    }, []);

    function getStories(stories, search) {
        // We should have a way to find stories again
        if (search === "") {
            let randomStories = [];
            let randomInt = 0;

            for (let i = 0; i < 10; i++) {
                randomInt = Math.floor(Math.random() * stories.length);
                randomStories.push(stories[randomInt]);
            }
            setStories(randomStories);
        } else {
            const searchedStories = [];
            stories.forEach((log) => {
                let topics = [];
                for (const property in log) {
                    if (property.startsWith("story_topic")) {
                        topics.push(
                            property
                                .replace("story_topic", "")
                                .replaceAll("_", " ")
                        );
                    }
                }
                console.log(topics);
                topics.some((topic) => {
                    if (
                        topic
                            .trim()
                            .toLowerCase()
                            .includes(search.toLowerCase())
                    ) {
                        searchedStories.push(log);
                        return true;
                    }
                });
            });

            setStories(searchedStories.slice(0, 10));
        }
    }

    if (!stories) {
        return null;
    }

    return (
        <div>
            <div
                style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    margin: "30px",
                }}
            >
                <Search stories={data} getStories={getStories} />
            </div>
            <div className="cards">
                <RenderSquirrels stories={stories} />
            </div>
            <div onClick={() => getStories(data, "")} className="generate-btn">
                Generate more!
            </div>
        </div>
    );
}

export default Gallery;
