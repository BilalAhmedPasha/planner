import { DatePicker, Form, Input, Select, theme } from "antd";
import { DATE_FORMAT, DAY } from "../../../../constants/dateTime.constants";
import { useState } from "react";
import RepeatCriteria from "./RepeatCriteria";
import {
  REPEAT_DAYS,
  REPEAT_OPTIONS,
} from "../../../../constants/habits.constants";

const HabitDialogForm = ({
  form,
  layout,
  initialValues,
  ...props
}) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const [startDate, setStartDate] = useState(initialValues["startDate"]);
  const handleStartDateChange = (e) => {
    setStartDate(e);
  };

  const disabledEndDate = (current) => {
    return startDate && current.startOf(DAY).isBefore(startDate.startOf(DAY));
  };

  const [frequencyType, setFrequencyType] = useState(
    initialValues["frequency"] || REPEAT_DAYS
  );
  
  const handleRepeatTypeChange = (e) => {
    setFrequencyType(e);
  };

  return (
    <Form
      form={form}
      layout={layout}
      name="form_in_modal"
      initialValues={initialValues}
    >
      <Form.Item
        name="name"
        label="Name"
        rules={[
          {
            required: true,
            message: "Habit name is required",
          },
        ]}
      >
        <Input autoComplete="off" maxLength={30} showCount />
      </Form.Item>
      <Form.Item
        name="startDate"
        label="Start date"
        rules={[
          {
            required: true,
            message: "Start date is required",
          },
        ]}
      >
        <DatePicker
          format={DATE_FORMAT}
          style={{
            cursor: "pointer",
            width: "100%",
          }}
          onChange={handleStartDateChange}
          allowClear={false}
        />
      </Form.Item>

      <Form.Item name="endDate" label="End date">
        <DatePicker
          format={DATE_FORMAT}
          style={{
            cursor: "pointer",
            width: "100%",
          }}
          disabledDate={disabledEndDate}
        />
      </Form.Item>

      <Form.Item
        name="frequency"
        label="Frequency"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Select options={REPEAT_OPTIONS} onChange={handleRepeatTypeChange} />
      </Form.Item>

      <Form.Item name="repeatCriteria">
        <RepeatCriteria frequencyType={frequencyType} />
      </Form.Item>
    </Form>
  );
};

export default HabitDialogForm;
