import { useState } from "react";
import DynamicNav from "../DynamicNav/DynamicNav";
import AddTagDialog from "./AddTagDialog";
import customTags from "./TagNavigation.config";

const TagsNav = () => {
  const [openTag, setOpenTags] = useState(false);
  const handleClickItem = () => {
    setOpenTags(!openTag);
  };

  const [openDialog, setOpenDialog] = useState(false);
  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const [color, setColor] = useState("#ffffff");
  const handleColorChange = (color) => {
    setColor(color);
  };

  return (
    <DynamicNav
      navigationConfig={customTags}
      title={"Tags"}
      tooltip={"Add tag"}
      type={"tags"}
      open={openTag}
      handleClickItem={handleClickItem}
      openDialog={openDialog}
      handleOpenDialog={handleOpenDialog}
      handleCloseDialog={handleCloseDialog}
      addDialogComponent={
        <AddTagDialog
          openDialog={openDialog}
          handleCloseDialog={handleCloseDialog}
          color={color}
          handleColorChange={handleColorChange}
        />
      }
    />
  );
};

export default TagsNav;
