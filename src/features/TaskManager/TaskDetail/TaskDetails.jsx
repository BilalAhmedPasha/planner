import {
  Button,
  DatePicker,
  Form,
  Input,
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
  UnorderedListOutlined,
  TagTwoTone,
  TagOutlined,
  CalendarOutlined,
  CalendarTwoTone,
  ClockCircleOutlined,
  StopOutlined,
  SyncOutlined,
  FieldNumberOutlined,
} from "@ant-design/icons";
import { EDIT, VIEW } from "../../../constants/formType.constants";
import { useSelector } from "react-redux";
import { tagsSelector } from "../state/userTags/userTags.reducer";
import { INBOX } from "../../../constants/app.constants";
import { useMemo, useState, useEffect } from "react";
import { listsSelector } from "../state/userLists/userLists.reducer";
import {
  HIGH_COLOR,
  LOW_COLOR,
  MEDIUM_COLOR,
  NONE_COLOR,
  TASK_DETAIL_INPUT_EDIT_COLOR,
  TASK_NAV_BADGE_COLOR,
} from "../../../constants/color.constants";
import {
  HIGH,
  LOW,
  MEDIUM,
  priorityOptions,
} from "../../../constants/priority.constants";
import {
  DATE_FORMAT,
  DAY,
  TIME_FORMAT,
} from "../../../constants/dateTime.constants";
import NumericInput from "../../../components/NumericInput";
import {
  ENDLESS,
  END_BY_DATE,
  END_BY_REPEAT_COUNT,
} from "../../../constants/repeating.constants";

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

const TaskDetails = ({
  taskDetails,
  form,
  formType,
  setFormType,
  lastSavedFormValues,
}) => {
  const [priorityColor, setPriorityColor] = useState(
    getPriorityColor(taskDetails["priority"])
  );
  const [startDate, setStartDate] = useState(form.getFieldValue("taskDate"));

  const [isRepeating, setIsRepeating] = useState(
    form.getFieldValue("isRepeating")
  );

  const [openTaskDatePicker, setOpenTaskDatePicker] = useState(false);
  const [openTaskEndDatePicker, setOpenTaskEndDatePicker] = useState(false);
  useEffect(() => {
    if (formType === EDIT) {
      setOpenTaskDatePicker(false);
      setOpenTaskEndDatePicker(false);
    }
  }, [formType]);

  const [showEndByDate, setShowEndByDate] = useState(
    taskDetails[END_BY_DATE] ? true : false
  );
  const [showEndByRepeatCount, setshowEndByRepeatCount] = useState(
    taskDetails[END_BY_REPEAT_COUNT] ? true : false
  );
  const [isScheduled, setIsScheduled] = useState(
    taskDetails["taskDate"] ? true : false
  );

  const onReset = () => {
    form.setFieldsValue(lastSavedFormValues);
    setFormType(VIEW);
    setPriorityColor(getPriorityColor(taskDetails["priority"]));
    setIsScheduled(taskDetails["taskDate"] ? true : false);
    setshowEndByRepeatCount(taskDetails[END_BY_REPEAT_COUNT] ? true : false);
    setShowEndByDate(taskDetails[END_BY_DATE] ? true : false);
  };

  useEffect(() => {
    setPriorityColor(getPriorityColor(taskDetails["priority"]));
    setIsScheduled(taskDetails["taskDate"] ? true : false);
    setshowEndByRepeatCount(taskDetails[END_BY_REPEAT_COUNT] ? true : false);
    setShowEndByDate(taskDetails[END_BY_DATE] ? true : false);
  }, [taskDetails]);

  const handlePriorityColor = (event) => {
    setPriorityColor(getPriorityColor(event));
    form.setFieldValue({ priority: event });
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

  const tagRender = (closable, props) => {
    const { label, value, onClose } = props;
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

  const handleStartDateChange = (e) => {
    setStartDate(e);
    if (e) {
      setIsScheduled(true);
    } else {
      setIsScheduled(false);
    }
  };

  const handleRepeatDropDownChange = (e) => {
    form.validateFields();
    if (e) {
      setIsRepeating(true);
    } else {
      setIsRepeating(false);
    }
  };

  const handleEndByDropDownChange = (e) => {
    form.validateFields();
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

  const disabledEndDate = (current) => {
    return startDate && current.startOf(DAY).isBefore(startDate.startOf(DAY));
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          alignContent: "baseline",
          justifyContent: "space-between",
          height: "2rem",
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

      <Form.Item name="progress" style={{ marginBottom: "0.25rem" }}>
        <Slider
          initialvalues={form.getFieldValue("progress")}
          step={10}
          trackStyle={{ height: "3px" }}
          disabled={formType === VIEW}
        />
      </Form.Item>

      <Form.Item name="description" style={{ marginBottom: "1.5rem" }}>
        <Input.TextArea
          autoComplete="off"
          maxLength={200}
          // disabled={formType === VIEW}
          placeholder="Enter task description"
          readOnly={formType === VIEW}
        />
      </Form.Item>

      <div
        style={{
          display: "flex",
          overflowX: "auto",
          justifyContent: "space-between",
          marginBottom: "1rem",
        }}
      >
        <Form.Item
          name="priority"
          style={{ marginRight: "1rem", marginBottom: "0.5rem" }}
        >
          <Select
            suffixIcon={
              <FlagFilled
                style={{
                  color: priorityColor,
                  fontSize: "1rem",
                }}
              />
            }
            initialvalues={form.getFieldValue("priority")}
            onSelect={(event) => handlePriorityColor(event)}
            options={priorityOptions}
            style={{ width: "7rem" }}
            // disabled={formType === VIEW}
            readOnly={true}
            open={formType === VIEW ? false : undefined}
          />
        </Form.Item>
        <Form.Item
          name="listId"
          style={{ marginRight: "1rem", marginBottom: "0.5rem" }}
        >
          <Select
            suffixIcon={
              formType === VIEW ? (
                <UnorderedListOutlined
                  style={{
                    fontSize: "1rem",
                  }}
                />
              ) : (
                <UnorderedListOutlined
                  style={{
                    fontSize: "1rem",
                    color: TASK_DETAIL_INPUT_EDIT_COLOR,
                  }}
                />
              )
            }
            initialvalues={form.getFieldValue("listId")}
            options={[
              {
                value: INBOX,
                label: "Inbox",
              },
              ...listOptions,
            ]}
            style={{ width: "10rem" }}
            // disabled={formType === VIEW}
            open={formType === VIEW ? false : undefined}
          />
        </Form.Item>
        <Form.Item name="tagIds" style={{ marginBottom: "0.5rem" }}>
          <Select
            suffixIcon={
              formType === VIEW ? (
                <TagOutlined
                  style={{
                    fontSize: "1rem",
                  }}
                />
              ) : (
                <TagTwoTone
                  style={{
                    fontSize: "1rem",
                  }}
                />
              )
            }
            mode="multiple"
            options={tagOptions}
            maxTagCount={3}
            maxTagTextLength={6}
            tagRender={(props) => tagRender(formType !== VIEW, props)}
            showArrow={true}
            initialvalues={form.getFieldValue("tagIds")}
            style={{ width: "22rem" }}
            placeholder="Select tags here"
            // disabled={formType === VIEW}
            open={formType === VIEW ? false : undefined}
          />
        </Form.Item>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          overflowX: "auto",
          marginBottom: "1rem",
        }}
      >
        <Form.Item
          name="taskDate"
          style={{ marginRight: "1rem", marginBottom: "0.5rem" }}
        >
          <DatePicker
            suffixIcon={
              formType === VIEW ? (
                <CalendarOutlined
                  style={{
                    fontSize: "1rem",
                  }}
                />
              ) : (
                <CalendarTwoTone
                  style={{
                    fontSize: "1rem",
                  }}
                />
              )
            }
            format={DATE_FORMAT}
            style={{
              cursor: "pointer",
              width: "13rem",
            }}
            onChange={handleStartDateChange}
            // disabled={formType === VIEW}
            open={formType === VIEW ? false : openTaskDatePicker}
            onOpenChange={(e) => setOpenTaskDatePicker(!openTaskDatePicker)}
            allowClear={formType !== VIEW}
            inputReadOnly={true}
          />
        </Form.Item>
        <Form.Item
          name="duration"
          style={{ marginRight: "1rem", marginBottom: "0.5rem" }}
        >
          <TimePicker.RangePicker
            suffixIcon={
              formType === VIEW || !isScheduled ? (
                <ClockCircleOutlined
                  style={{
                    fontSize: "1rem",
                  }}
                />
              ) : (
                <ClockCircleOutlined
                  style={{
                    fontSize: "1rem",
                    color: TASK_DETAIL_INPUT_EDIT_COLOR,
                  }}
                />
              )
            }
            format={TIME_FORMAT}
            minuteStep={5}
            style={{
              cursor: "pointer",
              width: "13rem",
            }}
            disabled={formType !== VIEW && !isScheduled}
            open={formType === VIEW ? false : undefined}
            allowClear={formType !== VIEW}
            inputReadOnly={true}
          />
        </Form.Item>
        <Form.Item name="repeatFrequency" style={{ marginBottom: "0.5rem" }}>
          <Select
            suffixIcon={
              formType === VIEW || !isScheduled ? (
                <SyncOutlined
                  style={{
                    fontSize: "1rem",
                  }}
                />
              ) : (
                <SyncOutlined
                  style={{
                    fontSize: "1rem",
                    color: TASK_DETAIL_INPUT_EDIT_COLOR,
                  }}
                />
              )
            }
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
            style={{ width: "13rem" }}
            placeholder="Repeat frequency"
            disabled={formType !== VIEW && !isScheduled}
            open={formType === VIEW ? false : undefined}
            allowClear={formType !== VIEW}
          />
        </Form.Item>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          overflowX: "auto",
          marginBottom: "1rem",
        }}
      >
        <Form.Item
          name="endBy"
          style={{ marginRight: "1rem", marginBottom: "0.5rem" }}
          rules={[
            {
              message: "End condition is required",
              validator: (_, value) => {
                if (
                  form.getFieldValue("repeatFrequency") !== null &&
                  value === null
                ) {
                  return Promise.reject("End condition is required");
                } else {
                  return Promise.resolve();
                }
              },
            },
          ]}
        >
          <Select
            suffixIcon={
              formType === VIEW || !isScheduled || !isRepeating ? (
                <StopOutlined
                  style={{
                    fontSize: "1rem",
                  }}
                />
              ) : (
                <StopOutlined
                  style={{
                    fontSize: "1rem",
                    color: TASK_DETAIL_INPUT_EDIT_COLOR,
                  }}
                />
              )
            }
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
            open={formType === VIEW ? false : undefined}
            disabled={formType !== VIEW && (!isScheduled || !isRepeating)}
            style={{ width: "13rem" }}
            placeholder="End condition"
          />
        </Form.Item>
        <Form.Item
          name={END_BY_DATE}
          rules={[
            {
              message: "End date is required",
              validator: (_, value) => {
                if (
                  form.getFieldValue("endBy") === END_BY_DATE &&
                  value === null
                ) {
                  return Promise.reject("End date is required");
                } else {
                  return Promise.resolve();
                }
              },
            },
          ]}
          style={{ marginRight: "1rem", marginBottom: "0.5rem" }}
        >
          <DatePicker
            suffixIcon={
              formType === VIEW ||
              !(isScheduled && isRepeating && showEndByDate) ? (
                <CalendarOutlined
                  style={{
                    fontSize: "1rem",
                  }}
                />
              ) : (
                <CalendarOutlined
                  style={{
                    fontSize: "1rem",
                    color: TASK_DETAIL_INPUT_EDIT_COLOR,
                  }}
                />
              )
            }
            format={DATE_FORMAT}
            style={{
              cursor: "pointer",
              width: "13rem",
            }}
            placeholder="Select end date"
            disabledDate={disabledEndDate}
            disabled={
              formType !== VIEW &&
              !(isScheduled && isRepeating && showEndByDate)
            }
            open={formType === VIEW ? false : openTaskEndDatePicker}
            onOpenChange={(e) =>
              setOpenTaskEndDatePicker(!openTaskEndDatePicker)
            }
            allowClear={formType !== VIEW}
            inputReadOnly={true}
          />
        </Form.Item>
        <Form.Item
          name={END_BY_REPEAT_COUNT}
          rules={[
            {
              message: "Repeat count is required",
              validator: (_, value) => {
                if (
                  form.getFieldValue("endBy") === END_BY_REPEAT_COUNT &&
                  value === null
                ) {
                  return Promise.reject("Repeat count is required");
                } else {
                  return Promise.resolve();
                }
              },
            },
          ]}
          style={{ marginBottom: "0.5rem" }}
        >
          <NumericInput
            suffix={
              formType === VIEW ||
              !(isScheduled && isRepeating && showEndByRepeatCount) ? (
                <FieldNumberOutlined
                  style={{
                    fontSize: "1rem",
                    color: TASK_NAV_BADGE_COLOR,
                  }}
                />
              ) : (
                <FieldNumberOutlined
                  style={{
                    fontSize: "1rem",
                    color: TASK_DETAIL_INPUT_EDIT_COLOR,
                  }}
                />
              )
            }
            min={1}
            style={{
              cursor: "pointer",
              width: "13rem",
            }}
            placeholder="Enter repeat count"
            disabled={
              formType !== VIEW &&
              !(isScheduled && isRepeating && showEndByRepeatCount)
            }
            maxLength={3}
            readOnly={formType === VIEW}
            autoComplete="off"
          />
        </Form.Item>
      </div>
    </>
  );
};

export default TaskDetails;
