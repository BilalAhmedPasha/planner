import React, { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../../../../components/Modal";
import TaskDialogForm from "./TaskDialogForm";
import { INBOX, LISTS, SUCCESS, TAGS } from "../../../../constants/app.constants";
import { addTaskAction } from "../../state/userTasks/userTasks.actions";
import { Form } from "antd";
import { NONE } from "../../../../constants/priority.constants";
import { useParams } from "react-router-dom";
import { tagsSelector } from "../../state/userTags/userTags.reducer";
import dayjs from "dayjs";
const utc = require("dayjs/plugin/utc");
const timezone = require("dayjs/plugin/timezone");
dayjs.extend(utc);
dayjs.extend(timezone);

const TaskDialog = ({ user, messageApi, openDialog, setOpenDialog }) => {
  console.log(dayjs.utc());
  console.log(dayjs.utc().format());
  console.log(dayjs(dayjs.utc().format()));
  console.log(dayjs("2013-11-18T11:55:20").tz("America/Toronto"));
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
      createdTime: dayjs.utc().format(),
      modifiedTime: dayjs.utc().format(),
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

  const TASK_LIST = sectionId === LISTS ? documentId : INBOX;

  const { tags } = useSelector(tagsSelector);
  const TASK_TAGS = useMemo(() => {
    if (sectionId === TAGS) {
      const currentTag = tags.find((each) => each.id === documentId);
      return [`${documentId}/${currentTag.color}`];
    }
    return [];
  }, [documentId, sectionId, tags]);

  const TASK_DATE = useMemo(() => {
    if (sectionId === "today") {
      return dayjs.utc();
    } else if (sectionId === "tomorrow") {
      return dayjs.utc().add(1, "day");
    }
  }, [sectionId]);

  const FORM_VALUES = {
    name: "",
    list: TASK_LIST,
    priority: NONE,
    endBy: "endless",
    tags: TASK_TAGS,
    date: TASK_DATE,
  };

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
          initialValues={FORM_VALUES}
        />
      </Modal>
    )
  );
};

export default TaskDialog;
