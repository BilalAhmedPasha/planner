import React, { useMemo, useState } from "react";
import ModalForm from "../../../components/ModalForm";
import TagDialogForm from "./TagDialog";
import moment from "moment-timezone";
import { SUCCESS } from "../../../constants/app.constants";
import { useDispatch } from "react-redux";
import {
  addTagAction,
  editTagAction,
} from "../state/userTags/userTags.actions";
import { DEFAULT_TAG_COLOR } from "../../../constants/color.constants";
import { CREATE, EDIT } from "../../../constants/formType.constants";

const TagDialog = ({
  messageApi,
  openDialog,
  setOpenDialog,
  formType,
  formValues,
}) => {
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
      content: "Failed to create tag",
      duration: 3,
    });
  };

  const editTagSuccess = () => {
    messageApi.open({
      type: "success",
      content: "Tag edited",
      duration: 3,
    });
  };

  const editTagFailed = () => {
    messageApi.open({
      type: "error",
      content: "Failed to edit tag",
      duration: 3,
    });
  };

  const handleAddTag = (e) => {
    const newTag = {
      name: e.name.replace(/\s/g, "").toLowerCase(),
      redirectUrl: e.name.replace(/\s/g, "-").toLowerCase(),
      label: e.name,
      color: e.color?.hex,
      createdTime: moment.utc().format(),
      modifiedTime: moment.utc().format(),
    };
    setOpenDialog(false);
    dispatch(addTagAction(newTag)).then((response) => {
      if (response.success === SUCCESS) {
        createTagSuccess();
      } else {
        createTagFailed();
      }
    });
  };

  const handleEditTag = (e) => {
    const modifiedTag = {
      name: e.name.replace(/\s/g, "").toLowerCase(),
      redirectUrl: e.name.replace(/\s/g, "-").toLowerCase(),
      label: e.name,
      color: e.color?.hex,
      createdTime: formValues.createdTime,
      modifiedTime: moment.utc().format(),
    };
    setOpenDialog(false);
    dispatch(editTagAction(modifiedTag, formValues.id)).then((response) => {
      if (response.success === SUCCESS) {
        editTagSuccess();
      } else {
        editTagFailed();
      }
    });
  };

  const [color, setColor] = useState(
    formType === CREATE ? { hex: DEFAULT_TAG_COLOR } : { hex: formValues.color }
  );

  const DEFAULT_VALUES = useMemo(() => {
    if (formType === CREATE) {
      return {
        name: "",
        color: { hex: DEFAULT_TAG_COLOR },
      };
    } else if (formType === EDIT) {
      return {
        name: formValues.label,
        color: { hex: formValues.color },
      };
    }
  }, [formType, formValues]);

  const formTitle = useMemo(() => {
    if (formType === CREATE) {
      return "Create New Tag";
    } else if (formType === EDIT) {
      return "Edit tag";
    }
  }, [formType]);

  const okText = useMemo(() => {
    if (formType === CREATE) {
      return "Create";
    } else if (formType === EDIT) {
      return "Save";
    }
  }, [formType]);

  return (
    openDialog && (
      <ModalForm
        open={openDialog}
        formTitle={formTitle}
        onOk={formType === CREATE ? handleAddTag : handleEditTag}
        onCancel={() => {
          setOpenDialog(false);
        }}
        okText={okText}
        initialValues={DEFAULT_VALUES}
      >
        <TagDialogForm
          color={color}
          handleColorChange={(color) => {
            return setColor(color);
          }}
        />
      </ModalForm>
    )
  );
};

export default TagDialog;
