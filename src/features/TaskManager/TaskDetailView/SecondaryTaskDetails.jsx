import { DatePicker, Form, Select, TimePicker, theme } from "antd";
import { priorityOptions } from "../../../constants/priority.constants";
import { INBOX } from "../../../constants/app.constants";
import {
  DATE_FORMAT,
  TIME_FORMAT,
} from "../../../constants/dateTime.constants";
import { VIEW } from "../../../constants/formType.constants";
import NumericInput from "../../../components/NumericInput/NumericInput";
import {
  CalendarOutlined,
  CalendarTwoTone,
  ClockCircleOutlined,
  SyncOutlined,
  UnorderedListOutlined,
  FlagFilled,
  TagTwoTone,
  TagOutlined,
  StopOutlined,
  FieldNumberOutlined,
} from "@ant-design/icons";
import {
  ENDLESS,
  END_BY_DATE,
  END_BY_REPEAT_COUNT,
} from "../../../constants/repeating.constants";

import styled from "styled-components";

const MultiSelect = styled(Select)`
  .ant-select-selection-overflow {
    display: flex;
    flex-wrap: nowrap;
    max-width: 95%;
    overflow: auto;
  }
`;

const StyledGridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(12rem, 1fr));
  gap: 1rem;
`;

const GridItem = styled(Form.Item)`          
  width: 100%;
  min-width: 12rem;
  margin-bottom: 0rem;
`;

const SecondaryTaskDetails = ({
  form,
  formType,
  handleStartDateChange,
  openTaskDatePicker,
  setOpenTaskDatePicker,
  isScheduled,
  handleRepeatDropDownChange,
  handlePriorityColor,
  priorityColor,
  listOptions,
  tagOptions,
  tagRender,
  isRepeating,
  handleEndByDropDownChange,
  showEndByDate,
  showEndByRepeatCount,
  disabledEndDate,
  openTaskEndDatePicker,
  setOpenTaskEndDatePicker,
}) => {
  const {
    token: { colorInfoText, colorBorder },
  } = theme.useToken();

  return (
    <StyledGridContainer>
      <GridItem
        name="priority"
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
          readOnly={true}
          open={formType === VIEW ? false : undefined}
        />
      </GridItem>
      <GridItem
        name="listId"
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
          open={formType === VIEW ? false : undefined}
        />
      </GridItem>
      <GridItem
        name="tagIds"
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
          initialvalues={form.getFieldValue("tagIds")}
          placeholder="Tags"
          showSearch={false}
          open={formType === VIEW ? false : undefined}
        />
      </GridItem>
      <GridItem
        name="taskDate"
      
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
      </GridItem>
      <GridItem
        name="duration"
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
          style={{ width: "100%", cursor: "pointer" }}
          open={formType === VIEW ? false : undefined}
          allowClear={formType !== VIEW}
          inputReadOnly={true}
          disabled={formType !== VIEW && !isScheduled}
          showNow={true}
        />
      </GridItem>
      <GridItem
        name="repeatFrequency"
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
      </GridItem>
      <GridItem
        name="endBy"
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
      </GridItem>
      <GridItem
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
            formType !== VIEW && !(isScheduled && isRepeating && showEndByDate)
          }
          open={formType === VIEW ? false : openTaskEndDatePicker}
          onOpenChange={(e) => setOpenTaskEndDatePicker(!openTaskEndDatePicker)}
          allowClear={formType !== VIEW}
          inputReadOnly={true}
        />
      </GridItem>
      <GridItem
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
        style={{
        }}
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
      </GridItem>
    </StyledGridContainer>
  );
};

export default SecondaryTaskDetails;
