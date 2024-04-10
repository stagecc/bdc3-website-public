import React from "react";
import { ResponsivePie } from "@nivo/pie";
import { Subheading } from "../typography";
import { Alert } from "../alert";

export const PieChart = ({ title = "", data, height = 500, ...props }) => {
  if (data.length === 0) {
    return (
      <div style={{ width: "30%", margin: "auto" }}>
        <Alert type="warning" message="No data available for pie chart!" />
      </div>
    );
  }
  return (
    <div
      style={{
        height: `${height}px`,
        textAlign: "center",
        borderBottom: "1px solid var(--color-lightgrey)",
        paddingBottom: "4rem"
      }}
    >
      {title && <Subheading center>{title}</Subheading>}
      <ResponsivePie
        data={data}
        margin={{ top: 100, right: 120, bottom: 100, left: 120 }}
        innerRadius={0.5}
        padAngle={0.75}
        cornerRadius={1}
        colors={{ scheme: "red_blue" }}
        borderWidth={1}
        borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
        radialLabelsTextColor="#333333"
        radialLabelsLinkColor={{ from: "color" }}
        radialLabelsLinkDiagonalLength={50}
        sliceLabelsSkipAngle={10}
        radialLabelsSkipAngle={10}
        sliceLabelsTextColor="#333333"
        {...props}
      />
    </div>
  );
};
