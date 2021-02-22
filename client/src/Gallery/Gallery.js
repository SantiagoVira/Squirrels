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

function topicsGen(log) {
    return Object.keys(log)
        .filter((property) => property.startsWith("story_topic"))
        .map((property) =>
            property.replace("story_topic", "").replaceAll("_", " ")
        );
}

function RenderSquirrels(props) {
    //Render the stories, raises: can't render an object
    return props.stories.map((log) => {
        const post = {
            topics: topicsGen(log),
            note: log.note_squirrel_park_stories,
            key: unique(),
            gallery: true,
        };
        // Placeholder user prop because it must be passed into card
        return <Card post={post} key={unique()} user={{ profile: null }} />;
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
                //search.startsWith('#') ? log.topics :log.note_squirrel_park_stories;
                const story = log.note_squirrel_park_stories;
                const topics = topicsGen(log);

                if (search.startsWith("#")) {
                    topics.some((topic) => {
                        if (
                            search
                                .slice(1)
                                .trim()
                                .toLowerCase()
                                .includes(topic.trim().toLowerCase())
                        ) {
                            searchedStories.push(log);
                            return true;
                        }
                    });
                } else {
                    if (
                        story
                            .trim()
                            .toLowerCase()
                            .includes(search.trim().toLowerCase())
                    ) {
                        searchedStories.push(log);
                        return true;
                    }
                }
            });

            const storyNum = Math.random() * searchedStories.length;
            setStories(searchedStories.slice(storyNum, storyNum + 10));
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
