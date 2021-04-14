import React, {useState} from "react";
import IconButton from "@material-ui/core/IconButton";
import CodeIcon from "@material-ui/icons/Code";
import "./EmbedLink.css";

const EmbedLink = ({post}) => {
    const [copied, setCopied] = useState("Copy Embed Link");

    const copyLink = () => {
        setCopied("Copied!");
        navigator.clipboard.writeText(
            `<iframe src="${window.location.origin}/card/${post.id}" title="Sqrrlz Card" />`
        );
    }

    return (
        <div className="tooltip">
            <IconButton
                className="copier"
                onMouseOut={() => setCopied("Copy Embed Link")}
                onClick={() => copyLink()}
            >
                <span className="tooltiptext" id="myTooltip">
                    {copied}
                </span>
                <CodeIcon className="codeIcon" />
            </IconButton>
        </div>
    );
}

export default EmbedLink;