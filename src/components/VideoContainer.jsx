import React from "react";
import Video from "./Video";
import ChannelLogo from "./ChannelLogo";

import styled from "styled-components";

const Container = styled.div`
  flex-direction: column;
  margin: 0 5%;
`;

const Year = styled.p`
  color: #000;
  font-size: 35px;
  letter-spacing: 20px;
`;

const BackgroundCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  padding: 10px 0;
  height: 65vh;
  width: 55vh;
  background: linear-gradient(-45deg, #ff0000c6, #0015bcc6);
  border-radius: 20px;
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.3);
`;

const VideoContainer = (props) => {
  return (
    <Container>
      <Year>{props.year}</Year>
      <BackgroundCard>
        <div>
          <ChannelLogo channel="cbs" />
          <Video width="75%" />
        </div>
        <div>
          <ChannelLogo channel="nbc" />
          <Video width="75%" />
        </div>
      </BackgroundCard>
    </Container>
  );
};

export default VideoContainer;
