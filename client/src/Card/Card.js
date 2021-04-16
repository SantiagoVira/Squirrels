import api from "../api";
import React, { useState } from "react";
import "./Card.css";
//Using this library because it fixes mouse movement bug
//More Info: https://stackoverflow.com/questions/47257519/react-contenteditable-cursor-jumps-to-beginning
import ContentEditable from "react-contenteditable";

import ReplyIcon from "@material-ui/icons/Reply";

import { Link } from "react-router-dom";
import Row from "../Row";
import Col from "../Col";
import Hashtags from "./Hashtags";
import SideBar from "./SideBar";
import ReplyForm from "./ReplyForm";
import Replies from "./Replies";

// Don't fetch from this component. Add them to the serializer instead!
function Card({
    story,
    onDelete,
    user,
    changeUser,
    findHashtag,
    disableCardMenu,
    disableUsername,
    disableReplies,
}) {
    //When we call the card component, pass the id to access it on the server
    const [post, setPost] = useState(story);
    const [editing, setEditing] = useState(false);
    const [editValue, setEditValue] = useState(story.note);
    const [repliesOpen, setRepliesOpen] = useState("");
    const [replies, setReplies] = useState(null);

    const changeRepliesOpen = (target) => {
        if(repliesOpen === target) {
            setRepliesOpen("");
        } else {
            setRepliesOpen(target);
        }
    }

    const onRepliesClick = async (target) => {
        if(replies === null) {
            const response = await api.get(story.replies);
            setReplies(response.data.results);
        }
        changeRepliesOpen(target);
    }

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
            />
            <Col>
                {/* User Details */}
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

                {/* Note/Story */}
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

                {/* Hashtags and Links */}
                <Hashtags findHashtag={findHashtag}>
                    {post.SquirrelTopics}
                </Hashtags>
                <div className="linksWrapper">
                    <span
                        className="CardRepliesLink pointerOnHover"
                        onClick={() => onRepliesClick("section")}
                    >
                        <p>{post.replies_length} Replies</p>
                        <ReplyIcon className="CardRepliesIcon" />
                    </span>
                    {user.isLoggedIn && (
                        <span
                            className="CardRepliesLink pointerOnHover"
                            onClick={() => onRepliesClick("form")}
                        >
                            Reply
                        </span>
                    )}
                </div>
            </Col>

            {/* Replies */}
            {!disableReplies && repliesOpen === "form" && (
                <ReplyForm
                    post={story}
                    replies={replies}
                    changeReplies={(newReplies) => setReplies(newReplies)}
                    changeRepliesOpen={(target) => changeRepliesOpen(target)}
                />
            )}
            {!disableReplies && repliesOpen === "section" && (
                <Replies replies={replies} />
            )}
        </div>
    );
}

export default Card;
