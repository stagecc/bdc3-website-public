import React, { useState } from "react";
import styled from "styled-components";
import {
  DataBoltIcon,
  EducationIcon,
  ToolsIcon,
  ByodIcon,
  EstimateIcon,
  JoinIcon,
} from "../../icons";
import { useWindowWidth } from "../../../hooks";
import { Hexagon } from "./hexagon";
import { MenuItemDescription } from "./hex-menu-descriptions";

const carouselItems = [
  {
    text: "Learn",
    description: "Get the support you need to explore, analyze, and discover",
    icon: EducationIcon,
    path: "/resources/learn",
  },
  {
    text: "Data",
    description: "Access biomedical data when you need it and how you need it",
    icon: DataBoltIcon,
    path: "/resources/data",
  },
  {
    text: "Services",
    description:
      "Take control of your data with customizable tools and workflows",
    icon: ToolsIcon,
    path: "/resources/services",
  },
  {
    text: "BYOD",
    description:
      "Use the BDC ecosystem to build on your existing work",
    icon: ByodIcon,
    path: "/resources/byod",
  },
  {
    text: "Estimate",
    description: "Explore pilot funding and budgeting for future cloud costs",
    icon: EstimateIcon,
    path: "/resources/cloud-credits",
  },
  {
    text: "Join",
    description:
      "Join our community of researchers making advances in HLBS science",
    icon: JoinIcon,
    path: "/contact/ecosystem",
  },
];

const Wrapper = styled.div`
  // border: 1px solid #f99;
  // & * { border: 1px solid #99f; }
  margin-top: -10rem;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const Descriptions = styled.div`
  position: relative;
  flex: 1;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const MenuItems = styled.div`
  position: relative;
  flex: 1;
  height: 23rem;
`;

export const HexMenu = () => {
  const [index, setIndex] = useState(1);
  const { isCompact } = useWindowWidth();

  const handleHoverMenuItem = (newIndex) => (event) => setIndex(newIndex);

  return (
    <Wrapper>
      <Descriptions>
        {carouselItems.map((item, i) => (
          <MenuItemDescription key={i} active={index === i}>
            {item.description}
          </MenuItemDescription>
        ))}
      </Descriptions>
      <MenuItems>
        {carouselItems.map((tab, i) => (
          <Hexagon
            key={i}
            path={tab.path}
            active={index === i}
            size={160}
            growOnActive={!isCompact}
            showtext={!isCompact}
            text={tab.text}
            icon={tab.icon}
            hoverHandler={handleHoverMenuItem(i)}
          />
        ))}
      </MenuItems>
    </Wrapper>
  );
};
