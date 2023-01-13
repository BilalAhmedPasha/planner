import {
  DatePicker,
  Form,
  InputNumber,
  Layout,
  Select,
  Space,
  Switch,
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
import {
  DATE_FORMAT,
  TIME_FORMAT,
} from "../../../../constants/dateTime.constants";
import dayjs from "dayjs";
const utc = require("dayjs/plugin/utc");
dayjs.extend(utc);

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

const TaskDialogRightPanel = ({ height }) => {
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

  const [isMultiDay, setIsMultiDay] = useState(false);
  const [isRepeating, setIsRepeating] = useState(false);
  const [showEndByDate, setShowEndByDate] = useState(false);
  const [showEndByRepeatCount, setshowEndByRepeatCount] = useState(false);

  const [startDate, setStartDate] = useState();

  const handleStartDateChange = (e) => {
    setStartDate(e);
  };

  const handleIsMultiDaySwitch = (e) => {
    setIsMultiDay(e);
    if (e === true) {
      setIsRepeating(false);
    }
  };

  const handleRepeatDropDownChange = (e) => {
    if (e) {
      setIsRepeating(true);
    } else {
      setIsRepeating(false);
    }
  };

  const handleEndByDropDownChange = (e) => {
    if (e === "endByDate") {
      setShowEndByDate(true);
      setshowEndByRepeatCount(false);
    } else if (e === "endByRepeatCount") {
      setShowEndByDate(false);
      setshowEndByRepeatCount(true);
    } else {
      setShowEndByDate(false);
      setshowEndByRepeatCount(false);
    }
  };

  const disabledStartDate = (current) => {
    // const currentDate = dayjs.utc(current);
    return current.isBefore(dayjs.utc().subtract(1, "day"));
  };

  const disabledEndDate = (current) => {
    // const currentDate = dayjs.utc(current);
    return current.isBefore(startDate);
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
          height: height,
          overflowY: "scroll",
          overflowX: "hidden",
          padding: "1rem 1.5rem",
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
        <Form.Item>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography.Text
              style={{
                fontSize: "0.9rem",
              }}
            >
              {"Multi day task"}
            </Typography.Text>
            <Switch onClick={handleIsMultiDaySwitch} />
          </div>
        </Form.Item>
        {!isMultiDay && (
          <Form.Item name="date" label="Schedule">
            <DatePicker
              format={DATE_FORMAT}
              disabledDate={disabledStartDate}
              style={{
                cursor: "pointer",
                width: "100%",
              }}
              onChange={handleStartDateChange}
            />
          </Form.Item>
        )}
        {isMultiDay && (
          <Form.Item
            name="dateRange"
            label="Schedule"
            rules={[
              {
                required: true,
                message: "Date range is required",
              },
            ]}
          >
            <DatePicker.RangePicker
              format={DATE_FORMAT}
              style={{
                cursor: "pointer",
                width: "100%",
              }}
            />
          </Form.Item>
        )}
        <Form.Item name="duration">
          <TimePicker.RangePicker
            format={TIME_FORMAT}
            style={{
              cursor: "pointer",
              width: "100%",
            }}
          />
        </Form.Item>
        {!isMultiDay && (
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
              onChange={handleRepeatDropDownChange}
            />
          </Form.Item>
        )}
        {isRepeating && (
          <Form.Item name="endBy" label="End by">
            <Select
              options={[
                {
                  value: "endless",
                  label: "EndLess",
                },
                {
                  value: "endByDate",
                  label: "End by date",
                },
                {
                  value: "endByRepeatCount",
                  label: "End by repeat count",
                },
              ]}
              onChange={handleEndByDropDownChange}
            />
          </Form.Item>
        )}

        {isRepeating && showEndByDate && (
          <Form.Item
            name="endByDate"
            label="End Date"
            rules={[
              {
                required: true,
                message: "End date is required",
              },
            ]}
          >
            <DatePicker
              format={DATE_FORMAT}
              style={{
                cursor: "pointer",
                width: "100%",
              }}
              disabledDate={disabledEndDate}
            />
          </Form.Item>
        )}
        {isRepeating && showEndByRepeatCount && (
          <Form.Item
            name="endByRepeatCount"
            label="Repeat Count"
            rules={[
              {
                required: true,
                message: "Repeat count is required",
              },
            ]}
          >
            <InputNumber
              min={2}
              style={{
                cursor: "pointer",
                width: "100%",
              }}
            />
          </Form.Item>
        )}
      </div>
    </Layout.Content>
  );
};

export default TaskDialogRightPanel;
