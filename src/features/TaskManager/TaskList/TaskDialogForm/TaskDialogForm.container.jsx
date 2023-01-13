import React, { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../../../../components/Modal";
import TaskDialogForm from "./TaskDialogForm";
import moment from "moment-timezone";
import { INBOX, SUCCESS } from "../../../../constants/app.constants";
import { addTaskAction } from "../../state/userTasks/userTasks.actions";
import { Form } from "antd";
import { NONE } from "../../../../constants/priority.constants";
import { useParams } from "react-router-dom";
import { tagsSelector } from "../../state/userTags/userTags.reducer";

const TaskDialog = ({ user, messageApi, openDialog, setOpenDialog }) => {
  const { sectionId, documentId } = useParams();

  const dispatch = useDispatch();

  const createTaskSuccess = () => {
    messageApi.open({
      type: "success",
      content: "Task created",
      duration: 3,
    });
  };

  const createTaskFailed = () => {
    messageApi.open({
      type: "error",
      content: "Failed to create task",
      duration: 3,
    });
  };

  const handleAddTask = (e) => {
    const newTask = {
      name: e.name.replace(/\s/g, "").toLowerCase(),
      label: e.name,
      color: e.color?.hex,
      createdTime: moment.utc().format(),
      modifiedTime: moment.utc().format(),
      hidden: e.hidden,
    };
    setOpenDialog(false);
    dispatch(addTaskAction(user.uid, newTask)).then((response) => {
      if (response.success === SUCCESS) {
        createTaskSuccess();
      } else {
        createTaskFailed();
      }
    });
  };

  const DEFAULT_LIST = sectionId === "lists" ? documentId : INBOX;

  const { tags } = useSelector(tagsSelector);

  const DEFAULT_TAGS = useMemo(() => {
    if (sectionId === "tags") {
      const currentTag = tags.find((each) => each.id === documentId);
      return [`${documentId}/${currentTag.color}`];
    }
    return [];
  }, [documentId, sectionId, tags]);

  const DEFAULT_VALUES = useMemo(() => {
    return {
      name: "",
      list: DEFAULT_LIST,
      priority: NONE,
      endBy: "endless",
      tags: DEFAULT_TAGS,
    };
  }, [DEFAULT_LIST, DEFAULT_TAGS]);

  const [form] = Form.useForm();

  return (
    openDialog && (
      <Modal
        open={openDialog}
        formTitle={"Add New Task"}
        onOk={handleAddTask}
        onCancel={() => {
          setOpenDialog(false);
        }}
        okText={"Add"}
        form={form}
        centered={true}
        width="50vw"
        destroyOnClose={true}
      >
        <TaskDialogForm
          layout="vertical"
          form={form}
          initialValues={DEFAULT_VALUES}
        />
      </Modal>
    )
  );
};

export default TaskDialog;
