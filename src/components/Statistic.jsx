import React from "react";
import styled from "styled-components";

const Left = styled.p`
  margin: 0;
  color: #707070;
  font-size: 20px;
  text-transform: uppercase;
  font-weight: 400;
`;

const Right = styled.p`
  margin: 0;
  font-size: 24px;
  text-transform: uppercase;
  font-weight: 600;
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 60%;
  padding: 15px 0;
`;

const Statistic = ({ left, right }) => {
  return (
    <Container>
      <Left>{left}</Left>
      <Right>{right}</Right>
    </Container>
  );
};

export default Statistic;
