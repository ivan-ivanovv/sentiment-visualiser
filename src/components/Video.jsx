import React, { useState, useEffect } from "react";
import styled from "styled-components";
import CircularProgress from "@material-ui/core/CircularProgress";

const Thumbnail = styled.img`
  width: ${({ width }) => width || "75%"};
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.45);
  ${({ clickable }) =>
    clickable &&
    `
    &:hover {
      opacity: 0.9;
      transition: opacity 0.1s ease;
    }

    &:active {
      opacity: 0.75;
      transition: opacity 0.1s ease;
    }
  `}
`;

const Video = ({ videoId, width, onClick }) => {
  const [thumbnail, setThumbnail] = useState("");
  const [loading, setLoading] = useState(true);
  const clickable = onClick != null;

  useEffect(() => {
    fetch(`/api/video/${videoId}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        const video = JSON.parse(data.result.video);
        setThumbnail(video.thumbnail.url);
        setLoading(false);
      })
      .catch(console.log);
  }, []);

  return (
    <div>
      {loading ? (
        <CircularProgress color="white" style={{ alignSelf: "center", margin: "auto" }} />
      ) : (
        <Thumbnail
          {...{ onClick, width, clickable }}
          className="thumbnailButton"
          src={thumbnail}
        />
      )}
    </div>
  );
};

export default Video;
