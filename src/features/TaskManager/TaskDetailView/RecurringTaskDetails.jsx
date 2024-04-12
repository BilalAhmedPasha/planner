import { DatePicker, Form, Select, theme } from "antd";
import { VIEW } from "../../../constants/formType.constants";
import {
  ENDLESS,
  END_BY_DATE,
  END_BY_REPEAT_COUNT,
} from "../../../constants/repeating.constants";
import {
  StopOutlined,
  CalendarOutlined,
  FieldNumberOutlined,
} from "@ant-design/icons";
import { DATE_FORMAT } from "../../../constants/dateTime.constants";
import NumericInput from "../../../components/NumericInput/NumericInput";

const RecurringTaskDetails = ({
  form,
  formType,
  isScheduled,
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
            formType !== VIEW && !(isScheduled && isRepeating && showEndByDate)
          }
          open={formType === VIEW ? false : openTaskEndDatePicker}
          onOpenChange={(e) => setOpenTaskEndDatePicker(!openTaskEndDatePicker)}
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
        style={{
          marginBottom: "0.5rem",
          width: "33%",
          minWidth: "5rem",
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
      </Form.Item>
    </div>
  );
};

export default RecurringTaskDetails;
