import React from "react";
import styled from "styled-components";
import Video from "../components/Video";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  padding: 5vh;
  height: 90vh;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  width: ${({ width }) => width};
  height: 100%;
  padding: 2% 0 0 0;
  border: 1px solid red;
`;

const VideoName = styled.p`
  font-size: 30px;
  font-weight: 400;
  margin: 5%;
  align-self: flex-start
`;

const Detailed = () => {
  return (
    <Container>
      <Column width="35%">
        <Video width="90%" />
        <VideoName>First Presidential Debate 2020</VideoName>
      </Column>
      <Column width="60%"></Column>
    </Container>
  );
};

export default Detailed;
