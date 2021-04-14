import api from "../api";
import React, { useState } from "react";
import "./Card.css";
//Using this library because it fixes mouse movement bug
//More Info: https://stackoverflow.com/questions/47257519/react-contenteditable-cursor-jumps-to-beginning
import ContentEditable from "react-contenteditable";

import ReplyIcon from "@material-ui/icons/Reply";

import Row from "../Row";
import Col from "../Col";
import Hashtags from "./Hashtags";
import SideBar from "./SideBar";
import { Link } from "react-router-dom";

// Don't fetch from this component. Add them to the serializer instead!
function Card({
    story,
    onDelete,
    user,
    changeUser,
    disableCardMenu,
    findHashtag,
    disableUsername,
    isReply,
}) {
    //When we call the card component, pass the id to access it on the server
    const [post, setPost] = useState(story);
    const [editing, setEditing] = useState(false);
    const [editValue, setEditValue] = useState(story.note);

    if (!post) {
        return null;
    }

    return (
        <div className="squirrelCard">
            <SideBar 
                disabled={disableCardMenu}
                post={post}
                changePost={(post) => setPost(post)}
                user={user}
                changeUser={(user) => changeUser(user)}
                editing={editing}
                changeEditing={(editing) => setEditing(editing)}
                onDelete={onDelete}
                isReply={isReply}
            />
            <Col>
                {disableUsername ? (
                    <h4>Archive</h4>
                ) : (
                    <Link
                        to={`/?user=${post.owner}`}
                        className="CardUsername pointerOnHover"
                    >
                        <Row>
                            {post.owner_details.pfp && (
                                <img
                                    src={post.owner_details.pfp}
                                    alt=""
                                    className="pfp"
                                />
                            )}
                            <h4>{post.owner_details.username}</h4>
                        </Row>
                    </Link>
                )}
                <br />
                <Row>
                    <ContentEditable
                        className={`CardStory ${editing && "StoryIsEditable"}`}
                        disabled={!editing}
                        html={editValue || ""}
                        onChange={(e) =>
                            setEditValue(e.currentTarget.textContent)
                        }
                        onBlur={(e) =>
                            api.patch(`/api/SquirreLogs/${post.id}/`, {
                                note: e.currentTarget.textContent,
                            })
                        }
                    />
                </Row>
                {!isReply && (
                    <React.Fragment>
                        {/* Hashtags */}
                        <Hashtags findHashtag={findHashtag}>
                            {post.SquirrelTopics}
                        </Hashtags>
                        <Link to="" className="CardRepliesLink pointerOnHover">
                            <p>{/*replies amount*/} 0 Replies</p>
                            <ReplyIcon className="CardRepliesIcon" />
                        </Link>
                    </React.Fragment>
                )}
            </Col>
        </div>
    );
}

export default Card;
