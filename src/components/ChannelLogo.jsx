import React from "react";
import styled from "styled-components";
import cbsLogo from "../assets/cbs_news.svg";
import nbcLogo from "../assets/nbc_news.svg";

const Logo = styled.img`
  height: ${({ height }) => height};
  ${({ white }) => white && "filter:invert(1)"};
  padding: 15px;
`;

const ChannelLogo = (props) => {
  const { channel, white, height } = props;
  let logo;
  switch (channel) {
    case "NBC News":
      logo = nbcLogo;
      break;
    case "CBS News":
      logo = cbsLogo;
      break;
  }

  return <Logo {...{ white, height }} src={logo} />;
};

export default ChannelLogo;
