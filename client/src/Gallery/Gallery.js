import React, { useEffect, useState } from "react";
import api from "../api";

import Card from "../Card/Card.js";
import Search from "./Search/Search";
import "./Gallery.css";

function Gallery() {
    const [data, setData] = useState(null);
    const [stories, setStories] = useState(null);

    useEffect(async () => {
        const response = await api.get("/api/SquirreLogs/1/user");
        const formattedBullshit = JSON.parse(response.data).map(
            (object) => object.fields
        );
        setData(formattedBullshit);
        getStories(formattedBullshit, "");
    }, []);

    function getStories(stories, search) {
        if (search === "") {
            let randomStories = [];
            let randomInt = 0;

            for (let i = 0; i < 10; i++) {
                randomInt = Math.floor(Math.random() * stories.length);
                randomStories.push(stories[randomInt]);
            }
            setStories(randomStories);
        } else {
            searchStories(stories, search);
        }
    }

<<<<<<< HEAD
    // Separating this from getStories for more readability
    function searchStories(stories, search) {
        const searchedStories = [];
        stories.forEach((log) => {
            //search.startsWith('#') ? log.topics :log.note_squirrel_park_stories;
            const story = log.note;
            const topics = log.name ? log.name.split(",") : [];
            
            //Search by tags (topics)
            if (search.startsWith("#")) {
                topics.some((topic) => {
                    const formattedSearch = search.slice(1).trim().toLowerCase();
                    if (formattedSearch.includes(topic.trim().toLowerCase())) {
=======
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
                        return false;
                    });
                } else {
                    if (
                        story
                            .trim()
                            .toLowerCase()
                            .includes(search.trim().toLowerCase())
                    ) {
>>>>>>> dd70f8b51da29046499cb1ce81ab60533e0d915d
                        searchedStories.push(log);
                        return true;
                    }
                });
            //Search by story (notes)
            } else {
                const formattedStory = story.trim().toLowerCase()
                if (formattedStory.includes(search.trim().toLowerCase())) {
                    searchedStories.push(log);
                    return true;
                }
            }
        });

        const storyNum = Math.random() * searchedStories.length;
        setStories(searchedStories.slice(storyNum, storyNum + 10));
    }

    function unique() {
        return Math.floor(
            Math.random() * Math.floor(Math.random() * Date.now())
        ).toString();
    }
    
    function renderSquirrels() {
        //Render the stories, raises: can't render an object
        return stories.map((log) => {
            const post = {
                topics: log.name ? log.name.split(",") : [],
                note: log.note,
                key: unique(),
                id: log.id,
            };
            // disableCardMenu removes need to pass in user
            return <Card post={post} key={unique()} disableCardMenu />;
        });
    }

    if (!stories) {
        return null;
    }

    return (
        <div>
            <div className="searchWrapper">
                <Search stories={data} getStories={getStories} />
            </div>
            <div className="cards">
                {renderSquirrels()}
            </div>
            <div onClick={() => getStories(data, "")} className="generate-btn">
                Generate more!
            </div>
        </div>
    );
}

export default Gallery;
