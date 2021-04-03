import React from "react";
import styled from "styled-components";
import { ResponsivePie } from "@nivo/pie";

import ChannelLogo from "../components/ChannelLogo";
import Statistic from "../components/Statistic";
import Video from "../components/Video";
import DetailsTabs from "../components/DetailsTabs";
import BackButton from "../components/BackButton";

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
  font-size: 30px;
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

const CenteredMetric = ({ centerX, centerY }) => {
  return (
    <text
      x={centerX}
      y={centerY}
      textAnchor="middle"
      dominantBaseline="central"
      style={{
        fontSize: "20px",
        fontWeight: "600",
      }}
    >
      LIKES / DISLIKES
    </text>
  );
};

const Detailed = () => {
  const likes = [
    {
      id: "likes",
      label: "Likes",
      value: 57000,
      color: "hsl(130, 90%, 36%)",
    },
    {
      id: "dislikes",
      label: "Dislikes",
      value: 8900,
      color: "hsl(360, 85%, 46%)",
    },
  ];
  return (
    <Container>
      <Column width="25%">
        <BackButton />

        <VideoName>First Presidential Debate 2020</VideoName>
        <Video width="100%" />

        <StatsContainer>
          <ChannelLogo channel="cbs" height="24px" />
          <Statistic label="views" number="1.5M" />
          <Statistic label="comments" number="15K" />
        </StatsContainer>
        <div style={{ height: "30%" }}>
          <ResponsivePie
            data={likes}
            colors={{ datum: "data.color" }}
            sliceLabel={(e) => e.value / 1000 + "K"}
            theme={{ fontSize: "16px", fontWeight: 500 }}
            enableRadialLabels={false}
            innerRadius={0.7}
            cornerRadius={3}
            padAngle={3}
            sliceLabelsSkipAngle={10}
            sliceLabelsTextColor="#fff"
            layers={["slices", "sliceLabels", CenteredMetric]}
          />
        </div>
      </Column>
      <Column width="70%">
        <DetailsTabs />
      </Column>
    </Container>
  );
};

export default Detailed;
