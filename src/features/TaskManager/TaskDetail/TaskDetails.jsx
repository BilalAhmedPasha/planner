import {
  Button,
  DatePicker,
  Divider,
  Form,
  Input,
  Select,
  Slider,
  Space,
  Tag,
  theme,
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
  NodeExpandOutlined,
} from "@ant-design/icons";
import { EDIT, VIEW } from "../../../constants/formType.constants";
import { useSelector } from "react-redux";
import { tagsSelector } from "../state/userTags/userTags.reducer";
import { INBOX, showSubTasks } from "../../../constants/app.constants";
import { useMemo, useState, useEffect } from "react";
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
  DAY,
  TIME_FORMAT,
} from "../../../constants/dateTime.constants";
import NumericInput from "../../../components/NumericInput";
import {
  ENDLESS,
  END_BY_DATE,
  END_BY_REPEAT_COUNT,
} from "../../../constants/repeating.constants";
import SubTaskInDetails from "./SubTaskInDetails";
import styled from "styled-components";

const MultiSelect = styled(Select)`
  .ant-select-selection-overflow {
    display: flex;
    flex-wrap: nowrap;
    max-width: 95%;
    overflow: auto;
  }
`;

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
    setPriorityColor(getPriorityColor(lastSavedFormValues["priority"]));
    setIsScheduled(lastSavedFormValues["taskDate"] ? true : false);
    setshowEndByRepeatCount(
      lastSavedFormValues[END_BY_REPEAT_COUNT] ? true : false
    );
    setShowEndByDate(lastSavedFormValues[END_BY_DATE] ? true : false);
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

  const [subTasks, setSubTasks] = useState([]);
  const onAddSubTask = () => {
    setSubTasks((prevState) => [...prevState, 1]);
  };

  useEffect(() => {
    setSubTasks([]);
  }, [taskDetails]);

  const {
    token: { colorInfoText, colorBorder },
  } = theme.useToken();

  return (
    <>
      <div
        style={{
          display: "flex",
          alignContent: "center",
          justifyContent: "space-between",
          overflowX: "auto",
          alignItems: "center",
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
          style={{ height: "1rem", width: "35rem", marginRight: "1rem" }}
        >
          <Input
            autoComplete="off"
            maxLength={50}
            style={{
              fontWeight: "bold",
              fontSize: "24px",
              padding: "0rem",
              margin: "0rem",
            }}
            readOnly={formType === VIEW}
            bordered={false}
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

      <Form.Item
        name="description"
        style={{
          margin: "0rem 0rem 1.5rem 0rem",
        }}
      >
        <Input.TextArea
          autoComplete="off"
          maxLength={200}
          autoSize={{
            minRows: 1,
            maxRows: 3,
          }}
          placeholder="Task description"
          readOnly={formType === VIEW}
          style={{ padding: "0rem" }}
          bordered={false}
        />
      </Form.Item>

      <div
        style={{
          display: "flex",
          overflowX: "auto",
          justifyContent: "space-between",
          marginBottom: "1rem",
          width: "100%",
        }}
      >
        <Form.Item
          name="priority"
          style={{
            marginRight: "1rem",
            marginBottom: "0.5rem",
            width: "20%",
            minWidth: "6rem",
          }}
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
            // disabled={formType === VIEW}
            readOnly={true}
            open={formType === VIEW ? false : undefined}
          />
        </Form.Item>
        <Form.Item
          name="listId"
          style={{
            marginRight: "1rem",
            marginBottom: "0.5rem",
            width: "35%",
            minWidth: "10rem",
          }}
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
                    color: colorInfoText,
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
            // disabled={formType === VIEW}
            open={formType === VIEW ? false : undefined}
          />
        </Form.Item>
        <Form.Item
          name="tagIds"
          style={{ marginBottom: "0.5rem", width: "45%", minWidth: "10rem" }}
        >
          <MultiSelect
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
            tagRender={(props) => tagRender(formType !== VIEW, props)}
            showArrow={true}
            initialvalues={form.getFieldValue("tagIds")}
            placeholder="Tags"
            showSearch={false}
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
          width: "100%",
        }}
      >
        <Form.Item
          name="taskDate"
          style={{
            marginRight: "1rem",
            marginBottom: "0.5rem",
            width: "33%",
            minWidth: "8rem",
          }}
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
            onChange={handleStartDateChange}
            open={formType === VIEW ? false : openTaskDatePicker}
            onOpenChange={(e) => setOpenTaskDatePicker(!openTaskDatePicker)}
            allowClear={formType !== VIEW}
            style={{ width: "100%", cursor: "pointer" }}
            inputReadOnly={true}
          />
        </Form.Item>
        <Form.Item
          name="duration"
          style={{
            marginRight: "1rem",
            marginBottom: "0.5rem",
            width: "33%",
            minWidth: "12rem",
          }}
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
                    color: colorInfoText,
                  }}
                />
              )
            }
            format={TIME_FORMAT}
            minuteStep={5}
            disabled={formType !== VIEW && !isScheduled}
            open={formType === VIEW ? false : undefined}
            allowClear={formType !== VIEW}
            inputReadOnly={true}
            style={{ width: "100%", cursor: "pointer" }}
          />
        </Form.Item>
        <Form.Item
          name="repeatFrequency"
          style={{ marginBottom: "0.5rem", width: "33%", minWidth: "7rem" }}
        >
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
                    color: colorInfoText,
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
          width: "100%",
        }}
      >
        <Form.Item
          name="endBy"
          style={{
            marginRight: "1rem",
            marginBottom: "0.5rem",
            width: "33%",
            minWidth: "11rem",
          }}
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
                    color: colorInfoText,
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
          style={{
            marginRight: "1rem",
            marginBottom: "0.5rem",
            width: "33%",
            minWidth: "8rem",
          }}
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
                    color: colorInfoText,
                  }}
                />
              )
            }
            format={DATE_FORMAT}
            style={{
              cursor: "pointer",
              width: "100%",
            }}
            placeholder="End date"
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
          style={{ marginBottom: "0.5rem", width: "33%", minWidth: "5rem" }}
        >
          <NumericInput
            suffix={
              formType === VIEW ||
              !(isScheduled && isRepeating && showEndByRepeatCount) ? (
                <FieldNumberOutlined
                  style={{
                    fontSize: "1rem",
                    color: colorBorder,
                  }}
                />
              ) : (
                <FieldNumberOutlined
                  style={{
                    fontSize: "1rem",
                    color: colorInfoText,
                  }}
                />
              )
            }
            min={1}
            style={{
              cursor: "pointer",
            }}
            placeholder="Repeat count"
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
      <Divider />
      {/* <div style={{ overflow: "auto" }}> */}
      {showSubTasks && (
        <Button
          type="text"
          icon={<NodeExpandOutlined />}
          onClick={onAddSubTask}
        >
          {"Add Subtask"}
        </Button>
      )}
      <div style={{ overflow: "auto" }}>
        {subTasks.map((each, index) => (
          <SubTaskInDetails key={index} taskDetails={taskDetails} />
        ))}
      </div>
    </>
  );
};

export default TaskDetails;
