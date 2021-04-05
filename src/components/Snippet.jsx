import React from "react";
import styled from "styled-components";
import CircularProgress from "@material-ui/core/CircularProgress";
import Tooltip from "@material-ui/core/Tooltip";

import Statistic from "../components/Statistic";

const Container = styled.div`
  background: #fff;
  display: flex;
  flex-direction: column;
  height: 20vh;
  width: 100%;
  margin: 2% 2%;
  padding: 1%;
  border-radius: 10px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.16);
`;

const Title = styled.p`
  color: #707070;
  font-size: 16px;
  font-weight: 300;
  margin: 1%;
`;

const BodyText = styled.p`
  color: #505050;
  font-style: italic;
  font-size: 14px;
  margin: 1%;
`;

const Snippet = ({ title, data, dataLoading }) => {
  return (
    <Container>
      {dataLoading ? (
        <CircularProgress style={{ alignSelf: "center", margin: "auto" }} />
      ) : (
        <>
          <Title>{title}</Title>
          <div style={{ display: "flex", padding: "0 10%" }}>
            <Statistic
              fontSize="14px"
              left="score"
              right={data?.score?.compound}
            />
            <div style={{ width: "10%" }} />
            <Statistic fontSize="14px" left="likes" number={data?.likeCount} />
          </div>
          <Tooltip title={data?.text}>
            <BodyText>"{data?.text.substring(0, 200)}..."</BodyText>
          </Tooltip>
        </>
      )}
    </Container>
  );
};

export default Snippet;
