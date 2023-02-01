import {
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Select,
  Slider,
  Space,
  Tag,
  TimePicker,
} from "antd";
import {
  EditFilled,
  SaveOutlined,
  CloseOutlined,
  FlagFilled,
  CalendarTwoTone,
  ClockCircleTwoTone,
} from "@ant-design/icons";
import { EDIT, VIEW } from "../../../constants/formType.constants";
import { useSelector } from "react-redux";
import { tagsSelector } from "../state/userTags/userTags.reducer";
import { INBOX } from "../../../constants/app.constants";
import { useMemo, useState } from "react";
import { listsSelector } from "../state/userLists/userLists.reducer";
import {
  HIGH_COLOR,
  LOW_COLOR,
  MEDIUM_COLOR,
  NONE_COLOR,
} from "../../../constants/color.constants";
import {
  HIGH,
  LOW,
  MEDIUM,
  priorityOptions,
} from "../../../constants/priority.constants";
import {
  DATE_FORMAT,
  TIME_FORMAT,
} from "../../../constants/dateTime.constants";

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

const TaskDetails = ({ form, formType, setFormType }) => {
  const [priorityColor, setPriorityColor] = useState(() =>
    getPriorityColor(form.getFieldValue("priority"))
  );

  const onReset = () => {
    form.resetFields();
    setFormType(VIEW);
    setPriorityColor(getPriorityColor(form.getFieldValue("priority")));
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
        label: each.label,
        value: each.id,
      };
    });
  }, [tags]);

  const tagRender = (props) => {
    const { label, value, closable, onClose } = props;
    const color = tags.find((each) => each.id === value)?.color;
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

  const handlePriorityColor = (event) => {
    setPriorityColor(getPriorityColor(event));
  };

  const [startDate, setStartDate] = useState(form.getFieldValue("date"));
  const [isRepeating, setIsRepeating] = useState(
    form.getFieldValue("isRepeating")
  );
  const [showEndByDate, setShowEndByDate] = useState(
    form.getFieldValue("endByDate") ? true : false
  );
  const [showEndByRepeatCount, setshowEndByRepeatCount] = useState(
    form.getFieldValue("endByRepeatCount") ? true : false
  );

  const [isScheduled, setIsScheduled] = useState(
    form.getFieldValue("date") ? true : false
  );

  const handleStartDateChange = (e) => {
    setStartDate(e);
    if (e) {
      setIsScheduled(true);
    } else {
      setIsScheduled(false);
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
    // form.validateFields("endByDate");
    // form.validateFields("endByRepeatCount");
  };

  const disabledEndDate = (current) => {
    return (
      startDate && current.startOf("day").isBefore(startDate.startOf("day"))
    );
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          alignContent: "baseline",
          justifyContent: "space-between",
          height: "2.5rem",
          overflowX: "scroll",
        }}
      >
        <Form.Item
          name="name"
          rules={[
            {
              required: true,
              message: "Task name is required",
            },
          ]}
        >
          <Input
            autoComplete="off"
            maxLength={25}
            style={{
              fontWeight: "bold",
              fontSize: "24px",
              padding: "0rem",
              margin: "0rem",
              color: "black",
            }}
            bordered={false}
            disabled={formType === VIEW}
          />
        </Form.Item>
        {formType === VIEW ? (
          <Space>
            <Button
              type="text"
              icon={<EditFilled />}
              onClick={() => setFormType(EDIT)}
            />
          </Space>
        ) : (
          <Space>
            <Button type="text" icon={<CloseOutlined />} onClick={onReset} />
            <Button type="text" icon={<SaveOutlined />} htmlType="submit" />
          </Space>
        )}
      </div>
      <Form.Item name="progress">
        <Slider
          defaultValue={form.getFieldValue("progress")}
          step={10}
          trackStyle={{ height: "3px" }}
          disabled={formType === VIEW}
        />
      </Form.Item>
      <div
        style={{
          overflowX: "scroll",
        }}
      >
        <Form.Item name="description">
          <Input.TextArea
            autoComplete="off"
            rows={2}
            maxLength={200}
            bordered={false}
            autoSize={true}
            style={{ padding: "0rem" }}
            disabled={formType === VIEW}
          />
        </Form.Item>
      </div>
      <div
        style={{
          display: "flex",
          overflowX: "scroll",
        }}
      >
        <Form.Item name="priority">
          <Space size="small" style={{ marginRight: "1rem" }}>
            <FlagFilled style={{ color: priorityColor }} />
            <Select
              defaultValue={form.getFieldValue("priority")}
              onSelect={(event) => handlePriorityColor(event)}
              options={priorityOptions}
              style={{ width: "6rem" }}
              showArrow={false}
              disabled={formType === VIEW}
            />
          </Space>
        </Form.Item>
        <Form.Item name="listId" style={{ marginRight: "1rem" }}>
          <Select
            defaultValue={form.getFieldValue("listId")}
            options={[
              {
                value: INBOX,
                label: "Inbox",
              },
              ...listOptions,
            ]}
            style={{ width: "10rem" }}
            showArrow={false}
            disabled={formType === VIEW}
          />
        </Form.Item>
        <Form.Item name="tagIds">
          <Select
            mode="multiple"
            options={tagOptions}
            maxTagCount={3}
            maxTagTextLength={8}
            tagRender={tagRender}
            defaultValue={form.getFieldValue("tagIds")}
            style={{ width: "22rem" }}
            placeholder="Select tags here"
            disabled={formType === VIEW}
          />
        </Form.Item>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          overflowX: "scroll",
        }}
      >
        <Form.Item name="date" style={{ marginRight: "1rem" }}>
          <DatePicker
            suffixIcon={<CalendarTwoTone />}
            format={DATE_FORMAT}
            style={{
              cursor: "pointer",
              width: "12rem",
            }}
            onChange={handleStartDateChange}
            disabled={formType === VIEW}
          />
        </Form.Item>
        <Form.Item name="duration" style={{ marginRight: "1rem" }}>
          <TimePicker.RangePicker
            suffixIcon={<ClockCircleTwoTone />}
            format={TIME_FORMAT}
            minuteStep={5}
            style={{
              cursor: "pointer",
              width: "12rem",
            }}
            disabled={formType === VIEW || !isScheduled}
          />
        </Form.Item>
        <Form.Item name="repeat">
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
            style={{ width: "12rem" }}
            placeholder="Repeat frequency"
            disabled={formType === VIEW || !isScheduled}
          />
        </Form.Item>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          overflowX: "scroll",
        }}
      >
        <Form.Item name="endBy" style={{ marginRight: "1rem" }}>
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
            disabled={formType === VIEW || !isScheduled || !isRepeating}
            style={{ width: "12rem" }}
          />
        </Form.Item>
        <Form.Item
          name="endByDate"
          rules={[
            {
              message: "End date is required",
              validator: (_, value) => {
                if (
                  form.getFieldValue("endBy") === "endByDate" &&
                  value === null
                ) {
                  return Promise.reject("End date is required");
                } else {
                  return Promise.resolve();
                }
              },
            },
          ]}
          style={{ marginRight: "1rem" }}
        >
          <DatePicker
            format={DATE_FORMAT}
            style={{
              cursor: "pointer",
              width: "12rem",
            }}
            placeholder="End date"
            disabledDate={disabledEndDate}
            disabled={
              formType === VIEW ||
              !isScheduled ||
              !isRepeating ||
              !showEndByDate
            }
          />
        </Form.Item>
        <Form.Item
          name="endByRepeatCount"
          rules={[
            {
              message: "Repeat count is required",
              validator: (_, value) => {
                if (
                  form.getFieldValue("endBy") === "endByRepeatCount" &&
                  value === null
                ) {
                  return Promise.reject("Repeat count is required");
                } else {
                  return Promise.resolve();
                }
              },
            },
          ]}
        >
          <InputNumber
            min={1}
            style={{
              cursor: "pointer",
              width: "12rem",
            }}
            placeholder="Repeat Count"
            disabled={
              formType === VIEW ||
              !isScheduled ||
              !isRepeating ||
              !showEndByRepeatCount
            }
          />
        </Form.Item>
      </div>
    </>
  );
};

export default TaskDetails;
