import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";

import Video from "./Video";
import LineChart from "./LineChart";

import { VideoContext } from "../contexts/videoContext";

const videoIds = [
  {
    id: "9HnKFUNlcfY",
    year: 2020,
  },
  {
    id: "5cathmZFeXs",
    year: 2020,
  },
  {
    id: "s7gDXtRS0jo",
    year: 2016,
  },
  {
    id: "855Am6ovK7s",
    year: 2016,
  },
];

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  width: 100%;
  margin: 5% 0;
`;

const VideoList = () => {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [videoData, setVideoData] = useState({
    title: "",
    scores: [],
    events: [],
  });
  const [loading, setLoading] = useState(true);
  const { videoId } = useContext(VideoContext);

  const renderVideos = () => {
    return videoIds
      .filter((video) => video.id !== videoId)
      .map((video) => (
        <Video
          videoId={video.id}
          onClick={() => setSelectedVideo(video)}
          width="85%"
        />
      ));
  };

  useEffect(() => {
    selectedVideo &&
      fetch(`/api/comments/${selectedVideo.year}/${selectedVideo.id}`, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((data) => {
          const scores = JSON.parse(data.result.scores);
          const events = JSON.parse(data.result.events);
          const video = JSON.parse(data.result.video);

          setVideoData({ title: video.title, scores, events });
          setLoading(false);
        })
        .catch(console.log);
  }, [selectedVideo]);

  return (
    <Container>
      {!selectedVideo ? (
        renderVideos()
      ) : (
        <LineChart
          title={videoData.title}
          containerHeight="35vh"
          containerWidth="95%"
          dataSet={videoData.scores}
          videoEvents={videoData.events}
          dataLoading={loading}
        />
      )}
    </Container>
  );
};

export default VideoList;
