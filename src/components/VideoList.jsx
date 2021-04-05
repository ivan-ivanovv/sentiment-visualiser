import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeft from "@material-ui/icons/ChevronLeft";

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
  flex-direction: ${({ selectedVideo }) => (selectedVideo ? "column" : "row")};
  justify-content: space-evenly;
  width: 100%;
`;

const VideoList = () => {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [selectedData, setSelectedData] = useState({
    title: "",
    scores: [],
    events: [],
  });
  const [loading, setLoading] = useState(true);
  const { videoData } = useContext(VideoContext);
  const { id: videoId } = videoData;

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
    setLoading(true);
    selectedVideo &&
      fetch(`/api/comments/${selectedVideo.year}/${selectedVideo.id}`, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((data) => {
          const scores = JSON.parse(data.result.scores);
          const events = JSON.parse(data.result.events);
          const video = JSON.parse(data.result.video);

          setSelectedData({ title: video.title, scores, events });
          setLoading(false);
        })
        .catch(console.log);
  }, [selectedVideo]);

  return (
    <Container {...{ selectedVideo }}>
      {selectedVideo && (
        <IconButton
          onClick={() => {
            setSelectedVideo(null);
          }}
          aria-label="back button"
          style={{ width: "40px", height: "40px" }}
        >
          <ChevronLeft fontSize="large" />
        </IconButton>
      )}
      {!selectedVideo ? (
        renderVideos()
      ) : (
        <LineChart
          title={selectedData.title}
          containerHeight="35vh"
          containerWidth="95%"
          dataSet={selectedData.scores}
          videoEvents={selectedData.events}
          dataLoading={loading}
        />
      )}
    </Container>
  );
};

export default VideoList;
