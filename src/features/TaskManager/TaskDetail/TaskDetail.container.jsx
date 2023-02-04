import { useState, useEffect, useMemo } from "react";
import { Form, Layout, message, theme } from "antd";
import { VIEW } from "../../../constants/formType.constants";
import NotTaskSelected from "./NotTaskSelected";
import TaskDetails from "./TaskDetails";
import dayjs from "../../../utils/dateTime.uitls";
import { TIME_FORMAT_IN_DB } from "../../../constants/dateTime.constants";
import { editTaskAction } from "../state/userTasks/userTasks.actions";
import {
  HIGH_COLOR,
  LOW_COLOR,
  MEDIUM_COLOR,
  NONE_COLOR,
} from "../../../constants/color.constants";
import { HIGH, LOW, MEDIUM } from "../../../constants/priority.constants";
import { useDispatch, useSelector } from "react-redux";
import { LOADER_SIZE, SUCCESS } from "../../../constants/app.constants";
import Loading from "../../../components/Loading";
import { tasksSelector } from "../state/userTasks/userTasks.reducer";
import Spinner from "../../../components/Spinner";
import {
  END_BY_DATE,
  END_BY_REPEAT_COUNT,
} from "../../../constants/repeating.constants";

const getPriorityColor = (event) => {
  if (event === HIGH) {
    return HIGH_COLOR;
  } else if (event === MEDIUM) {
    return MEDIUM_COLOR;
  } else if (event === LOW) {
    return LOW_COLOR;
  } else {
    return NONE_COLOR;
  }
};

const TaskDetailsContainer = ({ user, taskDetails }) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const [form] = Form.useForm();
  const [formType, setFormType] = useState(VIEW);

  const FORM_VALUES = useMemo(() => {
    return {
      ...taskDetails,
      priorityColor: getPriorityColor(taskDetails?.priority),
      date: taskDetails?.taskDate ? dayjs(taskDetails?.taskDate) : null,
      duration:
        taskDetails?.startTime && taskDetails?.endTime
          ? [
              dayjs(taskDetails.startTime, TIME_FORMAT_IN_DB),
              dayjs(taskDetails.endTime, TIME_FORMAT_IN_DB),
            ]
          : null,
      repeat: taskDetails?.repeatFrequency,
      endByDate: taskDetails?.endByDate ? dayjs(taskDetails?.endByDate) : null,
    };
    // eslint-disable-next-line
  }, [taskDetails?.id]);

  useEffect(() => {
    form.setFieldsValue(FORM_VALUES);
    setFormType(VIEW);
  }, [form, FORM_VALUES]);

  const dispatch = useDispatch();
  const [messageApi] = message.useMessage();
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

  const { isLoadingTasks } = useSelector(tasksSelector);

  const onSubmit = ({ taskDetails, formValues }) => {
    const modifiedTime = dayjs.utc().format();
    const modifiedTask = {
      ...taskDetails,
      name: formValues.name,
      description: formValues.description || null,
      listId: formValues.listId,
      priority: formValues.priority,
      tagIds: formValues.tagIds || [],
      taskDate:
        (formValues.date && formValues.date.startOf("day").format()) || null,
      isAllDay: formValues.duration?.length > 0 ? false : true,
      startTime:
        (formValues.duration &&
          formValues.duration[0].format(TIME_FORMAT_IN_DB)) ||
        null,
      endTime:
        (formValues.duration &&
          formValues.duration[1].format(TIME_FORMAT_IN_DB)) ||
        null,
      isRepeating: formValues.repeat ? true : false,
      repeatFrequency: formValues.repeat || null,
      endBy: formValues.endBy || null,
      endByDate:
        (formValues.endBy === END_BY_DATE &&
          formValues.endByDate &&
          formValues.endByDate.endOf("day").format()) ||
        null,
      endByRepeatCount:
        formValues.endBy === END_BY_REPEAT_COUNT &&
        formValues.endByRepeatCount !== undefined &&
        parseInt(formValues.endByRepeatCount) >= 0
          ? parseInt(formValues.endByRepeatCount)
          : null,
      endByRepeatCountDate:
        formValues.endByRepeatCount !== undefined &&
        parseInt(formValues.endByRepeatCount) >= 0
          ? formValues.date
              .startOf("day")
              .add(parseInt(formValues.endByRepeatCount), "day")
              .endOf("day")
              .format()
          : null,
      progress: formValues.progress,
      modifiedTime: modifiedTime,
    };
    dispatch(editTaskAction(user.uid, modifiedTask, modifiedTask.id)).then(
      (response) => {
        if (response.success === SUCCESS) {
          editTaskSuccess();
          setFormType(VIEW);
        } else {
          editTaskFailed();
        }
      }
    );
  };

  return (
    <Layout.Content
      style={{
        marginLeft: "0.1rem",
        padding: "1.5rem 1rem",
        background: colorBgContainer,
      }}
    >
      <Spinner spinning={isLoadingTasks} indicator={Loading(LOADER_SIZE)}>
        {taskDetails ? (
          <Form
            form={form}
            name="detail_form"
            onFinish={(formValues) => onSubmit({ taskDetails, formValues })}
            initialValues={FORM_VALUES}
          >
            <TaskDetails
              taskDetails={taskDetails}
              form={form}
              formType={formType}
              setFormType={setFormType}
            />
          </Form>
        ) : (
          <NotTaskSelected />
        )}
      </Spinner>
    </Layout.Content>
  );
};

export default TaskDetailsContainer;
