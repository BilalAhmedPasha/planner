import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../../../../components/Modal";
import ListDialogForm from "./ListDialogForm";
import { LISTS, SUCCESS } from "../../../../constants/app.constants";
import { CREATE, EDIT } from "../../../../constants/formType.constants";
import { DEFAULT_LIST_COLOR } from "../../../../constants/color.constants";
import {
  addListAction,
  editListAction,
} from "../../state/userLists/userLists.actions";
import { Form } from "antd";
import dayjs from "../../../../utils/dateTime.utils";
import { listsSelector } from "../../state/userLists/userLists.reducer";

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

  const [color, setColor] = useState(
    formType === CREATE ? DEFAULT_LIST_COLOR : formValues.color
  );

  const handleAddList = (e) => {
    const newList = {
      name: e.name.replace(/\s/g, "").toLowerCase(),
      label: e.name,
      color: color,
      createdTime: dayjs.utc().format(),
      modifiedTime: dayjs.utc().format(),
      type: LISTS,
    };
    dispatch(addListAction(user.uid, newList)).then((response) => {
      if (response.success === SUCCESS) {
        setOpenDialog(false);
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
      color: color,
      createdTime: formValues.createdTime,
      modifiedTime: dayjs.utc().format(),
      type: LISTS,
    };
    dispatch(editListAction(user.uid, modifiedList, formValues.id)).then(
      (response) => {
        if (response.success === SUCCESS) {
          setOpenDialog(false);
          editListSuccess();
        } else {
          editListFailed();
        }
      }
    );
  };

  const DEFAULT_VALUES = useMemo(() => {
    if (formType === CREATE) {
      return {
        name: "",
        color: DEFAULT_LIST_COLOR,
      };
    } else if (formType === EDIT) {
      return {
        name: formValues.label,
        color: formValues.color,
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

  const { isLoadingLists } = useSelector(listsSelector);
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
        loading={isLoadingLists}
      >
        <ListDialogForm
          form={form}
          color={color}
          handleColorChange={(color) => {
            return setColor(color.toHexString());
          }}
          initialValues={DEFAULT_VALUES}
          layout="vertical"
        />
      </Modal>
    )
  );
};

export default ListDialog;
