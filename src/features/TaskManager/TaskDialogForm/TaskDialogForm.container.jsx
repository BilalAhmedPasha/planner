import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../../../components/Modal";
import TaskDialogForm from "./TaskDialogForm";
import { SUCCESS } from "../../../constants/app.constants";
import { addTaskAction } from "../state/userTasks/userTasks.actions";
import { Form } from "antd";
import dayjs from "../../../utils/dateTime.utils";
import { DAY, TIME_FORMAT_IN_DB } from "../../../constants/dateTime.constants";
import { tasksSelector } from "../state/userTasks/userTasks.reducer";
import {
  END_BY_DATE,
  END_BY_REPEAT_COUNT,
  repeatMapping,
} from "../../../constants/repeating.constants";

const TaskDialog = ({
  user,
  messageApi,
  openDialog,
  setOpenDialog,
  formValues,
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

  const handleAddTask = (e) => {
    const createdTime = dayjs.utc().format();
    const newTask = {
      name: e.name,
      description: e.description || null,
      listId: e.list,
      priority: e.priority,
      tagIds: e.tags || [],
      taskDate: (e.taskDate && e.taskDate.startOf(DAY).format()) || null,
      isAllDay: e.duration?.length > 0 ? false : true,
      startTime:
        e.taskDate && e.duration
          ? e.duration[0].format(TIME_FORMAT_IN_DB)
          : null,
      endTime:
        e.taskDate && e.duration
          ? e.duration[1].format(TIME_FORMAT_IN_DB)
          : null,
      isRepeating: e.taskDate && e.repeatFrequency ? true : false,
      repeatFrequency:
        e.taskDate && e.repeatFrequency ? e.repeatFrequency : null,
      endBy: e.taskDate && e.repeatFrequency && e.endBy ? e.endBy : null,
      endByDate:
        e.taskDate &&
        e.repeatFrequency &&
        e.endBy === END_BY_DATE &&
        e.endByDate
          ? e.endByDate.endOf(DAY).format()
          : null,
      endByRepeatCount:
        e.taskDate &&
        e.repeatFrequency &&
        e.endBy === END_BY_REPEAT_COUNT &&
        e.endByRepeatCount !== undefined &&
        parseInt(e.endByRepeatCount) >= 0
          ? parseInt(e.endByRepeatCount)
          : null,
      endByRepeatCountDate:
        e.taskDate &&
        e.repeatFrequency &&
        e.endBy === END_BY_REPEAT_COUNT &&
        e.endByRepeatCount !== undefined &&
        parseInt(e.endByRepeatCount) >= 0
          ? e.taskDate
              .startOf(DAY)
              .add(
                parseInt(e.endByRepeatCount - 1),
                repeatMapping[e.repeatFrequency]
              )
              .endOf(DAY)
              .format()
          : null,
      isMultiDay: e.dateRange ? true : false,
      startMultiDate:
        (e.dateRange && e.dateRange[0].startOf(DAY).format()) || null,
      endMultiDate: (e.dateRange && e.dateRange[1].endOf(DAY).format()) || null,
      isCompleted: false,
      isWontDo: false,
      isDeleted: 0,
      completedTime: null,
      progress: 0,
      parentTaskId: null,
      childTaskIds: [],
      createdTime: createdTime,
      modifiedTime: createdTime,
    };
    dispatch(addTaskAction(user.uid, newTask)).then((response) => {
      if (response.success === SUCCESS) {
        createTaskSuccess();
        setOpenDialog(false);
      } else {
        createTaskFailed();
      }
    });
  };

  const [form] = Form.useForm();

  const [disableAddButton, setDisableAddButton] = useState(true);

  const { isLoadingTasks } = useSelector(tasksSelector);
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
