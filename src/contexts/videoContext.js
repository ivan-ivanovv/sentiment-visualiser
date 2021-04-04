import React, { useState, createContext, useCallback } from "react";

export const VideoContext = createContext();

const VideoProvider = ({ children }) => {
  const [videoId, setVideoId] = useState();
  const [videoYear, setVideoYear] = useState();
  const [videoData, setVideoData] = useState({});

  const updateCurrentVideo = (videoId, year) => {
    setVideoId(videoId);
    setVideoYear(year);
  };

  const resetCurrentVideo = useCallback(() => {
    setVideoData({});
    videoId("");
  }, []);

  return (
    <VideoContext.Provider
      value={{
        videoId,
        resetCurrentVideo,
        updateCurrentVideo,
        videoData,
        videoYear,
      }}
    >
      {children}
    </VideoContext.Provider>
  );
};

export default VideoProvider;
