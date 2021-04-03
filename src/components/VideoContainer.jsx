import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

import Video from "./Video";
import ChannelLogo from "./ChannelLogo";

const Container = styled.div`
  flex-direction: column;
  margin: 0 5%;
`;

const Year = styled.p`
  color: #000;
  font-size: 35px;
  letter-spacing: 10px;
`;

const BackgroundCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  padding: 10px 0;
  height: 65vh;
  width: 55vh;
  background: linear-gradient(-45deg, #ff0000d6, #0015bcd6);
  border-radius: 20px;
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.3);
`;

const VideoContainer = (props) => {
  const history = useHistory();

  return (
    <Container>
      <Year>{props.year}</Year>
      <BackgroundCard>
        <div>
          <ChannelLogo channel="cbs" white height="32px" />
          <Video width="75%" onClick={() => history.push("/details")} />
        </div>
        <div>
          <ChannelLogo channel="nbc" white height="32px" />
          <Video width="75%" />
        </div>
      </BackgroundCard>
    </Container>
  );
};

export default VideoContainer;
