import React from "react";
import axios from "axios";

import Card from "./Card/Card.js";
import "./Gallery.css";

function getSquirrelStories() {
  return axios({
    method: 'get',
    url: 'https://data.cityofnewyork.us/resource/gfqj-f768.json',
  })
  .then(function(response) {
    console.log(response.data[
      Math.floor(Math.random() * Math.floor(response.data.length-1))
    ].note_squirrel_park_stories) // I like seeing random squirrel stories :)

    return response;
  });
}

function RenderSquirrels(props) {
  return <Card
    title="This would be the story category"
    content="I'm too tired to fix the import rn but here's a sample simple card"
  />
  // Render the stories, raises: can't render an object
  // return props.stories.then(function(response) {
  //   return (
  //     response.data.map((log) => {
  //       return (
  //         <Card
  //           // title={whatever part of the log starts with "story_topic"}
  //           content={log.note_squirrel_park_stories}
  //         />
  //       );
  //     })
  //   );
  // })
}

function Gallery() {
  return (
    <div>
      <RenderSquirrels stories={getSquirrelStories()} />
    </div>
  );
}

export default Gallery;
