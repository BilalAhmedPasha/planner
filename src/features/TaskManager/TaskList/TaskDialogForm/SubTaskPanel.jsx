import {
  Button,
  DatePicker,
  Form,
  Input,
  Select,
  Space,
  TimePicker,
} from "antd";
import styled from "styled-components";
import {
  NONE,
  priorityColorMappings,
  priorityOptions,
} from "../../../../constants/priority.constants";
import { FlagFilled } from "@ant-design/icons";
import { NONE_COLOR } from "../../../../constants/color.constants";
import { useState } from "react";
import {
  DATE_FORMAT,
  TIME_FORMAT,
} from "../../../../constants/dateTime.constants";
const StyledDiv = styled.div`
  border: 0.1px solid #bfbfbf;
  margin-top: 0.5rem;
  border-radius: 5px;
  max-height: ${(props) => props.maxHeight};
  overflow: auto;
  transition: max-height 0.8s ease-out;
`;

const StyledFormItem = styled(Form.Item)`
  margin: 0rem 0rem;
`;

const SubTaskPanel = ({ form, subTaskPanelHeight, closeSubTaskPanel }) => {
  const [priorityColor, setPriorityColor] = useState(NONE_COLOR);

  const handlePriorityChange = (event) => {
    setPriorityColor(priorityColorMappings[event]);
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

  return (
    <StyledDiv maxHeight={subTaskPanelHeight}>
      <div style={{ padding: "0rem 1rem" }}>
        <StyledFormItem name="subTaskName">
          <Input
            autoComplete="off"
            maxLength={25}
            bordered={false}
            placeholder={"Task name"}
            style={{ padding: "0rem" }}
            onInput={handleSubTaskNameChange}
          />
        </StyledFormItem>
        <StyledFormItem name="subTaskDescription">
          <Input.TextArea
            autoComplete="off"
            autoSize={{
              minRows: 1,
              maxRows: 3,
            }}
            maxLength={200}
            bordered={false}
            placeholder={"Description"}
            style={{ padding: "0rem" }}
          />
        </StyledFormItem>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            paddingBottom: "0.5rem",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              flexDirection: "row",
            }}
          >
            <>
              <FlagFilled style={{ color: priorityColor }} />
              <StyledFormItem name="subTaskPriority">
                <Select
                  onSelect={(event) => handlePriorityChange(event)}
                  options={priorityOptions}
                  bordered={false}
                  showArrow={false}
                  defaultValue={NONE}
                  style={{ width: "100%" }}
                />
              </StyledFormItem>
            </>
            <StyledFormItem>
              <DatePicker
                format={DATE_FORMAT}
                style={{
                  cursor: "pointer",
                  width: "100%",
                }}
                onChange={() => {}}
                bordered={false}
              />
            </StyledFormItem>
            <StyledFormItem>
              <TimePicker.RangePicker
                format={TIME_FORMAT}
                minuteStep={5}
                style={{
                  cursor: "pointer",
                  width: "100%",
                }}
                bordered={false}
              />
            </StyledFormItem>
          </div>
        </div>
        <Space size="small" style={{ float: "right", marginBottom: "0.5rem" }}>
          <Button type="text" size="small" onClick={closeSubTaskPanel}>
            {"Cancel"}
          </Button>
          <Button
            type="primary"
            size="small"
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
