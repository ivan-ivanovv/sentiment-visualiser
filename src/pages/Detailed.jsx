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
  const { videoData, videoComments, updateCurrentData } = useContext(
    VideoContext
  );
  const { id: videoId, year: videoYear, data } = videoData;
  const { comments } = videoComments;

  const [loading, setLoading] = useState(true);
  const collectedOn = data && new Date(data?.collectedOn).toDateString();

  useEffect(() => {
    setLoading(true);

    videoId && fetch(`/api/comments/${videoYear}/${videoId}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        const result = data.result;
        const comments = JSON.parse(result.comments);
        const video = JSON.parse(result.video);
        const scores = JSON.parse(result.scores);
        const events = JSON.parse(result.events);
        const insights = result.insights;
        const insightsParsed = {
          mostPos: JSON.parse(insights.mostPos),
          mostNeg: JSON.parse(insights.mostNeg),
        };

        updateCurrentData(video, events, comments, scores, insightsParsed);
        setLoading(false);
      })
      .catch(console.log);
  }, [videoId]);

  const likes = [
    {
      id: "likes",
      label: "Likes",
      value: data ? data.likes : 0,
      color: "hsl(130, 90%, 36%)",
    },
    {
      id: "dislikes",
      label: "Dislikes",
      value: data ? data.dislikes : 0,
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
            <VideoName>{data?.title}</VideoName>
            <Video {...{ videoId }} width="100%" />

            <Disclaimer>Data collected on: {collectedOn}</Disclaimer>

            <StatsContainer>
              <Statistic
                left="channel"
                right={<ChannelLogo channel={data?.uploadedBy} height="24px" />}
              />
              <Statistic left="views" number={data?.views} />
              <Statistic left="comments" number={data?.comments} />
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
