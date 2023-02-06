import { useState, useEffect, useMemo } from "react";
import { Form, Layout, message, theme } from "antd";
import { VIEW } from "../../../constants/formType.constants";
import NotTaskSelected from "./NotTaskSelected";
import TaskDetails from "./TaskDetails";
import dayjs from "../../../utils/dateTime.uitls";
import { DAY, TIME_FORMAT_IN_DB } from "../../../constants/dateTime.constants";
import { editTaskAction } from "../state/userTasks/userTasks.actions";
import { useDispatch, useSelector } from "react-redux";
import { LOADER_SIZE, SUCCESS } from "../../../constants/app.constants";
import Loading from "../../../components/Loading";
import { tasksSelector } from "../state/userTasks/userTasks.reducer";
import Spinner from "../../../components/Spinner";
import {
  END_BY_DATE,
  END_BY_REPEAT_COUNT,
  repeatMapping,
} from "../../../constants/repeating.constants";

const getFormValueFromTaskDetail = ({ taskDetails }) => {
  return {
    ...taskDetails,
    taskDate: taskDetails?.taskDate ? dayjs(taskDetails?.taskDate) : null,
    duration:
      taskDetails?.startTime && taskDetails?.endTime
        ? [
            dayjs(taskDetails.startTime, TIME_FORMAT_IN_DB),
            dayjs(taskDetails.endTime, TIME_FORMAT_IN_DB),
          ]
        : null,
    endByDate: taskDetails?.endByDate ? dayjs(taskDetails?.endByDate) : null,
  };
};

const TaskDetailsContainer = ({ user, taskDetails }) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const [form] = Form.useForm();
  const [formType, setFormType] = useState(VIEW);

  const formValues = useMemo(() => {
    return getFormValueFromTaskDetail({ taskDetails: taskDetails });
    // eslint-disable-next-line
  }, [taskDetails]);

  useEffect(() => {
    form.setFieldsValue(formValues);
    setFormType(VIEW);
  }, [form, formValues]);

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
        (formValues.taskDate && formValues.taskDate.startOf(DAY).format()) ||
        null,
      isAllDay: formValues.duration?.length > 0 ? false : true,
      startTime:
        formValues.taskDate && formValues.duration
          ? formValues.duration[0].format(TIME_FORMAT_IN_DB)
          : null,
      endTime:
        formValues.taskDate && formValues.duration
          ? formValues.duration[1].format(TIME_FORMAT_IN_DB)
          : null,
      isRepeating:
        formValues.taskDate && formValues.repeatFrequency ? true : false,
      repeatFrequency:
        formValues.taskDate && formValues.repeatFrequency
          ? formValues.repeatFrequency
          : null,
      endBy:
        formValues.taskDate && formValues.repeatFrequency && formValues.endBy
          ? formValues.endBy
          : null,
      endByDate:
        formValues.taskDate &&
        formValues.repeatFrequency &&
        formValues.endBy === END_BY_DATE &&
        formValues.endByDate
          ? formValues.endByDate.endOf(DAY).format()
          : null,
      endByRepeatCount:
        formValues.taskDate &&
        formValues.repeatFrequency &&
        formValues.endBy === END_BY_REPEAT_COUNT &&
        formValues.endByRepeatCount !== undefined &&
        parseInt(formValues.endByRepeatCount) >= 0
          ? parseInt(formValues.endByRepeatCount)
          : null,
      endByRepeatCountDate:
        formValues.taskDate &&
        formValues.repeatFrequency &&
        formValues.endBy === END_BY_REPEAT_COUNT &&
        formValues.endByRepeatCount !== undefined &&
        parseInt(formValues.endByRepeatCount) >= 0
          ? formValues.taskDate
              .startOf(DAY)
              .add(
                parseInt(formValues.endByRepeatCount - 1),
                repeatMapping[formValues.repeatFrequency]
              )
              .endOf(DAY)
              .format()
          : null,
      progress: parseInt(formValues.progress),
      modifiedTime: modifiedTime,
    };
    dispatch(editTaskAction(user.uid, modifiedTask, modifiedTask.id)).then(
      (response) => {
        if (response.success === SUCCESS) {
          editTaskSuccess();
          setFormType(VIEW);
          form.setFieldsValue(
            getFormValueFromTaskDetail({ taskDetails: modifiedTask })
          );
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
        padding: "1rem 1rem 0rem 1rem",
        background: colorBgContainer,
      }}
    >
      <Spinner spinning={isLoadingTasks} indicator={Loading(LOADER_SIZE)}>
        {taskDetails ? (
          <Form
            form={form}
            name="detail_form"
            onFinish={(formValues) => onSubmit({ taskDetails, formValues })}
            initialValues={formValues}
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
