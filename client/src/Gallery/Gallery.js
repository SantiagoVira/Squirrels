import React, { useEffect, useState } from "react";
import api from "../api";

import Card from "../Card/Card.js";
import Search from "./Search/Search";
import "./Gallery.css";

function Gallery({ user, changeUser }) {
    const [data, setData] = useState([]);
    const [stories, setStories] = useState([]);

    useEffect(async () => {
        var response = await api.get("/api/users/1/posts");
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
        console.log(search);
        if (search === "") {
            setStories(stories);
        } else {
            searchStories(stories, search);
        }
    }

    // Separating this from getStories for more readability
    function searchStories(stories, search) {
        //Search by tags (topics)
        if (search.startsWith("#")) {
            const searchedStories = [];
            stories.forEach((log) => {
                //search.startsWith('#') ? log.topics :log.note_squirrel_park_stories;
                const topics = log.SquirrelTopics;
                topics.some((topic) => {
                    const formattedSearch = search
                        .slice(1)
                        .trim()
                        .toLowerCase();
                    if (
                        topic.topic_name
                            .trim()
                            .toLowerCase()
                            .includes(formattedSearch)
                    ) {
                        searchedStories.push(log);
                        return true;
                    }
                    return false;
                });
                return false;
            });
            const storyNum = Math.random() * searchedStories.length;
            setStories(searchedStories.slice(storyNum, storyNum + 10));
            //Search by story (notes)
        } else {
            const getDatabaseStories = async () => {
                const results = await api.get(
                    `http://localhost:8000/api/SquirreLogs/?search=${search}`
                );
                setStories(results.data.results);
            };
            getDatabaseStories();
        }
    }

    function renderSquirrels() {
        //Render the stories, raises: can't render an object
        return stories.map((log) => {
            const post = {
                SquirrelTopics: log.SquirrelTopics,
                note: log.note,
                id: log.id,
                votes: log.votes,
                owner: log.owner
            };
            return (
                <Card
                    post={post}
                    key={log.id}
                    user={user}
                    changeUser={changeUser}
                    disableUsername={true}
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
