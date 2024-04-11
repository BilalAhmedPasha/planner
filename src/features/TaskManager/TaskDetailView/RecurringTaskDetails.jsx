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
import styled from "styled-components";
import "./css/RecurringTaskDetails.css";

const StyledDiv = styled.div`
    display: flex;
    justify-content: space-between;
    overflow-x: auto;
    margin-bottom: 1rem;
    width: 100%;
`;

const StyledFieldNumberOutlined = styled(FieldNumberOutlined)`
    font-size: 1rem;
    color: ${({ color }) => color};
`;

const StyledStopOutlined = styled(StopOutlined)`
    font-size: 1rem;
    color: ${({ color }) => color};
`;

const StyledCalendarOutlined = styled(CalendarOutlined)`
    font-size: 1rem;
    color: ${({ color }) => color};
`;

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
        <StyledDiv>
            <Form.Item
                name="endBy"
                className="endby__form__item min_width_11"
                rules={[
                    {
                        message: "End condition is required",
                        validator: (_, value) => {
                            if (
                                form.getFieldValue("repeatFrequency") !==
                                    null &&
                                value === null
                            ) {
                                return Promise.reject(
                                    "End condition is required"
                                );
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
                            <StopOutlined className="icon__font__size" />
                        ) : (
                            <StyledStopOutlined color={colorInfoText} />
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
                    disabled={
                        formType !== VIEW && (!isScheduled || !isRepeating)
                    }
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
                className="endby__form__item min_width_8"
            >
                <DatePicker
                    suffixIcon={
                        formType === VIEW ||
                        !(isScheduled && isRepeating && showEndByDate) ? (
                            <CalendarOutlined className="icon__font__size" />
                        ) : (
                            <StyledCalendarOutlined color={colorInfoText} />
                        )
                    }
                    className="date__picker"
                    format={DATE_FORMAT}
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
                                form.getFieldValue("endBy") ===
                                    END_BY_REPEAT_COUNT &&
                                value === null
                            ) {
                                return Promise.reject(
                                    "Repeat count is required"
                                );
                            } else {
                                return Promise.resolve();
                            }
                        },
                    },
                ]}
                className="endby__repeat__count"
            >
                <NumericInput
                    suffix={
                        formType === VIEW ||
                        !(
                            isScheduled &&
                            isRepeating &&
                            showEndByRepeatCount
                        ) ? (
                            <StyledFieldNumberOutlined color={colorBorder} />
                        ) : (
                            <StyledFieldNumberOutlined color={colorInfoText} />
                        )
                    }
                    min={1}
                    className="cursor__pointer"
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
        </StyledDiv>
    );
};

export default RecurringTaskDetails;
