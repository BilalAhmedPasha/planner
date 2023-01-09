import React, { useState } from "react";
import ModalForm from "../../../components/ModalForm";
import ListDialogForm from "./ListDialog";

const ListDialog = ({ handleAdd, openDialog, setOpenDialog }) => {
  const [color, setColor] = useState("#FFFFFF");

  return (
    openDialog && (
      <ModalForm
        open={openDialog}
        formTitle={"Create New List"}
        onOk={handleAdd}
        onCancel={() => {
          setOpenDialog(false);
        }}
        okText={"Create"}
      >
        <ListDialogForm color={color} handleColorChange={setColor} />
      </ModalForm>
    )
  );
};

export default ListDialog;
