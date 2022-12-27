import React, { useState } from "react";
import CalendarMonth from "@mui/icons-material/CalendarMonth";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import LoopIcon from "@mui/icons-material/Loop";
import {
  Box,
  Collapse,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { ExpandLess, ExpandMore, StarBorder } from "@mui/icons-material";
import { Link } from "react-router-dom";

import AllInboxIcon from "@mui/icons-material/AllInbox";
import InboxIcon from "@mui/icons-material/Inbox";
import TodayIcon from "@mui/icons-material/Today";
import DateRangeIcon from "@mui/icons-material/DateRange";
import DisabledByDefaultIcon from "@mui/icons-material/DisabledByDefault";
import DeleteIcon from "@mui/icons-material/Delete";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";
import AdjustIcon from "@mui/icons-material/Adjust";
import AllInclusiveIcon from "@mui/icons-material/AllInclusive";

import { green, red } from "@mui/material/colors";

const taskNavConfigHeader = [
  {
    name: "All",
    icon: AllInboxIcon,
    redirectUrl: "/all",
  },
  {
    name: "Inbox",
    icon: InboxIcon,
    redirectUrl: "/inbox",
  },
  {
    name: "Today",
    icon: TodayIcon,
    redirectUrl: "/today",
  },
  {
    name: "Next 7 Days",
    icon: DateRangeIcon,
    redirectUrl: "/next-7-days",
  },
];

const taskNavConfigFooter = [
  {
    name: "Completed",
    icon: CheckBoxIcon,
    redirectUrl: "/completed",
  },
  {
    name: "Won't Do",
    icon: DisabledByDefaultIcon,
    redirectUrl: "/wont-do",
  },
  {
    name: "Deleted",
    icon: DeleteIcon,
    redirectUrl: "/deleted",
  },
];

const customTags = [
  {
    name: "Tag 1",
    color: red,
    redirectUrl: "/tag-1",
  },
  {
    name: "Tag 2",
    color: green,
    redirectUrl: "/tag-2",
  },
];

const customLists = [
  {
    name: "List 1",
    icon: AdjustIcon,
    redirectUrl: "/list-1",
  },
  {
    name: "List 2",
    icon: AllInclusiveIcon,
    redirectUrl: "/list-2",
  },
];

const TaskNavigation = () => {
  const [openLists, setOpenLists] = useState(false);
  const [openTags, setOpenTags] = useState(false);

  const handleClickLists = () => {
    setOpenLists(!openLists);
  };

  const handleClickTags = () => {
    setOpenTags(!openTags);
  };

  return (
    <Box sx={{ width: "100%", maxWidth: 240 }}>
      <List>
        {taskNavConfigHeader.map((each, index) => (
          <ListItem disablePadding key={index}>
            <ListItemButton
              component={Link}
              to={`/tasks${each.redirectUrl}`}
              aria-label={each.name}
              variant="contained"
            >
              <ListItemIcon>
                <each.icon style={{ height: "1.5em", width: "1.5rem" }} />
              </ListItemIcon>
              <ListItemText primary={each.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <ListItemButton onClick={handleClickLists}>
        <ListItemText primary="Lists" />
        {openLists ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={openLists} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {customLists.map((each, index) => (
            <ListItem disablePadding key={index}>
              <ListItemButton
                component={Link}
                to={`/tasks/lists${each.redirectUrl}`}
                aria-label={each.name}
                variant="contained"
                sx={{ pl: 4 }}
              >
                <ListItemIcon>
                  <each.icon style={{ height: "1.5em", width: "1.5rem" }} />
                </ListItemIcon>
                <ListItemText primary={each.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Collapse>
      <ListItemButton onClick={handleClickTags}>
        <ListItemText primary="Tags" />
        {openTags ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={openTags} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {customTags.map((each, index) => (
            <ListItem disablePadding key={index}>
              <ListItemButton
                component={Link}
                to={`/tasks/tags${each.redirectUrl}`}
                aria-label={each.name}
                variant="contained"
                sx={{ pl: 4 }}
              >
                <ListItemIcon>
                  <LocalOfferOutlinedIcon
                    style={{ height: "1.5em", width: "1.5rem" }}
                  />
                </ListItemIcon>
                <ListItemText primary={each.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Collapse>
      <Divider />
      {taskNavConfigFooter.map((each, index) => (
        <ListItem disablePadding key={index}>
          <ListItemButton
            component={Link}
            to={`/tasks${each.redirectUrl}`}
            aria-label={each.name}
            variant="contained"
          >
            <ListItemIcon>
              <each.icon style={{ height: "1.5em", width: "1.5rem" }} />
            </ListItemIcon>
            <ListItemText primary={each.name} />
          </ListItemButton>
        </ListItem>
      ))}
    </Box>
  );
};

export default TaskNavigation;
