import React from "react";
import { useHistory } from "react-router-dom";

import IconButton from "@material-ui/core/IconButton";
import ChevronLeft from "@material-ui/icons/ChevronLeft";

const BackButton = () => {
  const history = useHistory();
  
  return (
    <IconButton
      onClick={history.goBack}
      aria-label="back button"
      style={{ width: "40px", height: "40px" }}
    >
      <ChevronLeft fontSize="large" />
    </IconButton>
  );
};

export default BackButton;
