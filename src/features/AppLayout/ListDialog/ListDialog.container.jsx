import React, { useState } from "react";
import ModalForm from "../../../components/ModalForm";
import ListDialogForm from "./ListDialog";

const ListDialog = ({ handleAdd, openAddDialog, setOpenAddDialog }) => {
  const [color, setColor] = useState("#FFFFFF");

  return (
    openAddDialog && (
      <ModalForm
        open={openAddDialog}
        formTitle={"Create New List"}
        onOk={handleAdd}
        onCancel={() => {
          setOpenAddDialog(false);
        }}
        okText={"Create"}
      >
        <ListDialogForm color={color} handleColorChange={setColor} />
      </ModalForm>
    )
  );
};

export default ListDialog;
