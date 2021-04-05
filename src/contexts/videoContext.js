import React, { useState, createContext } from "react";

export const VideoContext = createContext();

const VideoProvider = ({ children }) => {
  const [videoId, setVideoId] = useState();
  const [videoYear, setVideoYear] = useState();
  const [comments, setComments] = useState([]);
  const [scores, setScores] = useState([]);
  const [videoData, setVideoData] = useState({});
  const [videoEvents, setVideoEvents] = useState([{}]);

  const updateCurrentVideo = (videoId, year) => {
    setVideoId(videoId);
    setVideoYear(year);
  };

  const updateCurrentData = (videoData, events, comments, scores) => {
    setComments(comments);
    setScores(scores);
    setVideoData(videoData);
    setVideoEvents(events);
  };

  const resetCurrentVideo = () => {
    setComments([]);
    setScores([]);
    setVideoData({});
    setVideoEvents([]);
    setVideoYear();
    setVideoId();
  };

  return (
    <VideoContext.Provider
      value={{
        videoId,
        videoData,
        videoEvents,
        videoYear,
        comments,
        scores,
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
