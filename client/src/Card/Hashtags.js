import React from "react";
import Row from "../Row";
import "./Hashtags.css";

const Hashtags = ({findHashtag, children}) => {
    const unique = () => {
        return Math.floor(
            Math.random() * Math.floor(Math.random() * Date.now())
        ).toString();
    }

    const formatTopic = (topic) => {
        if(topic.topic_name && typeof topic.topic_name != undefined) {
            topic = topic.topic_name.trim();
        } else {
            topic = topic.trim();
        }
        const hashSymbol = topic.startsWith("#") ? "" : "#";
        return (hashSymbol + topic);
    }

    const renderTags = () => {
        if(children) {
            return children.map(topic => {
                topic = formatTopic(topic);
                if(topic !== "") {
                    return (
                        <div
                            className="hashtagWrappper pointerOnHover"
                            key={unique()}
                            onClick={() => findHashtag ? findHashtag(topic) : null}
                        >
                            <div>{topic}</div>
                        </div>
                    )
                } else {
                    return null;
                }
            })
        }
    }

    return (
        <Row className="HashtagsRow">
            {renderTags()}
        </Row>
    );
}

export default Hashtags;