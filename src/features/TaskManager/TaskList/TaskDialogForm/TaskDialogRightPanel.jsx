import {
  DatePicker,
  Form,
  InputNumber,
  Layout,
  Select,
  theme,
  TimePicker,
} from "antd";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { listsSelector } from "../../state/userLists/userLists.reducer";
import { tagsSelector } from "../../state/userTags/userTags.reducer";

const TaskDialogRightPanel = () => {
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
        value: each.id,
        label: each.label,
        color: each.color,
      };
    });
  }, [tags]);

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout.Content
      style={{
        marginLeft: "0.1rem",
        background: colorBgContainer,
      }}
    >
      <div
        style={{
          height: "70vh",
          overflowY: "scroll",
          padding: "2rem 2rem",
        }}
      >
        <Form.Item name="list" label="List">
          <Select
            options={[
              {
                value: "inbox",
                label: "Inbox",
              },
              ...listOptions,
            ]}
          />
        </Form.Item>
        <Form.Item name="priority" label="Priority">
          <Select
            options={[
              {
                value: "high",
                label: "High",
              },
              {
                value: "medium",
                label: "Medium",
              },
              {
                value: "low",
                label: "Low",
              },
              {
                value: "none",
                label: "None",
              },
            ]}
          />
        </Form.Item>

        <Form.Item name="tag" label="Tags">
          <Select mode="multiple" allowClear options={tagOptions} />
        </Form.Item>
        <Form.Item name="date" label="Date">
          <DatePicker format="DD-MM-YYYY" />
        </Form.Item>
        <Form.Item name="dateRange" label="Date Range">
          <DatePicker.RangePicker format="DD-MM-YYYY" />
        </Form.Item>
        <Form.Item name="duration" label="Duration">
          <TimePicker.RangePicker format="h:mm A" />
        </Form.Item>
        <Form.Item name="repeat" label="Repeat">
          <Select
            allowClear
            options={[
              {
                value: "daily",
                label: "Daily",
              },
              {
                value: "weekly",
                label: "Weekly",
              },
              {
                value: "monthly",
                label: "Monthly",
              },
            ]}
          />
        </Form.Item>
        <Form.Item name="endBy" label="End by">
          <Select
            options={[
              {
                value: "endless",
                label: "EndLess",
              },
              {
                value: "endByDate",
                label: "End by a date",
              },
              {
                value: "endByARepeatCount",
                label: "End by a repeat count",
              },
            ]}
          />
        </Form.Item>
        <Form.Item name="endByDatePicker" label="End by Date">
          <DatePicker format="DD-MM-YYYY" />
        </Form.Item>
        <Form.Item name="endByARepeatCount" label="End by repeat count">
          <InputNumber min={2} />
        </Form.Item>
      </div>
    </Layout.Content>
  );
};

export default TaskDialogRightPanel;
