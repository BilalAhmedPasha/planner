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
import { listsSelector } from "../state/userLists/userLists.reducer";
import { tagsSelector } from "../state/userTags/userTags.reducer";
import { FlagFilled } from "@ant-design/icons";
import {
  HIGH,
  LOW,
  MEDIUM,
  priorityOptions,
} from "../../../constants/priority.constants";
import {
  HIGH_COLOR,
  LOW_COLOR,
  MEDIUM_COLOR,
  NONE_COLOR,
} from "../../../constants/color.constants";
import {
  INBOX,
  MULTI_DATE_AVAILABLE,
} from "../../../constants/app.constants";
import {
  DATE_FORMAT,
  DAY,
  TIME_FORMAT,
  TIME_ZONE,
} from "../../../constants/dateTime.constants";
import dayjs from "../../../utils/dateTime.utils";
import {
  ENDLESS,
  END_BY_DATE,
  END_BY_REPEAT_COUNT,
} from "../../../constants/repeating.constants";

const TaskDialogRightPanel = ({ form, height }) => {
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
        value: each.id,
      };
    });
  }, [tags]);

  const tagRender = (props) => {
    const { label, value, closable, onClose } = props;
    const color = tags.find((each) => each.id === value).color;
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

  const [startDate, setStartDate] = useState(form.getFieldValue("taskDate"));
  const [isScheduled, setIsScheduled] = useState(
    form.getFieldValue("taskDate") ? true : false
  );
  const [isMultiDay, setIsMultiDay] = useState(false);
  const [isRepeating, setIsRepeating] = useState(false);
  const [showEndByDate, setShowEndByDate] = useState(false);
  const [showEndByRepeatCount, setshowEndByRepeatCount] = useState(false);

  const handleStartDateChange = (e) => {
    setStartDate(e);
    if (e) {
      setIsScheduled(true);
    } else {
      setIsScheduled(false);
    }
  };

  const handleIsMultiDaySwitch = (e) => {
    setIsMultiDay(e);
    setIsRepeating(false);
    setIsScheduled(false);
    if (e === true) {
      form.setFieldValue("dateRange", null);
    } else {
      form.setFieldValue("taskDate", null);
      form.setFieldValue("repeatFrequency", null);
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
    if (e === END_BY_DATE) {
      setShowEndByDate(true);
      setshowEndByRepeatCount(false);
    } else if (e === END_BY_REPEAT_COUNT) {
      setShowEndByDate(false);
      setshowEndByRepeatCount(true);
    } else {
      setShowEndByDate(false);
      setshowEndByRepeatCount(false);
    }
  };

  const disabledStartDate = (current) => {
    const today = dayjs.utc().tz(TIME_ZONE).startOf(DAY);
    return current.startOf(DAY).isBefore(today);
  };

  const disabledEndDate = (current) => {
    return startDate && current.startOf(DAY).isBefore(startDate.startOf(DAY));
  };

  const handleDateRangeChange = (e) => {
    if (e) {
      setIsScheduled(true);
    } else {
      setIsScheduled(false);
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
          height: `${height}vh`,
          overflowY: "auto",
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
            options={priorityOptions}
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
            placeholder="Select tags"
          />
        </Form.Item>
        {MULTI_DATE_AVAILABLE && (
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
        )}
        {!isMultiDay && (
          <Form.Item name="taskDate" label="Schedule">
            <DatePicker
              format={DATE_FORMAT}
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
              disabledDate={disabledStartDate}
              format={DATE_FORMAT}
              style={{
                cursor: "pointer",
                width: "100%",
              }}
              onChange={handleDateRangeChange}
            />
          </Form.Item>
        )}
        {isScheduled && (
          <Form.Item name="duration">
            <TimePicker.RangePicker
              format={TIME_FORMAT}
              minuteStep={5}
              style={{
                cursor: "pointer",
                width: "100%",
              }}
            />
          </Form.Item>
        )}
        {!isMultiDay && isScheduled && (
          <Form.Item name="repeatFrequency" label="Repeat">
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
              placeholder="Select repeat frequency"
            />
          </Form.Item>
        )}
        {isScheduled && isRepeating && (
          <Form.Item name="endBy" label="End by">
            <Select
              options={[
                {
                  value: ENDLESS,
                  label: "EndLess",
                },
                {
                  value: END_BY_DATE,
                  label: "End by date",
                },
                {
                  value: END_BY_REPEAT_COUNT,
                  label: "End by repeat count",
                },
              ]}
              onChange={handleEndByDropDownChange}
            />
          </Form.Item>
        )}

        {isScheduled && isRepeating && showEndByDate && (
          <Form.Item
            name={END_BY_DATE}
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
              placeholder="Select end date"
            />
          </Form.Item>
        )}
        {isScheduled && isRepeating && showEndByRepeatCount && (
          <Form.Item
            name={END_BY_REPEAT_COUNT}
            label="Repeat Count"
            rules={[
              {
                required: true,
                message: "Repeat count is required",
              },
            ]}
          >
            <InputNumber
              min={1}
              style={{
                cursor: "pointer",
                width: "100%",
              }}
              placeholder="Enter repeat count"
            />
          </Form.Item>
        )}
      </div>
    </Layout.Content>
  );
};

export default TaskDialogRightPanel;