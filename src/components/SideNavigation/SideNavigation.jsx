import React from "react";
import CalendarMonth from "@mui/icons-material/CalendarMonth";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import LoopIcon from "@mui/icons-material/Loop";
import { Drawer, List, ListItemButton, Tooltip } from "@mui/material";
import { Link } from "react-router-dom";

const sideNavConfig = [
  {
    name: "Tasks",
    icon: CheckBoxIcon,
    redirectUrl: "/tasks",
  },
  {
    name: "Calendar",
    icon: CalendarMonth,
    redirectUrl: "/calendar",
  },
  {
    name: "Habits",
    icon: LoopIcon,
    redirectUrl: "/habits",
  },
];

const SideNavigation = () => {
  return (
    <Drawer variant="permanent" open={false}>
      <List>
        {sideNavConfig.map((each, index) => (
          <ListItemButton
            component={Link}
            to={each.redirectUrl}
            key={each.name}
            aria-label={each.name}
            variant="contained"
          >
            <Tooltip title={each.name} placement="right">
              <each.icon style={{ height: "1.75em", width: "1.75rem" }} />
            </Tooltip>
          </ListItemButton>
        ))}
      </List>
    </Drawer>
  );
};

export default SideNavigation;
