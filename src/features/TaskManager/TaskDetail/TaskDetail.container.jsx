import { Form, Layout, theme } from "antd";
import { useMemo, useState } from "react";
import { VIEW } from "../../../constants/formType.constants";
import NotTaskSelected from "./NotTaskSelected";
import TaskDetails from "./TaskDetails";
import dayjs from "../../../utils/dateTime.uitls";
import { TIME_FORMAT_IN_DB } from "../../../constants/dateTime.constants";
import { useSelector } from "react-redux";
import { listsSelector } from "../state/userLists/userLists.reducer";
import { tagsSelector } from "../state/userTags/userTags.reducer";

const TaskDetailsContainer = ({ taskDetails, form }) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const [formType, setFormType] = useState(VIEW);

  const FORM_VALUES = {
    ...taskDetails,
    date: dayjs(taskDetails?.taskDate),
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

  const onSubmit = (values) => {
    console.log("Form values ", values);
    setFormType(VIEW);
  };

  const { lists } = useSelector(listsSelector);
  const { tags } = useSelector(tagsSelector);

  const listOptions = useMemo(() => {
    return lists.map((each) => {
      return {
        value: each.id,
        label: each.label,
        color: each.color,
      };
    });
  }, [lists]);

  const tagOptions = useMemo(() => {
    return tags.map((each) => {
      return {
        id: each.id,
        label: each.label,
        value: each.id,
      };
    });
  }, [tags]);

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
            listOptions={listOptions}
            tagOptions={tagOptions}
          />
        </Form>
      ) : (
        <NotTaskSelected />
      )}
    </Layout.Content>
  );
};

export default TaskDetailsContainer;
