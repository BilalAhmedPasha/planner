import React, { useState } from "react";
import ModalForm from "../../../components/ModalForm";
import TagDialogForm from "./TagDialog";

const TagDialog = ({ handleAddTag, openAddDialog, setOpenAddDialog }) => {
  const [color, setColor] = useState("#FFFFFF");
  const handleColorChange = (e) => {
    console.log(e);
    setColor(e);
  };

  return (
    openAddDialog && (
      <ModalForm
        open={openAddDialog}
        formTitle={"Create New Tag"}
        onOk={handleAddTag}
        onCancel={() => {
          setOpenAddDialog(false);
        }}
        okText={"Create"}
      >
        <TagDialogForm color={color} handleColorChange={handleColorChange} />
      </ModalForm>
    )
  );
};

export default TagDialog;
