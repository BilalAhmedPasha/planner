import {
  DatePicker,
  Form,
  InputNumber,
  Layout,
  Select,
  Space,
  Tag,
  theme,
  TimePicker,
  Typography,
} from "antd";
import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { listsSelector } from "../../state/userLists/userLists.reducer";
import { tagsSelector } from "../../state/userTags/userTags.reducer";
import { FlagFilled } from "@ant-design/icons";
import {
  HIGH,
  LOW,
  MEDIUM,
  NONE,
} from "../../../../constants/priority.constants";
import {
  HIGH_COLOR,
  LOW_COLOR,
  MEDIUM_COLOR,
  NONE_COLOR,
} from "../../../../constants/color.constants";
import { INBOX } from "../../../../constants/app.constants";
import { DATE_FORMAT, TIME_FORMAT } from "../../../../constants/dateTime.constants";

const tagRender = (props) => {
  const { label, value, closable, onClose } = props;
  const [id, color] = value.split("/");
  const onPreventMouseDown = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };
  return (
    <Tag
      color={color}
      onMouseDown={onPreventMouseDown}
      closable={closable}
      onClose={onClose}
      style={{
        marginRight: 3,
      }}
    >
      {label}
    </Tag>
  );
};

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
        label: each.label,
        value: `${each.id}/${each.color}`,
      };
    });
  }, [tags]);

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const [priorityColor, setPriorityColor] = useState(NONE_COLOR);
  const handlePriorityChange = (event) => {
    if (event === HIGH) {
      setPriorityColor(HIGH_COLOR);
    } else if (event === MEDIUM) {
      setPriorityColor(MEDIUM_COLOR);
    } else if (event === LOW) {
      setPriorityColor(LOW_COLOR);
    } else {
      setPriorityColor(NONE_COLOR);
    }
  };

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
          overflowX: "hidden",
          padding: "0rem 2rem",
        }}
      >
        <Form.Item name="list" label="List">
          <Select
            options={[
              {
                value: INBOX,
                label: "Inbox",
              },
              ...listOptions,
            ]}
          />
        </Form.Item>

        <Form.Item
          name="priority"
          label={
            <Space>
              <Typography.Text>{"Priority"}</Typography.Text>
              <FlagFilled style={{ color: priorityColor }} />
            </Space>
          }
        >
          <Select
            onSelect={(event) => handlePriorityChange(event)}
            options={[
              {
                value: HIGH,
                label: "High",
              },
              {
                value: MEDIUM,
                label: "Medium",
              },
              {
                value: LOW,
                label: "Low",
              },
              {
                value: NONE,
                label: "None",
              },
            ]}
          />
        </Form.Item>

        <Form.Item name="tags" label="Tags">
          <Select
            mode="multiple"
            allowClear
            options={tagOptions}
            maxTagCount={2}
            maxTagTextLength={5}
            tagRender={tagRender}
          />
        </Form.Item>
        <Form.Item name="date" label="Date">
          <DatePicker
            format={DATE_FORMAT}
            style={{
              cursor: "pointer",
              width: "100%",
            }}
          />
        </Form.Item>
        <Form.Item name="dateRange" label="Date Range">
          <DatePicker.RangePicker
            format={DATE_FORMAT}
            style={{
              cursor: "pointer",
              width: "100%",
            }}
          />
        </Form.Item>
        <Form.Item name="duration" label="Duration">
          <TimePicker.RangePicker
            format={TIME_FORMAT}
            style={{
              cursor: "pointer",
              width: "100%",
            }}
          />
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
          <DatePicker
            format={DATE_FORMAT}
            style={{
              cursor: "pointer",
              width: "100%",
            }}
          />
        </Form.Item>
        <Form.Item name="endByARepeatCount" label="End by repeat count">
          <InputNumber
            min={2}
            style={{
              cursor: "pointer",
              width: "100%",
            }}
          />
        </Form.Item>
      </div>
    </Layout.Content>
  );
};

export default TaskDialogRightPanel;
