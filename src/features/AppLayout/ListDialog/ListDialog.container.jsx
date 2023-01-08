import React, { useState } from "react";
import ModalForm from "../../../components/ModalForm";
import ListDialogForm from "./ListDialog";

const ListDialog = ({ handleAddList, openAddDialog, setOpenAddDialog }) => {
  const [color, setColor] = useState("#FFFFFF");
  const handleColorChange = (e) => {
    console.log(e);
    setColor(e);
  };

  return (
    openAddDialog && (
      <ModalForm
        open={openAddDialog}
        formTitle={"Create New List"}
        onOk={handleAddList}
        onCancel={() => {
          setOpenAddDialog(false);
        }}
        okText={"Create"}
      >
        <ListDialogForm color={color} handleColorChange={handleColorChange} />
      </ModalForm>
    )
  );
};

export default ListDialog;
