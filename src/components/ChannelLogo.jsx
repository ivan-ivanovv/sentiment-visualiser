import React from "react";
import styled from "styled-components";
import cbsLogo from "../assets/cbs_news.svg";
import nbcLogo from "../assets/nbc_news.svg";

const Logo = styled.img`
  height: 32px;
  filter: invert(1);
  padding: 15px;
`;

const ChannelLogo = (props) => {
  let logo;
  switch (props.channel) {
    case "nbc":
      logo = nbcLogo;
      break;
    case "cbs":
      logo = cbsLogo;
      break;
  }

  return <Logo src={logo} />;
};

export default ChannelLogo;
