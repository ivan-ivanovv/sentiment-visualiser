import React from "react";
import styled from "styled-components";
import {useCountUp} from 'react-countup';

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

const Statistic = ({ left, number, right }) => {
  const {countUp} = useCountUp({
    end: number,
    separator: " "
  })

  return (
    <Container>
      <Left>{left}</Left>
      <Right>{right ? right : countUp}</Right>
    </Container>
  );
};

export default Statistic;
