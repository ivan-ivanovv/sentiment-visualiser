import React from "react";
import styled from "styled-components";
import VideoContainer from "../components/VideoContainer";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  background-color: #fafafa;
  height: 100vh;
`;

const Contents = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
`;

const Footer = styled.div`
  padding: 2vh;
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100vh;
`;

const Header = styled.p`
  color: #707070;
  font-size: 40px;
  font-weight: 300;
  margin: 1%;
`;

const FooterLink = styled.p`
  color: #707070;
  font-size: 16px;
  padding: 0 1%;
`;

const Main = () => {
  
  return (
    <Container>
      <Header>
        Sentiment Analysis of 2016 and 2020 US Presidential Debates on YouTube
      </Header>

      <Contents>
        <VideoContainer year="2016" />
        <VideoContainer year="2020" />
      </Contents>

      <Footer>
        <FooterLink>US Presidential Debates</FooterLink>
        <FooterLink>About This Project</FooterLink>
      </Footer>
    </Container>
  );
};

export default Main;
