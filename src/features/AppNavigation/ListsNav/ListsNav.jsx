import { useState } from "react";
import DynamicNav from "../DynamicNav/DynamicNav";
import ListDialogForm from "./ListDialogForm/ListDialogForm";
import {
  DEFAULT_VALUES,
  VALIDATION_SCHEMA,
} from "./ListDialogForm/ListDialogForm.config";
import customLists from "./ListNavigation.config";

const ListNav = () => {
  const [openLists, setOpenLists] = useState(false);
  const handleClickItem = () => {
    setOpenLists(!openLists);
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
      navigationConfig={customLists}
      title={"Lists"}
      tooltip={"Add list"}
      type={"lists"}
      open={openLists}
      handleClickItem={handleClickItem}
      openDialog={openDialog}
      handleOpenDialog={handleOpenDialog}
      handleCloseDialog={handleCloseDialog}
      addDialogComponent={
        <ListDialogForm
          openDialog={openDialog}
          handleCloseDialog={handleCloseDialog}
          defaultValues={DEFAULT_VALUES()}
          validationSchema={VALIDATION_SCHEMA()}
        />
      }
    />
  );
};

export default ListNav;
