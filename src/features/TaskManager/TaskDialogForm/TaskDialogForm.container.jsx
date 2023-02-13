import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../../../components/Modal";
import TaskDialogForm from "./TaskDialogForm";
import { Form } from "antd";
import { tasksSelector } from "../state/userTasks/userTasks.reducer";
import { CREATE } from "../../../constants/formType.constants";
import { handleAddTask } from "../TaskList/TaskList.utils";

const TaskDialog = ({
  user,
  messageApi,
  openDialog,
  setOpenDialog,
  formValues,
  formType,
  ...props
}) => {
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

  const [form] = Form.useForm();

  const [disableAddButton, setDisableAddButton] = useState(
    formValues.name.length === 0
  );

  const handleOnOk = (e) => {
    handleAddTask({
      e,
      dispatch,
      user,
      createTaskSuccess,
      setOpenDialog,
      createTaskFailed,
    });
  };

  const { isLoadingTasks } = useSelector(tasksSelector);
  return (
    openDialog && (
      <Modal
        open={openDialog}
        formTitle={formType === CREATE ? "Add New Task" : "Edit Task"}
        onOk={handleOnOk}
        onCancel={() => {
          setOpenDialog(false);
        }}
        okText={formType === CREATE ? "Add" : "Save"}
        form={form}
        centered={true}
        width="50vw"
        destroyOnClose={true}
        loading={isLoadingTasks}
        disableOk={disableAddButton}
      >
        <TaskDialogForm
          layout="vertical"
          form={form}
          initialValues={formValues}
          setDisableAddButton={setDisableAddButton}
          {...props}
        />
      </Modal>
    )
  );
};

export default TaskDialog;
