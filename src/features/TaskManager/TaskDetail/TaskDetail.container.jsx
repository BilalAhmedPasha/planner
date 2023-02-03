import { useState, useEffect, useMemo } from "react";
import { Form, Layout, theme } from "antd";
import { VIEW } from "../../../constants/formType.constants";
import NotTaskSelected from "./NotTaskSelected";
import TaskDetails from "./TaskDetails";
import dayjs from "../../../utils/dateTime.uitls";
import { TIME_FORMAT_IN_DB } from "../../../constants/dateTime.constants";

import {
  HIGH_COLOR,
  LOW_COLOR,
  MEDIUM_COLOR,
  NONE_COLOR,
} from "../../../constants/color.constants";
import { HIGH, LOW, MEDIUM } from "../../../constants/priority.constants";

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

const TaskDetailsContainer = ({ taskDetails }) => {
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
