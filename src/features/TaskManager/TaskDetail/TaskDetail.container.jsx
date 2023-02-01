import { Form, Layout, theme } from "antd";
import { useState } from "react";
import { VIEW } from "../../../constants/formType.constants";
import NotTaskSelected from "./NotTaskSelected";
import TaskDetails from "./TaskDetails";
import dayjs from "../../../utils/dateTime.uitls";
import { TIME_FORMAT_IN_DB } from "../../../constants/dateTime.constants";

const TaskDetailsContainer = ({ taskDetails }) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const [form] = Form.useForm();
  const [formType, setFormType] = useState(VIEW);

  const FORM_VALUES = {
    ...taskDetails,
    date: dayjs(taskDetails?.taskDate),
    duration: [
      dayjs(taskDetails?.startTime, TIME_FORMAT_IN_DB),
      dayjs(taskDetails?.endTime, TIME_FORMAT_IN_DB),
    ],
    repeat: taskDetails?.repeatFrequency,
    endByDate: dayjs(taskDetails?.endByDate),
  };

  const onSubmit = (values) => {
    console.log("Form values ", values);
    setFormType(VIEW);
  };

  return (
    <Layout.Content
      style={{
        marginLeft: "0.1rem",
        padding: "1.5rem 1rem",
        background: colorBgContainer,
      }}
    >
      {taskDetails ? (
        <Form
          form={form}
          name="detail_form"
          onFinish={onSubmit}
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
    </Layout.Content>
  );
};

export default TaskDetailsContainer;
