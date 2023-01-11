import React, { useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import ModalForm from "../../../components/ModalForm";
import ListDialogForm from "./ListDialogForm";
import moment from "moment-timezone";
import { SUCCESS } from "../../../constants/app.constants";
import { CREATE, EDIT } from "../../../constants/formType.constants";
import { DEFAULT_LIST_COLOR } from "../../../constants/color.constants";
import {
  addListAction,
  editListAction,
} from "../state/userLists/userLists.actions";

const ListDialog = ({
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
      redirectUrl: e.name.replace(/\s/g, "-").toLowerCase(),
      label: e.name,
      color: e.color?.hex,
      createdTime: moment.utc().format(),
      modifiedTime: moment.utc().format(),
      hidden: e.hidden,
    };
    setOpenDialog(false);
    dispatch(addListAction(newList)).then((response) => {
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
      redirectUrl: e.name.replace(/\s/g, "-").toLowerCase(),
      label: e.name,
      color: e.color?.hex,
      createdTime: formValues.createdTime,
      modifiedTime: moment.utc().format(),
      hidden: e.hidden,
    };
    setOpenDialog(false);
    dispatch(editListAction(modifiedList, formValues.id)).then((response) => {
      if (response.success === SUCCESS) {
        editListSuccess();
      } else {
        editListFailed();
      }
    });
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

  return (
    openDialog && (
      <ModalForm
        open={openDialog}
        formTitle={formTitle}
        onOk={formType === CREATE ? handleAddList : handleEditList}
        onCancel={() => {
          setOpenDialog(false);
        }}
        okText={okText}
        initialValues={DEFAULT_VALUES}
      >
        <ListDialogForm
          color={color}
          handleColorChange={(color) => {
            return setColor(color);
          }}
          hidden={checkedHidden}
          handleHiddenChange={() => setCheckedHidden(!checkedHidden)}
        />
      </ModalForm>
    )
  );
};

export default ListDialog;
