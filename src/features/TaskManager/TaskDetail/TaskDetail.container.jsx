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

const TaskDetailsContainer = ({ user, selectedTaskDetails }) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const [form] = Form.useForm();
  const [formType, setFormType] = useState(VIEW);

  const formValues = useMemo(() => {
    if (selectedTaskDetails.length === 1) {
      return getFormValueFromTaskDetail({
        taskDetails: selectedTaskDetails[0],
      });
    }
  }, [selectedTaskDetails]);

  const [lastSavedFormValues, setLastSavedFormValues] = useState(
    selectedTaskDetails.length === 1 &&
      getFormValueFromTaskDetail({ taskDetails: selectedTaskDetails[0] })
  );

  useEffect(() => {
    selectedTaskDetails.length === 1 &&
      setLastSavedFormValues(
        getFormValueFromTaskDetail({ taskDetails: selectedTaskDetails[0] })
      );
  }, [selectedTaskDetails]);

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
        padding: "0.5rem 1rem",
        overflow: "auto",
        background: colorBgContainer,
      }}
    >
      <Spinner spinning={isLoadingTasks} indicator={Loading(LOADER_SIZE)}>
        {selectedTaskDetails.length === 1 ? (
          <Form
            form={form}
            name="detail_form"
            onFinish={(formValues) =>
              handleEditTask({
                taskDetails: selectedTaskDetails[0],
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
              taskDetails={selectedTaskDetails[0]}
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
