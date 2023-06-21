import React from "react";
import { PageContent } from "../components/layout";
import { Title } from "../components/typography";
import * as Icons from '../components/icons'
import { HexBadge } from "../components/badge";
import {
  BackspaceIcon,
  BlogIcon,
  ByodIcon,
  CancelIcon,
  ChevronUpIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CloseIcon,
  CommunityIcon,
  DataBoltIcon,
  DeleteIcon,
  DocumentAddIcon,
  DocumentRemoveIcon,
  DocumentsIcon,
  DownloadIcon,
  EducationIcon,
  EllipsisIcon,
  EmailIcon,
  EventsIcon,
  ExternalLinkIcon,
  FaqsIcon,
  FolderIcon,
  FolderFullIcon,
  FullscreenIcon,
  GithubIcon,
  HamburgerIcon,
  HelpDeskIcon,
  InfoIcon,
  MagnifyingGlassIcon,
  MicroscopeIcon,
  MoreHorizontalIcon,
  MoreVerticalIcon,
  PauseIcon,
  PieChartIcon,
  FirstPageIcon,
  LastPageIcon,
  PlayIcon,
  PlusIcon,
  ReceiptIcon,
  SaveIcon,
  SlackIcon,
  StarIcon,
  StopIcon,
  ToolsIcon,
  UndoIcon,
  UserIcon,
  TwitterIcon,
  VideosIcon,
  WarningIcon,
  YoutubeIcon,
  EstimateIcon,
  JoinIcon} from "../components/icons";
const IconsPage = () => {
  console.log(Icons)
  console.log(BlogIcon)
  const iconSize="120"
  const iconFill="#000"
  const iconStyle={
    margin: "1rem",
  }

  const Icons = [
    {
      "component": BackspaceIcon,
      "name": "BackspaceIcon"
    },
    {
      "component": BlogIcon,
      "name": "BlogIcon"
    },
    {
      "component": ByodIcon,
      "name": "ByodIcon"
    },
    {
      "component": CancelIcon,
      "name": "CancelIcon"
    },
    {
      "component": ChevronUpIcon,
      "name": "ChevronUpIcon"
    },
    {
      "component": ChevronDownIcon,
      "name": "ChevronDownIcon"
    },
    {
      "component": ChevronLeftIcon,
      "name": "ChevronLeftIcon"
    },
    {
      "component": ChevronRightIcon,
      "name": "ChevronRightIcon"
    },
    {
      "component": CloseIcon,
      "name": "CloseIcon"
    },
    {
      "component": CommunityIcon,
      "name": "CommunityIcon"
    },
    {
      "component": DataBoltIcon,
      "name": "DataBoltIcon"
    },
    {
      "component": DeleteIcon,
      "name": "DeleteIcon"
    },
    {
      "component": DocumentAddIcon,
      "name": "DocumentAddIcon"
    },
    {
      "component": DocumentRemoveIcon,
      "name": "DocumentRemoveIcon"
    },
    {
      "component": DocumentsIcon,
      "name": "DocumentsIcon"
    },
    {
      "component": DownloadIcon,
      "name": "DownloadIcon"
    },
    {
      "component": EducationIcon,
      "name": "EducationIcon"
    },
    {
      "component": EllipsisIcon,
      "name": "EllipsisIcon"
    },
    {
      "component": EmailIcon,
      "name": "EmailIcon"
    },
    {
      "component": EventsIcon,
      "name": "EventsIcon"
    },
    {
      "component": ExternalLinkIcon,
      "name": "ExternalLinkIcon"
    },
    {
      "component": FaqsIcon,
      "name": "FaqsIcon"
    },
    {
      "component": FolderIcon,
      "name": "FolderIcon"
    },
    {
      "component": FolderFullIcon,
      "name": "FolderFullIcon"
    },
    {
      "component": FullscreenIcon,
      "name": "FullscreenIcon"
    },
    {
      "component": GithubIcon,
      "name": "GithubIcon"
    },
    {
      "component": HamburgerIcon,
      "name": "HamburgerIcon"
    },
    {
      "component": HelpDeskIcon,
      "name": "HelpDeskIcon"
    },
    {
      "component": InfoIcon,
      "name": "InfoIcon"
    },
    {
      "component": MagnifyingGlassIcon,
      "name": "MagnifyingGlassIcon"
    },
    {
      "component": MicroscopeIcon,
      "name": "MicroscopeIcon"
    },
    {
      "component": MoreHorizontalIcon,
      "name": "MoreHorizontalIcon"
    },
    {
      "component": MoreVerticalIcon,
      "name": "MoreVerticalIcon"
    },
    {
      "component": PauseIcon,
      "name": "PauseIcon"
    },
    {
      "component": PieChartIcon,
      "name": "PieChartIcon"
    },
    {
      "component": FirstPageIcon,
      "name": "FirstPageIcon"
    },
    {
      "component": LastPageIcon,
      "name": "LastPageIcon"
    },
    {
      "component": PlayIcon,
      "name": "PlayIcon"
    },
    {
      "component": PlusIcon,
      "name": "PlusIcon"
    },
    {
      "component": ReceiptIcon,
      "name": "ReceiptIcon"
    },
    {
      "component": SaveIcon,
      "name": "SaveIcon"
    },
    {
      "component": SlackIcon,
      "name": "SlackIcon"
    },
    {
      "component": StarIcon,
      "name": "StarIcon"
    },
    {
      "component": StopIcon,
      "name": "StopIcon"
    },
    {
      "component": ToolsIcon,
      "name": "ToolsIcon"
    },
    {
      "component": UndoIcon,
      "name": "UndoIcon"
    },
    {
      "component": UserIcon,
      "name": "UserIcon"
    },
    {
      "component": TwitterIcon,
      "name": "TwitterIcon"
    },
    {
      "component": VideosIcon,
      "name": "VideosIcon"
    },
    {
      "component": WarningIcon,
      "name": "WarningIcon"
    },
    {
      "component": YoutubeIcon,
      "name": "YoutubeIcon"
    },
    {
      "component": EstimateIcon,
      "name": "EstimateIcon"
    },
    {
      "component": JoinIcon,
      "name": "JoinIcon"
    }
  ]
  return (
    <PageContent width="95%" maxWidth="1200px" center gutters>
      <Title center>Icons Library</Title>

      <div style={{display: "flex", flexWrap: "wrap"}}>
        {
          Icons.map(icon => {
            const Icon = icon.component

            return (
              <div style={{display: 'flex', flexDirection: 'column', border: '1px solid black', width: "250px",  alignItems: "center", margin: '1rem', padding: "2rem", backgroundColor: "#FFF"}}>
                <Icon size={iconSize} fill={iconFill} style={iconStyle}></Icon>
                <br/>
                {icon.name}
              </div>
            )
          })
        }
      </div>

    </PageContent>
  );
}

export default IconsPage;