import React from "react";
import styled from "styled-components";

const Label = styled.p`
  color: #707070;
  font-size: 20px;
  text-transform: uppercase;
  font-weight: 400;
`;

const Number = styled.p`
  font-size: 24px;
  text-transform: uppercase;
  font-weight: 600;
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 50%;
`;

const Statistic = ({ label, number }) => {
  return (
    <Container>
      <Label>{label}</Label>
      <Number>{number}</Number>
    </Container>
  );
};

export default Statistic;
