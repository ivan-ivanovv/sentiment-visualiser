import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { ResponsiveLine } from "@nivo/line";
import CircularProgress from "@material-ui/core/CircularProgress";

const Container = styled.div`
  background: #fff;
  display: flex;
  flex-direction: column;
  height: ${({ containerHeight }) => containerHeight};
  width: ${({ containerWidth }) => containerWidth};
  margin: 2% 2%;
  padding: 1%;
  border-radius: 10px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.16);
`;

const TooltipContainer = styled.div`
  background: white;
  padding: 9px 15px;
  border-radius: 5px;
  align-items: flex-start;
  display: flex;
  flex-direction: column;
`;

const ChartTitle = styled.p`
  color: #707070;
  font-size: 24px;
  font-weight: 300;
  margin: 1%;
`;

const LineChart = ({
  title,
  dataSet,
  videoEvents,
  dataLoading,
  containerHeight = "55vh",
  containerWidth = "70%",
}) => {
  const [dataArray, setDataArray] = useState([]);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    if (!dataLoading) {
      const newEvents = [];
      const newDataArray = [
        {
          id: "positive",
          data: [],
        },
        {
          id: "neutral",
          data: [],
        },
        {
          id: "negative",
          data: [],
        },
      ];

      for (let score of dataSet) {
        const { _id, avgCompound } = score;
        const category =
          avgCompound >= 0.05 ? "pos" : avgCompound <= -0.05 ? "neg" : "neu";

        newDataArray[0].data.push({
          x: _id,
          y: category === "pos" ? avgCompound.toPrecision(3) : 0,
        });
        newDataArray[1].data.push({
          x: _id,
          y: category === "neu" ? avgCompound.toPrecision(3) : 0,
        });
        newDataArray[2].data.push({
          x: _id,
          y: category === "neg" ? avgCompound.toPrecision(3) : 0,
        });
      }

      for (let event of videoEvents) {
        newEvents.push({
          axis: "x",
          value: new Date(event.date),
          lineStyle: { stroke: event.color, strokeWidth: 2 },
          textStyle: {fontWeight: 500 },
          legend: event.name,
          legendOrientation: "vertical",
        });
      }

      setDataArray(newDataArray);
      setEvents(newEvents);
    }
  }, [dataLoading]);

  return (
    <Container {...{ containerHeight, containerWidth }}>
      <ChartTitle>{title}</ChartTitle>

      {dataLoading ? (
        <CircularProgress style={{ alignSelf: "center", margin: "auto" }} />
      ) : (
        <ResponsiveLine
          data={dataArray}
          curve="step"
          margin={{ top: 10, bottom: 90, left: 60, right: 50 }}
          lineWidth={1}
          colors={[
            "rgb(97, 205, 187)",
            "rgb(244, 171, 98)",
            "rgb(244, 117, 96)",
          ]}
          layers={[
            "grid",
            "axes",
            "areas",
            "crosshair",
            "lines",
            "points",
            "slices",
            "mesh",
            "legends",
            "markers",
          ]}
          markers={events}
          xScale={{
            type: "time",
            format: "%Y-%m-%d",
            useUTC: false,
            precision: "day",
          }}
          xFormat="time:%b %d %Y"
          yScale={{ type: "linear", min: -1, max: 1 }}
          gridYValues={[-1, 0, 1]}
          gridXValues={[new Date("2021-01-20")]}
          axisBottom={{
            format: "%b %d %Y",
            tickValues: 6,
            tickSize: 10,
          }}
          axisLeft={{
            tickValues: [-1, 0, 1],
            legend: "Sentiment Intensity",
            legendOffset: -40,
            legendPosition: "middle",
          }}
          motionConfig="gentle"
          enableArea
          areaBaselineValue={0}
          areaOpacity={0.07}
          enablePoints={false}
          useMesh
          enableSlices={false}
          tooltip={({ point }) => {
            return (
              <TooltipContainer>
                <strong>{point.data.xFormatted}</strong>
                <div
                  key={point.id}
                  style={{
                    color: point.serieColor,
                    padding: "3px 0",
                    display: "flex",
                    justifyContent: "space-between",
                    flexDirection: "row",
                  }}
                >
                  <strong>{point.data.yFormatted}</strong>
                </div>
              </TooltipContainer>
            );
          }}
        />
      )}
    </Container>
  );
};

export default LineChart;
