import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { ResponsivePie } from "@nivo/pie";
import CircularProgress from "@material-ui/core/CircularProgress";

import ChannelLogo from "../components/ChannelLogo";
import Statistic from "../components/Statistic";
import Video from "../components/Video";
import DetailsTabs from "../components/DetailsTabs";
import BackButton from "../components/BackButton";

import { VideoContext } from "../contexts/videoContext";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  padding: 2vh;
  height: 94vh;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  align-content: flex-start;
  width: ${({ width }) => width};
`;

const VideoName = styled.p`
  font-size: 24px;
  font-weight: 400;
  margin: 5% 0;
  align-self: flex-start;
`;

const StatsContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 2% 0;
  align-items: flex-start;
`;

const Disclaimer = styled.p`
  color: #707070;
  font-size: 14px;
  padding: 0 1%;
`;

const CenteredMetric = ({ centerX, centerY }) => {
  return (
    <text
      x={centerX}
      y={centerY}
      textAnchor="middle"
      dominantBaseline="central"
      style={{
        fontSize: "14px",
        fontWeight: "600",
      }}
    >
      LIKES / DISLIKES
    </text>
  );
};

const Detailed = () => {
  const {
    videoId,
    videoData,
    videoYear,
    comments,
    updateCurrentData,
  } = useContext(VideoContext);
  const [loading, setLoading] = useState(false);
  const collectedOn = videoData
    ? new Date(videoData.collectedOn).toDateString()
    : "";

  useEffect(() => {
    setLoading(true);

    fetch(`/api/comments/${videoYear}/${videoId}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        const comments = JSON.parse(data.result.comments);
        const video = JSON.parse(data.result.video);
        const scores = JSON.parse(data.result.scores);
        const events = JSON.parse(data.result.events);

        updateCurrentData(video, events, comments, scores);
        setLoading(false);
      })
      .catch(console.log);
  }, []);

  const likes = [
    {
      id: "likes",
      label: "Likes",
      value: videoData ? videoData.likes : 0,
      color: "hsl(130, 90%, 36%)",
    },
    {
      id: "dislikes",
      label: "Dislikes",
      value: videoData ? videoData.dislikes : 0,
      color: "hsl(360, 85%, 46%)",
    },
  ];

  return (
    <Container>
      {/* LEFT COLUMN */}
      <Column width="25%">
        <BackButton />

        {loading ? (
          <CircularProgress style={{ alignSelf: "center", margin: "auto" }} />
        ) : (
          <>
            <VideoName>{videoData.title}</VideoName>
            <Video {...{ videoId }} width="100%" />

            <Disclaimer>Data extracted on: {collectedOn}</Disclaimer>

            <StatsContainer>
              <Statistic
                left="channel"
                right={
                  <ChannelLogo channel={videoData.uploadedBy} height="24px" />
                }
              />
              <Statistic left="views" number={videoData.views} />
              <Statistic left="comments" number={videoData.comments} />
              <Statistic left="analysed comments" number={comments.length} />
            </StatsContainer>

            {/* LIKE/DISLIKE PIE */}
            <div style={{ height: "20%" }}>
              <ResponsivePie
                data={likes}
                colors={{ datum: "data.color" }}
                sliceLabel={(e) => (e.value / 1000).toFixed(0) + "K"}
                theme={{ fontSize: "16px", fontWeight: 500 }}
                enableRadialLabels={false}
                innerRadius={0.75}
                cornerRadius={3}
                padAngle={3}
                sliceLabelsSkipAngle={10}
                sliceLabelsTextColor="#fff"
                layers={["slices", "sliceLabels", CenteredMetric]}
              />
            </div>
          </>
        )}
      </Column>

      {/* RIGHT COLUMN */}
      <Column width="70%">
        <DetailsTabs dataLoading={loading} />
      </Column>
    </Container>
  );
};

export default Detailed;
