import React from "react";
import { Box, Divider, List } from "@mui/material";
import taskNavConfigHeader from "./StaticNav/StaticNavConfigs/HeaderNavigation.config";
import taskNavConfigFooter from "./StaticNav/StaticNavConfigs/FooterNavigation.config";
import StaticNav from "./StaticNav/StaticNav";
import ListsNav from "./ListsNav/ListsNav";
import TagsNav from "./TagsNav/TagsNav";

const TaskNavigation = () => {
  return (
    <Box
      sx={{ width: "100%", maxWidth: 320, maxHeight: "50%", overflow: "auto" }}
    >
      <StaticNav navigationConfig={taskNavConfigHeader} />
      <Divider />
      <List>
        <ListsNav />
        <TagsNav />
      </List>
      <Divider />
      <StaticNav navigationConfig={taskNavConfigFooter} />
      <StaticNav navigationConfig={taskNavConfigFooter} />
      <StaticNav navigationConfig={taskNavConfigFooter} />
      <StaticNav navigationConfig={taskNavConfigFooter} />
      <StaticNav navigationConfig={taskNavConfigFooter} />
    </Box>
  );
};

export default TaskNavigation;
