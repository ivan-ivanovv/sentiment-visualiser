import React from "react";
import styled from "styled-components";
import { useCountUp } from "react-countup";

const Left = styled.p`
  margin: 0;
  color: #707070;
  font-size: ${({ fontSize }) => fontSize};
  text-transform: uppercase;
  font-weight: 400;
`;

const Right = styled.p`
  margin: 0;
  font-size: ${({ fontSize }) => fontSize};
  text-transform: uppercase;
  font-weight: 600;
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 15px 0;
`;

const Statistic = ({ left, number, right, fontSize = "20px" }) => {
  const { countUp } = useCountUp({
    end: number,
    separator: " ",
  });

  return (
    <Container>
      <Left {...{ fontSize }}>{left}</Left>
      <Right {...{ fontSize }}>{right ? right : countUp}</Right>
    </Container>
  );
};

export default Statistic;
