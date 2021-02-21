import "./Search.css";
import React, { useState } from "react";
import SearchIcon from "@material-ui/icons/Search";

function Search(props) {
    const [value, setValue] = useState("");
    const [posts, setPosts] = useState([]);

    function search(e) {
        e.preventDefault();
        props.getStories(props.stories, value);
        setValue("");
    }

    return (
        <div className="searchContainer">
            <SearchIcon />
            <form>
                <input
                    className="gallerySearchBar"
                    onChange={(e) => {
                        setValue(e.target.value);
                    }}
                    value={value}
                ></input>
                <button
                    type="submit"
                    onClick={(e) => {
                        search(e);
                    }}
                    style={{ display: "none" }}
                />
            </form>
        </div>
    );
}

export default Search;
