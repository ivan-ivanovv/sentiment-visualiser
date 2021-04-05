import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { ResponsiveLine } from "@nivo/line";

const Container = styled.div`
  background: #fff;
  display: flex;
  flexgrow: 1;
  height: 60vh;
  width: 60%;
  margin: 5% 2%;
  padding: 1%;
  border-radius: 10px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.16);
`;

const LineChart = ({ dataSet }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (dataSet.length >= 0) setLoading(false);
  }, [dataSet]);

  const chartDataArray = [
    {
      id: "positive",
      data: [],
    },
    {
      id: "negative",
      data: [],
    },
  ];

  for (let i = 0; i < dataSet.length; i++) {
    const isPositive = dataSet[i].polarity === "pos";
    const score = dataSet[i].score.compound.toPrecision(2);

    chartDataArray[0].data.push({
      x: dataSet[i].publishedAt,
      y: isPositive ? score : 0,
    });
    chartDataArray[1].data.push({
      x: dataSet[i].publishedAt,
      y: isPositive ? 0 : score,
    });
  }

  return (
    <Container>
      <ResponsiveLine
        data={chartDataArray}
        curve="monotoneX"
        margin={{ top: 20, bottom: 60, left: 60, right: 50 }}
        colors={["rgb(97, 205, 187)", "rgb(244, 117, 96)"]}
        xScale={{
          type: "time",
          format: "%Y-%m-%dT%H:%M:%S%Z",
          useUTC: false,
          precision: "day",
        }}
        xFormat="time:%b %d %Y"
        yScale={{ type: "linear", min: -1, max: 1 }}
        gridYValues={[-1, 0, 1]}
        axisBottom={{
          format: "%b %d %Y",
          legend: "Date",
          legendOffset: 50,
          legendPosition: "middle",
        }}
        axisLeft={{
          tickValues: [-1, 0, 1],
          tickSize: 2,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Sentiment Intensity",
          legendOffset: -40,
          legendPosition: "middle",
        }}
        lineWidth={1}
        enablePoints={false}
        animate={false}
        enableSlices={false}
        useMesh
        enableArea
        areaBaselineValue={0}
        areaOpacity={0.07}
      />
    </Container>
  );
};

export default LineChart;
