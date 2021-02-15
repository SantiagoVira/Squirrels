import React, { useEffect, useState } from "react";
import axios from "axios";

import Card from "./Card/Card.js";
import "./Gallery.css";

function unique() {
    return Math.floor(
        Math.random() * Math.floor(Math.random() * Date.now())
    ).toString();
}

function RenderSquirrels(props) {
    //Render the stories, raises: can't render an object
    return props.stories.map((log) => {
        return (
            <Card
              //key={some kind of unique identifier}
              //title={whatever part of the log starts with "story_topic"}
              content={log.note_squirrel_park_stories}
              key={unique()}
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
    let randomStories = [];
    let randomInt = 0;
  
    for(let i = 0; i < 10; i++) {
      randomInt = Math.floor(Math.random() * stories.length);
      randomStories.push(
        stories[randomInt]
      )
    }
    setStories(randomStories);
  }

  if(!stories) {
    return null;
  }

  return (
    <div>
      <button onClick={() => randomizeStories(data)}>Generate</button>
      <RenderSquirrels stories={stories} />
    </div>
  );
}

export default Gallery;
