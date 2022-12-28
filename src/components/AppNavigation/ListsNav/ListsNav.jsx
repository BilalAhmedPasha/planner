import { useState } from "react";
import DynamicNav from "../DynamicNav/DynamicNav";
import AddListDialog from "./AddListDialog";
import customLists from "./ListNavigation.config";

const ListNav = () => {
  const [openList, setOpenList] = useState(false);
  const handleClickItem = () => {
    setOpenList(!openList);
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
      navigationConfig={customLists}
      title={"Lists"}
      tooltip={"Add list"}
      type={"lists"}
      openList={openList}
      handleClickItem={handleClickItem}
      openDialog={openDialog}
      handleOpenDialog={handleOpenDialog}
      handleCloseDialog={handleCloseDialog}
      addDialogComponent={
        <AddListDialog
          openDialog={openDialog}
          handleCloseDialog={handleCloseDialog}
          color={color}
          handleColorChange={handleColorChange}
        />
      }
    />
  );
};

export default ListNav;
