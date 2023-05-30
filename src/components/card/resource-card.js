import React from "react";
import { Card, CardHeader, CardBody } from ".";
import { LineBreak } from "../layout";
import { HexBadge } from "../badge";

export const ResourceCard = ({ title, icon, children }) => {
  return (
    <Card>
      <CardHeader
        bgColor="#fff"
        fgColor="#444"
        style={{ borderBottom: "1px solid var(--color-crimson" }}
      />
      <CardBody style={{ position: "relative", display: 'flex' }}>
        <div style={{ position: "absolute", top: "-2.5rem", left: "2rem" }}>
          <HexBadge>{icon}</HexBadge>
        </div>
        <div style={{ 
          flex:"1",
          display: "flex",
          flexDirection: "column",
          marginTop: "2rem"
        }}>
          <h3 style={{ color: "var(--color-crimson)" }}>{title}</h3>
          <div style={{
            flex: "1",
            display: 'flex', 
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}>
            {children}
          </div> 
        </div>
      </CardBody>
    </Card>
  );
};
