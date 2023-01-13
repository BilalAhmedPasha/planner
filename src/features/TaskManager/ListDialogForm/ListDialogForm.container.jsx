import React, { useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import Modal from "../../../components/Modal";
import ListDialogForm from "./ListDialogForm";
import { SUCCESS } from "../../../constants/app.constants";
import { CREATE, EDIT } from "../../../constants/formType.constants";
import { DEFAULT_LIST_COLOR } from "../../../constants/color.constants";
import {
  addListAction,
  editListAction,
} from "../state/userLists/userLists.actions";
import { Form } from "antd";
import dayjs from "dayjs";
const utc = require("dayjs/plugin/utc");
dayjs.extend(utc);

const ListDialog = ({
  user,
  messageApi,
  openDialog,
  setOpenDialog,
  formType,
  formValues,
}) => {
  const dispatch = useDispatch();

  const createListSuccess = () => {
    messageApi.open({
      type: "success",
      content: "List created",
      duration: 3,
    });
  };

  const createListFailed = () => {
    messageApi.open({
      type: "error",
      content: "Failed to create list",
      duration: 3,
    });
  };

  const editListSuccess = () => {
    messageApi.open({
      type: "success",
      content: "List edited",
      duration: 3,
    });
  };

  const editListFailed = () => {
    messageApi.open({
      type: "error",
      content: "Failed to edit list",
      duration: 3,
    });
  };

  const handleAddList = (e) => {
    const newList = {
      name: e.name.replace(/\s/g, "").toLowerCase(),
      label: e.name,
      color: e.color?.hex,
      createdTime: dayjs.utc().format(),
      modifiedTime: dayjs.utc().format(),
      hidden: e.hidden,
    };
    setOpenDialog(false);
    dispatch(addListAction(user.uid, newList)).then((response) => {
      if (response.success === SUCCESS) {
        createListSuccess();
      } else {
        createListFailed();
      }
    });
  };

  const handleEditList = (e) => {
    const modifiedList = {
      name: e.name.replace(/\s/g, "").toLowerCase(),
      label: e.name,
      color: e.color?.hex,
      createdTime: formValues.createdTime,
      modifiedTime: dayjs.utc().format(),
      hidden: e.hidden,
    };
    setOpenDialog(false);
    dispatch(editListAction(user.uid, modifiedList, formValues.id)).then(
      (response) => {
        if (response.success === SUCCESS) {
          editListSuccess();
        } else {
          editListFailed();
        }
      }
    );
  };

  const [color, setColor] = useState(
    formType === CREATE
      ? { hex: DEFAULT_LIST_COLOR }
      : { hex: formValues.color }
  );

  const [checkedHidden, setCheckedHidden] = useState(
    formType === CREATE ? false : formValues.hidden
  );

  const DEFAULT_VALUES = useMemo(() => {
    if (formType === CREATE) {
      return {
        name: "",
        color: { hex: DEFAULT_LIST_COLOR },
        hidden: false,
      };
    } else if (formType === EDIT) {
      return {
        name: formValues.label,
        color: { hex: formValues.color },
        hidden: formValues.hidden,
      };
    }
  }, [formType, formValues]);

  const formTitle = useMemo(() => {
    if (formType === CREATE) {
      return "Create New List";
    } else if (formType === EDIT) {
      return "Edit list";
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
        onOk={formType === CREATE ? handleAddList : handleEditList}
        onCancel={() => {
          setOpenDialog(false);
        }}
        okText={okText}
        form={form}
      >
        <ListDialogForm
          form={form}
          color={color}
          handleColorChange={(color) => {
            return setColor(color);
          }}
          hidden={checkedHidden}
          handleHiddenChange={() => setCheckedHidden(!checkedHidden)}
          initialValues={DEFAULT_VALUES}
          layout="vertical"
        />
      </Modal>
    )
  );
};

export default ListDialog;
