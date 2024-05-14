import { useMemo, useState } from "react";
import Modal from "../../../../components/Modal";
import TagDialogForm from "./TagDialogForm";
import { SUCCESS, TAGS } from "../../../../constants/app.constants";
import { useDispatch, useSelector } from "react-redux";
import {
  addTagAction,
  editTagAction,
} from "../../state/userTags/userTags.actions";
import { DEFAULT_TAG_COLOR } from "../../../../constants/color.constants";
import { CREATE, EDIT } from "../../../../constants/formType.constants";
import { Form } from "antd";
import dayjs from "../../../../utils/dateTime.utils";
import { tagsSelector } from "../../state/userTags/userTags.reducer";

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

  const [color, setColor] = useState(
    formType === CREATE ? DEFAULT_TAG_COLOR : formValues.color
  );

  const handleAddTag = (e) => {
    const newTag = {
      name: e.name.replace(/\s/g, "").toLowerCase(),
      label: e.name,
      color: color,
      createdTime: dayjs.utc().format(),
      modifiedTime: dayjs.utc().format(),
      type: TAGS,
    };
    dispatch(addTagAction(user.uid, newTag)).then((response) => {
      if (response.success === SUCCESS) {
        setOpenDialog(false);
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
      color: color,
      createdTime: formValues.createdTime,
      modifiedTime: dayjs.utc().format(),
      type: TAGS,
    };
    dispatch(editTagAction(user.uid, modifiedTag, formValues.id)).then(
      (response) => {
        if (response.success === SUCCESS) {
          setOpenDialog(false);
          editTagSuccess();
        } else {
          editTagFailed();
        }
      }
    );
  };

  const DEFAULT_VALUES = useMemo(() => {
    if (formType === CREATE) {
      return {
        name: "",
        color: DEFAULT_TAG_COLOR,
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

  const { isLoadingTags } = useSelector(tagsSelector);

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
        loading={isLoadingTags}
      >
        <TagDialogForm
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

export default TagDialog;
