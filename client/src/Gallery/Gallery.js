import React, { useEffect, useState } from "react";
import api from "../api";

import Card from "../Card/Card.js";
import Search from "./Search/Search";
import "./Gallery.css";

function Gallery({ user, changeUser }) {
    const [data, setData] = useState([]);
    const [stories, setStories] = useState([]);

    useEffect(async () => {
        var response = await api.get("/api/users/1");
        var d = response.data.results;
        setData(d);
        getStories(d, "");
        while (response.data.next) {
            response = await api.get(response.data.next);
            d = [...d, ...response.data.results];
            setData(d);
        }
    }, []);

    function getStories(stories, search) {
        if (search === "") {
            // let randomStories = [];
            // let randomInt = 0;

            // for (let i = 0; i < 10; i++) {
            //     randomInt = Math.floor(Math.random() * stories.length);
            //     randomStories.push(stories[randomInt]);
            // }
            // setStories(randomStories);
            setStories(stories.slice(0, 10));
        } else {
            searchStories(stories, search);
        }
    }

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
                    const formattedSearch = search
                        .slice(1)
                        .trim()
                        .toLowerCase();
                    if (formattedSearch.includes(topic.trim().toLowerCase())) {
                        searchedStories.push(log);
                        return true;
                    }
                    return false;
                });
                //Search by story (notes)
            } else {
                const formattedStory = story.trim().toLowerCase();
                if (formattedStory.includes(search.trim().toLowerCase())) {
                    searchedStories.push(log);
                    return true;
                }
            }
            return false;
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
                SquirrelTopics: log.SquirrelTopics,
                note: log.note,
                id: log.id,
                votes: log.votes,
            };
            return (
                <Card 
                    post={post} 
                    key={post.id} 
                    user={user} 
                    changeUser={changeUser} 
                />
            );
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
            <div className="cards">{renderSquirrels()}</div>
            <div onClick={() => getStories(data, "")} className="generate-btn">
                Generate more!
            </div>
        </div>
    );
}

export default Gallery;
