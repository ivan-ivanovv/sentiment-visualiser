import React, { useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import CommentsTable from "./CommentsTable";
import LineChart from "./LineChart";

import { VideoContext } from "../contexts/videoContext";

const useStyles = makeStyles({
  indicator: {
    background: "linear-gradient(-90deg, #ff0000c6, #0015bcc6)",
  },
});

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && children}
    </div>
  );
}

const DetailsTabs = () => {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const { comments } = useContext(VideoContext);

  return (
    <div>
      <Tabs
        {...{ value }}
        onChange={(e, value) => setValue(value)}
        variant="fullWidth"
        classes={{
          indicator: classes.indicator,
        }}
      >
        <Tab disableRipple label="Analytics" />
        <Tab disableRipple label="Comments" disabled={comments.length == 0} />
      </Tabs>
      <TabPanel {...{ value }} index={0}>
        <LineChart dataSet={comments} />
      </TabPanel>
      <TabPanel {...{ value }} index={1}>
        <CommentsTable dataSet={comments} />
      </TabPanel>
    </div>
  );
};

export default DetailsTabs;
