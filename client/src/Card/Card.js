import api from "../api";
import React, { useState } from "react";
import "./Card.css";
import history from "../history";
//Using this library because it fixes mouse movement bug
//More Info: https://stackoverflow.com/questions/47257519/react-contenteditable-cursor-jumps-to-beginning
import ContentEditable from "react-contenteditable";
import { Remarkable } from 'remarkable';

import ReplyIcon from "@material-ui/icons/Reply";

import { Link } from "react-router-dom";
import Row from "../Row";
import Col from "../Col";
import Hashtags from "./Hashtags";
import SideBar from "./SideBar";
import ReplyForm from "../Replies/ReplyForm";
import Replies from "../Replies/Replies";

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
    const [post, setPost] = useState(story);
    const [editing, setEditing] = useState(false);
    const [editValue, setEditValue] = useState(story.note);
    const [formOpen, setFormOpen] = useState(false);
    const [repliesOpen, setRepliesOpen] = useState(false);
    const [replies, setReplies] = useState(null);
    const md = new Remarkable();

    const loadReplies = async () => {
        if (replies === null) {
            const response = await api.get(story.replies);
            // Reverse replies array to order by pub_date
            setReplies(response.data.results);
        }
    };

    const closeForm = () => {
        setFormOpen(false);
        setRepliesOpen(true);
    };

    const replyButtonAction = async () => {
        if (!user.isLoggedIn) {
            return history.push("/login");
        }
        loadReplies();
        setFormOpen(!formOpen);
    };

    const updateLog = async (e) => {
        const value = e.currentTarget.textContent.trim().length > 0 
            ? e.currentTarget.textContent
            : "-";
        const response = await api.patch(`/api/SquirreLogs/${post.id}/`, {
            note: value,
        })
        setEditValue(response.data.note)
    }

    const makeClickable = (text) => {
        return text.replaceAll(/[^\[\(]https?:\/\/[A-Za-z0-9\-_]+\.[A-Za-z0-9\-_:%&;\?\#\/.=]+/ig, (m) => {return "[" + m + "](" + m + ")"});
    }

    if (!post) {
        return null;
    }

    return (
        <div className="squirrelCard">
            {!disableCardMenu && (
                <SideBar
                    post={post}
                    changePost={setPost}
                    user={user}
                    changeUser={changeUser}
                    editing={editing}
                    changeEditing={setEditing}
                    onDelete={() => onDelete(post)}
                />
            )}
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
                        html={
                          !editing ? md.render(makeClickable(editValue))
                          : editValue ? editValue
                          : ""
                        }
                        onChange={(e) => setEditValue(e.currentTarget.textContent)}
                        onBlur={(e) => updateLog(e)}
                    />
                </Row>

                {/* Hashtags and Links */}
                <Hashtags findHashtag={findHashtag}>
                    {post.SquirrelTopics}
                </Hashtags>
                <div className="linksWrapper">
                    <span
                        className="CardRepliesLink pointerOnHover"
                        onClick={() => {
                            loadReplies();
                            setRepliesOpen(!repliesOpen);
                        }}
                    >
                        <p>{post.replies_length} Replies</p>
                        <ReplyIcon className="CardRepliesIcon" />
                    </span>
                    <span
                        className="CardRepliesLink pointerOnHover"
                        onClick={() => {
                            replyButtonAction();
                        }}
                    >
                        Reply
                    </span>
                </div>
            </Col>

            {/* Replies */}
            {!disableReplies && formOpen && (
                <ReplyForm
                    post={story}
                    changePost={(newPost) => setPost(newPost)}
                    replies={replies}
                    changeReplies={(newReply) =>
                        setReplies([...replies, newReply])
                    }
                    closeForm={closeForm}
                />
            )}
            {!disableReplies && repliesOpen && (
                <Replies
                    replies={replies}
                    changeReplies={setReplies}
                    user={user}
                    changeUser={changeUser}
                    post={post}
                    changePost={setPost}
                />
            )}
        </div>
    );
}

export default Card;
