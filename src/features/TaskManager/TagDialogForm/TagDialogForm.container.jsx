import React, { useMemo, useState } from "react";
import Modal from "../../../components/Modal";
import TagDialogForm from "./TagDialogForm";
import { SUCCESS } from "../../../constants/app.constants";
import { useDispatch } from "react-redux";
import {
  addTagAction,
  editTagAction,
} from "../state/userTags/userTags.actions";
import { DEFAULT_TAG_COLOR } from "../../../constants/color.constants";
import { CREATE, EDIT } from "../../../constants/formType.constants";
import { Form } from "antd";
import dayjs from "dayjs";
const utc = require("dayjs/plugin/utc");
dayjs.extend(utc);

const TagDialog = ({
  user,
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
      label: e.name,
      color: e.color?.hex,
      createdTime: dayjs.utc().format(),
      modifiedTime: dayjs.utc().format(),
    };
    setOpenDialog(false);
    dispatch(addTagAction(user.uid, newTag)).then((response) => {
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
      label: e.name,
      color: e.color?.hex,
      createdTime: formValues.createdTime,
      modifiedTime: dayjs.utc().format(),
    };
    setOpenDialog(false);
    dispatch(editTagAction(user.uid, modifiedTag, formValues.id)).then(
      (response) => {
        if (response.success === SUCCESS) {
          editTagSuccess();
        } else {
          editTagFailed();
        }
      }
    );
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

  const [form] = Form.useForm();

  return (
    openDialog && (
      <Modal
        open={openDialog}
        formTitle={formTitle}
        onOk={formType === CREATE ? handleAddTag : handleEditTag}
        onCancel={() => {
          setOpenDialog(false);
        }}
        okText={okText}
        form={form}
      >
        <TagDialogForm
          form={form}
          color={color}
          handleColorChange={(color) => {
            return setColor(color);
          }}
          initialValues={DEFAULT_VALUES}
          layout="vertical"
        />
      </Modal>
    )
  );
};

export default TagDialog;
