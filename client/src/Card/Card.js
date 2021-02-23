import api from "../api";
import React, { useEffect, useState } from "react";
import "./Card.css";
import IconButton from "@material-ui/core/IconButton";
import CodeIcon from "@material-ui/icons/Code";
import DeleteIcon from "@material-ui/icons/Delete";
import CreateIcon from "@material-ui/icons/Create";
import { Redirect } from "react-router-dom";
import Row from "../Row";
import Col from "../Col";

function unique() {
    return Math.floor(
        Math.random() * Math.floor(Math.random() * Date.now())
    ).toString();
}

function Card({ post, onDelete, user, changeUser }) {
    const areURLs = post.SquirrelTopics ? true : false;
    //When we call the card component, pass the id to access it on the server
    const [votes, setVotes] = useState(post.votes);
    const [copied, setCopied] = useState("Copy Embed Link");
    const [redirect, setRedirect] = useState();
    const [voteType, setVoteType] = useState("none");
    const [topicName, setTopicName] = useState([]);

<<<<<<< HEAD
    useEffect(() => {
        const getTopicName = async() => {
            const temp_topics = [];
            for(const topic in post.SquirrelTopics) {
                console.log(post.SquirrelTopics)
                const response = await api.get(topic);
                await temp_topics.push(response.data.topic_name);
            }
            setTopicName(temp_topics);
        }

        if(post.SquirrelTopics) {
            getTopicName();
        }
    }, [post]);
=======
    const GetTopicFromDumDatabase = async (topics) => {
        await topics.forEach(async (topic) => {
            const realTopicName = await api.get(topic);
            const oldTopicsList = [...topicName];
            await oldTopicsList.push(realTopicName.data.topic_name);
            console.log(oldTopicsList);
            setTopicName(oldTopicsList);
        });
    };
>>>>>>> d78cf95bdd8ab18195294ce86e938bab9cd93cac

    useEffect(() => {
        if (user.profile && user.profile.liked_posts.includes(post.id)) {
            setVoteType("liked");
        }
        if (user.profile && user.profile.disliked_posts.includes(post.id)) {
            setVoteType("disliked");
        }
        if (!user.profile) {
            setVoteType("none");
        }
        if (areURLs) {
            GetTopicFromDumDatabase(post.SquirrelTopics);
        }
    }, [user]);

    async function vote(id, op) {
        if (!user.isLoggedIn) {
            setRedirect(<Redirect to="/login" />);
        }
        try {
            const currentVote = op === "up";
            const tempVoteCount = votes;
            //Set card's votes in the database to votes variable
            const response = await api.put(`/api/SquirreLogs/${id}/vote/`, {
                upvote: currentVote,
            });

            // Change user's liked posts on the frontend
            changeUser({
                ...user,
                profile: response.data.user,
            });
            setVotes(response.data.log.votes);
            setVoteType(response.data.result);
        } catch (err) {}
    }

    const get_topic = async (topic) => {
        const response = await api.get(topic);
        setTopicName(response.data.topic_name);
    };

    function Arrow(props) {
        return (
            <div
                onClick={() => {
                    vote(props.id, props.class);
                }}
                className={`voteBtn  ${props.class} ${voteType}`}
            >
                {props.children}
            </div>
        );
    }

    function getPosition(string, subString, index) {
        return string.split(subString, index).join(subString).length;
    }
    function GetEmbedLink() {
        return (
            <div className="tooltip">
                <IconButton
                    className="copier"
                    onMouseOut={() => {
                        setCopied("Copy Embed Link");
                    }}
                    onClick={() => {
                        setCopied("Copied!");
                        navigator.clipboard.writeText(
                            `<iframe src="${
                                window.location.href.slice(
                                    0,
                                    getPosition(window.location.href, "/", 3)
                                ) + `/card/${post.id}`
                            }" title="Sqrrlz Card" />`
                        );
                    }}
                >
                    <span className="tooltiptext" id="myTooltip">
                        {copied}
                    </span>
                    <CodeIcon className="codeIcon" />
                </IconButton>
            </div>
        );
    }

    function Hashtags(props) {
        return (
            <Row className={props.className}>
                {props.children &&
                    props.children.map((topic) => {
                        return topic.trim() !== "" ? (
                            <div className="hashtagWrappper" key={unique()}>
<<<<<<< HEAD
                                <p>
                                    #{topicName}
                                </p>
=======
                                <p>#{topic.trim()}</p>
>>>>>>> d78cf95bdd8ab18195294ce86e938bab9cd93cac
                            </div>
                        ) : null;
                    })}
            </Row>
        );
    }
    return (
        <div className="squirrelCard">
            {!post.gallery ? (
                <div className="leftSideWrapper">
                    <div className="buttons">
                        <Arrow class="up" id={post.id} />
                        <p className="votes">{votes}</p>
                        <Arrow class="down" id={post.id} />
                    </div>
                    {onDelete &&
                    user.isLoggedIn &&
                    user.profile &&
                    post.owner == user.profile.id ? (
                        <Col>
                            <IconButton
                                className="deleteButton"
                                onClick={() => onDelete(post.id)}
                            >
                                <DeleteIcon />
                            </IconButton>
                            <IconButton
                                className="deleteButton"
                                onClick={() => onDelete(post.id)}
                            >
                                <CreateIcon />
                            </IconButton>
                        </Col>
                    ) : null}
                    <GetEmbedLink />
                </div>
            ) : (
                <div className="leftSideWrapper">
                    <GetEmbedLink />
                </div>
            )}
            <div>
                <br />
                <p className="CardStory">{post.note}</p>
                {/* Renders delete button only if this component is passed onDelete */}

                {redirect}
            </div>
            <Hashtags className="HashtagsRow">
                {areURLs ? topicName : post.topics}
            </Hashtags>
        </div>
    );
}

export default Card;
