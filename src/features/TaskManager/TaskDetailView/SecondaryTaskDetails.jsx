import { DatePicker, Form, Select, TimePicker, theme } from "antd";
import {
  DATE_FORMAT,
  TIME_FORMAT,
} from "../../../constants/dateTime.constants";
import { VIEW } from "../../../constants/formType.constants";
import {
  CalendarOutlined,
  CalendarTwoTone,
  ClockCircleOutlined,
  SyncOutlined,
} from "@ant-design/icons";

const SecondaryTaskDetails = ({
  formType,
  handleStartDateChange,
  openTaskDatePicker,
  setOpenTaskDatePicker,
  isScheduled,
  handleRepeatDropDownChange,
}) => {
  const {
    token: { colorInfoText },
  } = theme.useToken();

  return (
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
  );
};

export default SecondaryTaskDetails;
