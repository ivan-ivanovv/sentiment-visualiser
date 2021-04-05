import React, { useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import CommentsTable from "./CommentsTable";
import LineChart from "./LineChart";

import { VideoContext } from "../contexts/videoContext";
import VideoList from "./VideoList";
import Snippet from "./Snippet";

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

const DetailsTabs = ({ dataLoading }) => {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const { videoData, videoComments } = useContext(VideoContext);
  const { events: videoEvents, data } = videoData;
  const { comments, insights, scores } = videoComments;

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
        <Tab disableRipple label="Comments" disabled={dataLoading} />
        <Tab disableRipple label="Compare" disabled={dataLoading} />
      </Tabs>
      <TabPanel {...{ value }} index={0}>
        <LineChart
          title="Daily average sentiment intensity"
          dataSet={scores}
          {...{ dataLoading, videoEvents }}
        />
        <div style={{ display: "flex" }}>
          <Snippet
            title="Most positive comment"
            data={insights?.mostPos}
            {...{ dataLoading }}
          />
          <Snippet
            title="Most negative comment"
            data={insights?.mostNeg}
            {...{ dataLoading }}
          />
        </div>
      </TabPanel>
      <TabPanel {...{ value }} index={1}>
        <CommentsTable dataSet={comments} />
      </TabPanel>
      <TabPanel {...{ value }} index={2}>
        <LineChart
          title={data?.title}
          containerHeight="35vh"
          containerWidth="95%"
          dataSet={scores}
          {...{ dataLoading, videoEvents }}
        />
        <VideoList />
      </TabPanel>
    </div>
  );
};

export default DetailsTabs;
