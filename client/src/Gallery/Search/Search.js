import "./Search.css";
import React, { useState } from "react";
import SearchIcon from "@material-ui/icons/Search";

function Search() {
    const [value, setValue] = useState("");
    return (
        <div className="searchContainer">
            <SearchIcon />
            <input
                className="search"
                onChange={(e) => {
                    setValue(e.target.value);
                }}
                value={value}
            ></input>
        </div>
    );
}

export default Search;
