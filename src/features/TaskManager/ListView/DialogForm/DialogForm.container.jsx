import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../../../../components/Modal";
import TaskDialogForm from "./DialogForm";
import { Form } from "antd";
import { tasksSelector } from "../../state/userTasks/userTasks.reducer";
import { CREATE, EDIT } from "../../../../constants/formType.constants";
import {
  handleAddTask,
  handleEditTask,
} from "../List.utils";
import { navToDrawer } from "../../../../utils/screen.utils";
import useWindowSize from "../../../../hooks/useWindowSize";

const TaskDialogContainer = ({
  user,
  messageApi,
  openDialog,
  setOpenDialog,
  formValues,
  formType,
  taskDetails,
  isFromCalendar = false,
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

  const editTaskSuccess = () => {
    messageApi.open({
      type: "success",
      content: "Task edited",
      duration: 3,
    });
  };

  const editTaskFailed = () => {
    messageApi.open({
      type: "error",
      content: "Failed to edit task",
      duration: 3,
    });
  };

  const [form] = Form.useForm();

  const [disableAddButton, setDisableAddButton] = useState(
    formValues.name.length === 0
  );

  const handleOnOk = (formValues) => {
    if (formType === CREATE) {
      handleAddTask({
        formValues,
        dispatch,
        user,
        createTaskSuccess,
        setOpenDialog,
        createTaskFailed,
      });
    } else if (formType === EDIT) {
      if (isFromCalendar) {
        delete taskDetails.start;
        delete taskDetails.end;
      }
      handleEditTask({
        taskDetails: taskDetails,
        formValues,
        dispatch,
        user,
        editTaskSuccess,
        setOpenDialog,
        editTaskFailed,
        isFromCalendar,
      });
    }
  };

  const { isLoadingTasks } = useSelector(tasksSelector);
  const screenSize = useWindowSize();

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
        width={
          navToDrawer({ currentWidth: screenSize.width }) ? "90vw" : "50vw"
        }
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

export default TaskDialogContainer;
