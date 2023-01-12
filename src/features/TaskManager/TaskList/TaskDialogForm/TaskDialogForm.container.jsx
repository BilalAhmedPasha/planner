import React, { useMemo } from "react";
import { useDispatch } from "react-redux";
import Modal from "../../../../components/Modal";
import TaskDialogForm from "./TaskDialogForm";
import moment from "moment-timezone";
import { SUCCESS } from "../../../../constants/app.constants";
import { addTaskAction } from "../../state/userTasks/userTasks.actions";
import { Form } from "antd";

const TaskDialog = ({ user, messageApi, openDialog, setOpenDialog }) => {
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

  const DEFAULT_VALUES = useMemo(() => {
    return {
      name: "",
      list: "inbox",
      priority: "p4",
      endBy: "endless",
    };
  }, []);

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
        width="60vw"
        centered={true}
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
