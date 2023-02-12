import {
  Button,
  DatePicker,
  Dropdown,
  Form,
  Input,
  InputNumber,
  Popover,
  Select,
  Space,
  Tag,
  TimePicker,
} from "antd";
import styled from "styled-components";
import {
  NONE,
  priorityColorMappings,
  priorityOptions,
} from "../../../../constants/priority.constants";
import {
  FlagFilled,
  ClockCircleOutlined,
  SaveOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import { NONE_COLOR } from "../../../../constants/color.constants";
import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { tagsSelector } from "../../state/userTags/userTags.reducer";
import {
  DATE_FORMAT,
  DAY,
  TIME_FORMAT,
} from "../../../../constants/dateTime.constants";
import {
  ENDLESS,
  END_BY_DATE,
  END_BY_REPEAT_COUNT,
} from "../../../../constants/repeating.constants";

const StyledDiv = styled.div`
  border: 0.1px solid #bfbfbf;
  margin-top: 0.5rem;
  border-radius: 5px;
  max-height: ${(props) => props.maxHeight};
  overflow: auto;
  transition: max-height 0.8s ease-out;
`;

const StyledFormItem = styled(Form.Item)`
  margin: ${(props) => props.marginVertical} 0rem;
`;

const SubTaskPanel = ({ form, subTaskPanelHeight, closeSubTaskPanel }) => {
  const [priority, setPriority] = useState({
    priority: NONE,
    color: NONE_COLOR,
  });

  const handlePriorityChange = (event) => {
    setPriority({
      priority: event.key,
      color: priorityColorMappings[event.key],
    });
  };

  const [disableAddButton, setDisableAddButton] = useState(true);

  const handleSubTaskNameChange = (e) => {
    form.setFieldValue("subTaskName", e.target.value);
    if (e.target.value && e.target.value.length > 0) {
      setDisableAddButton(false);
    } else {
      setDisableAddButton(true);
    }
  };

  const { tags } = useSelector(tagsSelector);

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

  const [startDate, setStartDate] = useState(form.getFieldValue("subTaskDate"));

  const [isScheduled, setIsScheduled] = useState(
    form.getFieldValue("subTaskDate") ? true : false
  );
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

  const disabledEndDate = (current) => {
    return startDate && current.startOf(DAY).isBefore(startDate.startOf(DAY));
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

  const scheduleContent = () => {
    return (
      <div style={{ width: "15rem" }}>
        <StyledFormItem name="subTaskDate" marginVertical="0.5rem">
          <DatePicker
            format={DATE_FORMAT}
            style={{
              cursor: "pointer",
              width: "100%",
            }}
            onChange={handleStartDateChange}
          />
        </StyledFormItem>
        {isScheduled && (
          <StyledFormItem name="subTaskTime" marginVertical="0.5rem">
            <TimePicker.RangePicker
              format={TIME_FORMAT}
              minuteStep={5}
              style={{
                cursor: "pointer",
                width: "100%",
              }}
            />
          </StyledFormItem>
        )}
        {isScheduled && (
          <StyledFormItem name="subTaskRepeatFrequency" marginVertical="0.5rem">
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
              placeholder="Repeat frequency"
            />
          </StyledFormItem>
        )}
        {isScheduled && isRepeating && (
          <StyledFormItem name="subTaskEndBy" marginVertical="0.5rem">
            <Select
              defaultValue={ENDLESS}
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
          </StyledFormItem>
        )}
        {isScheduled && isRepeating && showEndByDate && (
          <StyledFormItem
            name="subTaskEndDate"
            marginVertical="0.5rem"
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
              allowClear={false}
            />
          </StyledFormItem>
        )}
        {isScheduled && isRepeating && showEndByRepeatCount && (
          <StyledFormItem
            name={"subTaskEndByRepeatCount"}
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
              maxLength={3}
              autoComplete="off"
              placeholder="Repeat count"
              defaultValue={7}
            />
          </StyledFormItem>
        )}
      </div>
    );
  };

  return (
    <StyledDiv maxHeight={subTaskPanelHeight}>
      <div style={{ padding: "0rem 1rem" }}>
        <StyledFormItem name="subTaskName" marginVertical="0rem">
          <Input
            autoComplete="off"
            maxLength={25}
            bordered={false}
            placeholder={"Task name"}
            style={{ padding: "0.5rem 0rem 0rem 0rem" }}
            onInput={handleSubTaskNameChange}
          />
        </StyledFormItem>
        <StyledFormItem name="subTaskDescription" marginVertical="0rem">
          <Input.TextArea
            autoComplete="off"
            autoSize={{
              minRows: 3,
              maxRows: 3,
            }}
            maxLength={200}
            bordered={false}
            placeholder={"Description"}
            style={{ padding: "0.5rem 0rem 0rem 0rem" }}
          />
        </StyledFormItem>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            paddingBottom: "0.5rem",
          }}
        >
          <Space>
            <Dropdown
              menu={{
                items: priorityOptions,
                selectable: true,
                defaultSelectedKeys: [NONE],
                onClick: handlePriorityChange,
              }}
              trigger={["click"]}
              placement="bottomLeft"
            >
              <StyledFormItem name="subTaskPriority" marginVertical="0rem">
                <Button
                  type="default"
                  icon={<FlagFilled style={{ color: priority.color }} />}
                >
                  {priority.priority}
                </Button>
              </StyledFormItem>
            </Dropdown>

            <StyledFormItem name="subTaskTags" marginVertical="0rem">
              <Select
                mode="multiple"
                options={tagOptions}
                maxTagCount={1}
                maxTagTextLength={3}
                tagRender={(props) => tagRender(true, props)}
                style={{ minWidth: "10rem", maxWidth: "10rem" }}
                placeholder="Select tags"
                allowClear={true}
              />
            </StyledFormItem>

            <Popover
              content={scheduleContent}
              trigger="click"
              placement="bottomLeft"
              showArrow={false}
            >
              <Button type="default" icon={<ClockCircleOutlined />}>
                {"Schedule"}
              </Button>
            </Popover>
          </Space>
        </div>
        <Space style={{ float: "right", paddingBottom: "0.5rem" }}>
          <Button type="text" onClick={closeSubTaskPanel}>
            {"Cancel"}
          </Button>
          <Button
            type="primary"
            onClick={closeSubTaskPanel}
            disabled={disableAddButton}
          >
            {"Add"}
          </Button>
        </Space>
      </div>
    </StyledDiv>
  );
};

export default SubTaskPanel;
