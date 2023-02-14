import { useState, useEffect, useMemo } from "react";
import { Form, Layout, message, theme } from "antd";
import { VIEW } from "../../../constants/formType.constants";
import NotTaskSelected from "./NotTaskSelected";
import TaskDetails from "./TaskDetails";
import { useDispatch, useSelector } from "react-redux";
import { LOADER_SIZE } from "../../../constants/app.constants";
import Loading from "../../../components/Loading";
import { tasksSelector } from "../state/userTasks/userTasks.reducer";
import Spinner from "../../../components/Spinner";
import {
  getFormValueFromTaskDetail,
  handleEditTask,
} from "../TaskList/TaskList.utils";

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

  const [lastSavedFormValues, setLastSavedFormValues] = useState(
    getFormValueFromTaskDetail({ taskDetails: taskDetails })
  );

  useEffect(() => {
    setLastSavedFormValues(
      getFormValueFromTaskDetail({ taskDetails: taskDetails })
    );
    // eslint-disable-next-line
  }, [taskDetails?.id]);

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

  return (
    <Layout.Content
      style={{
        marginLeft: "0.1rem",
        padding: "1rem 1rem 0rem 1rem",
        overflow: "auto",
        background: colorBgContainer,
      }}
    >
      <Spinner spinning={isLoadingTasks} indicator={Loading(LOADER_SIZE)}>
        {taskDetails ? (
          <Form
            form={form}
            name="detail_form"
            onFinish={(formValues) =>
              handleEditTask({
                taskDetails,
                formValues,
                dispatch,
                user,
                editTaskSuccess,
                setFormType,
                form,
                setLastSavedFormValues,
                editTaskFailed,
              })
            }
            initialValues={formValues}
          >
            <TaskDetails
              taskDetails={taskDetails}
              form={form}
              formType={formType}
              setFormType={setFormType}
              lastSavedFormValues={lastSavedFormValues}
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
