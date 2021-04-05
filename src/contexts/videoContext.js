import React, { useState, createContext } from "react";

export const VideoContext = createContext();

const VideoProvider = ({ children }) => {
  const [videoData, setVideoData] = useState({
    id: null,
    year: null,
    data: null,
    events: [],
  });
  const [videoComments, setVideoComments] = useState({
    comments: [],
    scores: [],
    insights: null,
  });

  const updateCurrentVideo = (videoId, year) => {
    setVideoData((prevState) => {
      return { ...prevState, id: videoId, year };
    });
  };

  const updateCurrentData = (videoData, events, comments, scores, insights) => {
    setVideoData((prevState) => {
      return { ...prevState, data: videoData, events };
    });
    setVideoComments((prevState) => {
      return { ...prevState, comments, scores, insights };
    });
  };

  const resetCurrentVideo = () => {
    setVideoData({
      id: null,
      year: null,
      data: null,
      events: [],
    });
    setVideoComments({
      comments: [],
      scores: [],
      insights: null,
    });
  };

  return (
    <VideoContext.Provider
      value={{
        videoData,
        videoComments,
        resetCurrentVideo,
        updateCurrentVideo,
        updateCurrentData,
      }}
    >
      {children}
    </VideoContext.Provider>
  );
};

export default VideoProvider;
