import React, { useEffect, useState } from "react";
import api from "../api";
import CircularProgress from "@material-ui/core/CircularProgress";
import ArrowUpwardRoundedIcon from "@material-ui/icons/ArrowUpwardRounded";

import Card from "../Card/Card.js";
import Search from "./Search/Search";
import "./Archive.css";

function Archive({ user, changeUser }) {
    const [data, setData] = useState([]);
    const [stories, setStories] = useState(null);
    const [isBottom, setIsBottom] = useState(false);
    const [scrolled, setScrolled] = useState(
        window.pageYOffset > 250 ? "" : "scrolled"
    );

    useEffect(async () => {
        var response = await api.get("/api/SquirreLogs/archive");
        var d = response.data.results;

        setData(d);
        getStories(d, "");
        while (response.data.next) {
            response = await api.get(response.data.next);
            d = [...d, ...response.data.results];
            setData(d);
        }
    }, []);

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        if (isBottom && stories) {
            //Add the stuff
            const index = stories.length + 1;
            setStories([...stories, ...data.slice(index, index + 20)]);
            setIsBottom(false);
        }
    }, [isBottom]);

    async function getStories(stories, search) {
        if (search === "") {
            setStories(stories);
        } else if (search.startsWith("#")) {
            const searchedStories = [];
            stories.forEach((log) => {
                //search.startsWith('#') ? log.topics :log.note_squirrel_park_stories;
                log.SquirrelTopics.some((topic) => {
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
            const results = await api.get(
                `/api/SquirreLogs/archive?search=${search}`
            );
            setStories(results.data.results);
        }
    }

    // Separating this from getStories for more readability
    // function searchStories(stories, search) {
    //     //Search by tags (topics)
    //     if (search.startsWith("#")) {
    //         const searchedStories = [];
    //         stories.forEach((log) => {
    //             //search.startsWith('#') ? log.topics :log.note_squirrel_park_stories;
    //             log.SquirrelTopics.some((topic) => {
    //                 const formattedSearch = search
    //                     .slice(1)
    //                     .trim()
    //                     .toLowerCase();
    //                 if (
    //                     topic.topic_name
    //                         .trim()
    //                         .toLowerCase()
    //                         .includes(formattedSearch)
    //                 ) {
    //                     searchedStories.push(log);
    //                     return true;
    //                 }
    //                 return false;
    //             });
    //             return false;
    //         });
    //         const storyNum = Math.random() * searchedStories.length;
    //         setStories(searchedStories.slice(storyNum, storyNum + 10));
    //         //Search by story (notes)
    //     } else {
    //         const getDatabaseStories = async () => {
    //             const results = await api.get(`/api/SquirreLogs/archive?search=${search}`);
    //             setStories(results.data.results);
    //         };
    //         getDatabaseStories();
    //     }
    // }

    function handleScroll() {
        const scrollTop =
            (document.documentElement && document.documentElement.scrollTop) ||
            document.body.scrollTop;
        const scrollHeight =
            (document.documentElement &&
                document.documentElement.scrollHeight) ||
            document.body.scrollHeight;
        if (scrollTop + window.innerHeight + 500 >= scrollHeight) {
            setIsBottom(true);
        }
        window.pageYOffset > 250 ? setScrolled("") : setScrolled("scrolled");
    }

    function renderSquirrels() {
        //Render the stories, raises: can't render an object
        if (stories.length === 0) {
            return <div className="noPosts">No posts were found</div>;
        }

        return stories.map((post) => {
            return (
                <Card
                    story={post}
                    key={post.id}
                    user={user}
                    changeUser={changeUser}
                    disableUsername={true}
                />
            );
        });
    }

    if (!stories) {
        return (
            <div className="loaderWrapper">
                <CircularProgress color="inherit" />
            </div>
        );
    }

    return (
        <div>
            <div className="backuptotopdiv">
                <button
                    className={`GoBackUpToTheTop ${
                        scrolled && "hidethebutton"
                    }`}
                    onClick={() => {
                        window.scrollTo(0, 0);
                    }}
                >
                    <ArrowUpwardRoundedIcon />
                </button>
            </div>
            <p className="ArchiveDescription">
                In 2018, the New York City Government conducted a squirrel
                census in Central Park, recording the events that took place
                during a sighting of a squirrel. Neatly tagged and packed into
                categories, these stories are often ridiculous, and some didn't
                even relate to squirrels at all. And so, we decided to display
                them here for all to see.
            </p>
            <div className="searchWrapper">
                <Search stories={data} getStories={getStories} />
            </div>
            <div className="cards">{renderSquirrels()}</div>
        </div>
    );
}

export default Archive;
