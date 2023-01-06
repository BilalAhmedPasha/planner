import React from "react";
import { Divider, Drawer, List } from "@mui/material";
import taskNavConfigHeader from "./StaticNav/StaticNavConfigs/HeaderNavigation.config";
import taskNavConfigFooter from "./StaticNav/StaticNavConfigs/FooterNavigation.config";
import StaticNav from "./StaticNav/StaticNav";
import ListsNav from "./ListsNav/ListsNav";
import TagsNav from "./TagsNav/TagsNav";

const AppNavigation = () => {
  const drawerWidth = 320;
  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <StaticNav navigationConfig={taskNavConfigHeader} />
      <Divider />
      <List>
        <ListsNav />
        <TagsNav />
      </List>
      <Divider />
      <StaticNav navigationConfig={taskNavConfigFooter} />
    </Drawer>
  );
};

export default AppNavigation;
