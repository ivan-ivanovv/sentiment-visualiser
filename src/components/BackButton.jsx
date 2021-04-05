import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeft from "@material-ui/icons/ChevronLeft";

import { VideoContext } from "../contexts/videoContext";

const BackButton = () => {
  const history = useHistory();
  const { resetCurrentVideo } = useContext(VideoContext);

  return (
    <IconButton
      onClick={() => {
        resetCurrentVideo();
        history.goBack();
      }}
      aria-label="back button"
      style={{ width: "40px", height: "40px" }}
    >
      <ChevronLeft fontSize="large" />
    </IconButton>
  );
};

export default BackButton;
