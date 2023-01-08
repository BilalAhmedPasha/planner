import React, { useState } from "react";
import ModalForm from "../../../components/ModalForm";
import TagDialogForm from "./TagDialog";
import moment from "moment-timezone";
import { SUCCESS } from "../../../constants/app.constants";
import { useDispatch } from "react-redux";
import { addTagAction } from "../state/userTags/userTags.actions";

const TagDialog = ({ messageApi, openAddDialog, setOpenAddDialog }) => {
  const [color, setColor] = useState("#FFFFFF");
  const dispatch = useDispatch();
  const createTagSuccess = () => {
    messageApi.open({
      type: "success",
      content: "Tag created",
      duration: 3,
    });
  };
  const createTagFailed = () => {
    messageApi.open({
      type: "error",
      content: "Failed to create tag!",
    });
  };
  const handleAddTag = (e) => {
    const newTag = {
      name: e.name.replace(/\s/g, "").toLowerCase(),
      redirectUrl: e.name.replace(/\s/g, "-").toLowerCase(),
      label: e.name,
      color: e.color?.hex,
      createdTime: moment.utc().format(),
    };
    setOpenAddDialog(false);
    dispatch(addTagAction(newTag)).then((response) => {
      if (response.success === SUCCESS) {
        createTagSuccess();
      } else {
        createTagFailed();
      }
    });
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
        <TagDialogForm color={color} handleColorChange={setColor} />
      </ModalForm>
    )
  );
};

export default TagDialog;
