import React, { useState, createContext, useCallback } from "react";

export const VideoContext = createContext();

const VideoProvider = ({ children }) => {
  const [videoId, setVideoId] = useState();
  const [videoYear, setVideoYear] = useState();
  const [comments, setComments] = useState([]);
  const [videoData, setVideoData] = useState({});

  const updateCurrentVideo = (videoId, year) => {
    setVideoId(videoId);
    setVideoYear(year);
  };

  const updateCurrentComments = (comments) => {
    setComments(comments);
  };

  const updateCurrentVideoData = (videoData) => {
    setVideoData(videoData);
  };

  const resetCurrentVideo = useCallback(() => {
    setComments([{}]);
    setVideoId();
  }, []);

  return (
    <VideoContext.Provider
      value={{
        videoId,
        videoData,
        videoYear,
        comments,
        resetCurrentVideo,
        updateCurrentVideo,
        updateCurrentComments,
        updateCurrentVideoData,
      }}
    >
      {children}
    </VideoContext.Provider>
  );
};

export default VideoProvider;
