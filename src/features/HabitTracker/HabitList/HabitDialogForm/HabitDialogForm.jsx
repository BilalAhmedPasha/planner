import { DatePicker, Form, Input, theme } from "antd";
import { DATE_FORMAT, DAY } from "../../../../constants/dateTime.constants";
import { useState } from "react";
import FrequencyField from "./FrequencyField";

const HabitDialogForm = ({
  form,
  layout,
  initialValues,
  setDisableAddButton,
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
        <Input autoComplete="off" maxLength={20} showCount />
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
          placeholder="Select start date"
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
          placeholder="Select end date"
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
        <FrequencyField />
      </Form.Item>
    </Form>
  );
};

export default HabitDialogForm;
