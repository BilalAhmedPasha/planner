import { useState } from "react";
import DynamicNav from "../DynamicNav/DynamicNav";
import AddTagDialog from "./AddTagDialog";
import customTags from "./TagNavigation.config";

const TagsNav = () => {
  const [open, setOpen] = useState(false);
  const handleClickItem = () => {
    setOpen(!open);
  };

    const [openDialog, setOpenDialog] = useState(false);
    const handleOpenDialog = () => {
      setOpenDialog(true);
    };

    const handleCloseDialog = () => {
      setOpenDialog(false);
    };


  return (
    <DynamicNav
      navigationConfig={customTags}
      title={"Tags"}
      tooltip={"Add tag"}
      type={"tags"}
      open={open}
      handleClickItem={handleClickItem}
      openDialog={openDialog}
      handleOpenDialog={handleOpenDialog}
      handleCloseDialog={handleCloseDialog}
      addDialogComponent={
        <AddTagDialog
          openDialog={openDialog}
          handleCloseDialog={handleCloseDialog}
        />
      }
    />
  );
};

export default TagsNav;
