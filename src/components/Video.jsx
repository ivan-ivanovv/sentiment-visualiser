import React from "react";
import styled from "styled-components";

const Thumbnail = styled.img`
  width: ${({ width }) => width || "75%"};
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.45);
  ${({ clickable }) => clickable && `
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

const Video = ({ width, onClick }) => {
  const clickable = onClick != null;
  return (
    <div>
      <Thumbnail
        {...{ onClick, width, clickable }}
        className="thumbnailButton"
        src={"http://i3.ytimg.com/vi/9HnKFUNlcfY/maxresdefault.jpg"}
      />
    </div>
  );
};

export default Video;
