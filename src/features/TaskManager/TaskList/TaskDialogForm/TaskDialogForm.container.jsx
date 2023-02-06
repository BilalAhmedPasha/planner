import React, { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../../../../components/Modal";
import TaskDialogForm from "./TaskDialogForm";
import {
  INBOX,
  LISTS,
  SUCCESS,
  TAGS,
} from "../../../../constants/app.constants";
import { addTaskAction } from "../../state/userTasks/userTasks.actions";
import { Form } from "antd";
import { NONE } from "../../../../constants/priority.constants";
import { useParams } from "react-router-dom";
import dayjs from "../../../../utils/dateTime.uitls";
import {
  DAY,
  TIME_FORMAT_IN_DB,
  TIME_ZONE,
} from "../../../../constants/dateTime.constants";
import { tasksSelector } from "../../state/userTasks/userTasks.reducer";
import {
  ENDLESS,
  END_BY_DATE,
  END_BY_REPEAT_COUNT,
  repeatMapping,
} from "../../../../constants/repeating.constants";

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
    const createdTime = dayjs.utc().format();
    const newTask = {
      name: e.name,
      description: e.description || null,
      listId: e.list,
      priority: e.priority,
      tagIds: e.tags || [],
      taskDate: (e.date && e.date.startOf(DAY).format()) || null,
      isAllDay: e.duration?.length > 0 ? false : true,
      startTime:
        e.date && e.duration ? e.duration[0].format(TIME_FORMAT_IN_DB) : null,
      endTime:
        e.date && e.duration ? e.duration[1].format(TIME_FORMAT_IN_DB) : null,
      isRepeating: e.date && e.repeat ? true : false,
      repeatFrequency: e.date && e.repeat ? e.repeat : null,
      endBy: e.date && e.repeat && e.endBy ? e.endBy : null,
      endByDate:
        e.date && e.repeat && e.endBy === END_BY_DATE && e.endByDate
          ? e.endByDate.endOf(DAY).format()
          : null,
      endByRepeatCount:
        e.date &&
        e.repeat &&
        e.endBy === END_BY_REPEAT_COUNT &&
        e.endByRepeatCount !== undefined &&
        parseInt(e.endByRepeatCount) >= 0
          ? parseInt(e.endByRepeatCount)
          : null,
      endByRepeatCountDate:
        e.date &&
        e.repeat &&
        e.endBy === END_BY_REPEAT_COUNT &&
        e.endByRepeatCount !== undefined &&
        parseInt(e.endByRepeatCount) >= 0
          ? e.date
              .startOf(DAY)
              .add(parseInt(e.endByRepeatCount - 1), repeatMapping[e.repeat])
              .endOf(DAY)
              .format()
          : null,
      isMultiDay: e.dateRange ? true : false,
      startMultiDate:
        (e.dateRange && e.dateRange[0].startOf(DAY).format()) || null,
      endMultiDate:
        (e.dateRange && e.dateRange[1].endOf(DAY).format()) || null,
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

  const TASK_LIST = sectionId === LISTS ? documentId : INBOX;

  const TASK_TAGS = useMemo(() => {
    if (sectionId === TAGS) {
      return [documentId];
    }
    return [];
  }, [documentId, sectionId]);

  const TASK_DATE = useMemo(() => {
    if (sectionId === "today") {
      const today = dayjs.utc().tz(TIME_ZONE);
      return today;
    } else if (sectionId === "tomorrow") {
      const tomorrow = dayjs.utc().tz(TIME_ZONE).add(1,DAY);
      return tomorrow;
    }
  }, [sectionId]);

  const FORM_VALUES = {
    name: "",
    list: TASK_LIST,
    priority: NONE,
    endBy: ENDLESS,
    tags: TASK_TAGS,
    date: TASK_DATE,
  };

  const [form] = Form.useForm();

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
      >
        <TaskDialogForm
          layout="vertical"
          form={form}
          initialValues={FORM_VALUES}
        />
      </Modal>
    )
  );
};

export default TaskDialog;
