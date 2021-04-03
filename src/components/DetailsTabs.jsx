import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import CommentsTable from "./CommentsTable";

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

  return (
    <div>
      <Tabs
        {...{value}}
        onChange={(e, value) => setValue(value)}
        variant="fullWidth"
        classes={{
          indicator: classes.indicator,
        }}
      >
        <Tab disableRipple label="Analytics" />
        <Tab disableRipple label="Comments" />
      </Tabs>
      <TabPanel {...{value}} index={1}>
        <CommentsTable />
      </TabPanel>
    </div>
  );
};

export default DetailsTabs;
