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
import styled from "styled-components";
import "./css/SecondaryTaskDetails.css";

const StyledDiv = styled.div`
    display: flex;
    justify-content: space-between;
    overflow-x: auto;
    margin-bottom: 1rem;
    width: 100%;
`;

const StyledClockCircleOutlined = styled(ClockCircleOutlined)`
    font-size: 1rem;
    color: ${({ color }) => color};
`;

const StyledSyncOutlined = styled(SyncOutlined)`
    font-size: 1rem;
    color: ${({ color }) => color};
`;

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
        <StyledDiv>
            <Form.Item name="taskDate" className="form__item min__width__8rem">
                <DatePicker
                    suffixIcon={
                        formType === VIEW ? (
                            <CalendarOutlined className="font__size__1" />
                        ) : (
                            <CalendarTwoTone className="font__size__1" />
                        )
                    }
                    format={DATE_FORMAT}
                    onChange={handleStartDateChange}
                    open={formType === VIEW ? false : openTaskDatePicker}
                    onOpenChange={(e) =>
                        setOpenTaskDatePicker(!openTaskDatePicker)
                    }
                    allowClear={formType !== VIEW}
                    className="cursor__pointer"
                    inputReadOnly={true}
                />
            </Form.Item>
            <Form.Item name="duration" className="form__item min__width__12rem">
                <TimePicker.RangePicker
                    suffixIcon={
                        formType === VIEW || !isScheduled ? (
                            <ClockCircleOutlined className="font__size__1" />
                        ) : (
                            <StyledClockCircleOutlined color={colorInfoText} />
                        )
                    }
                    format={TIME_FORMAT}
                    minuteStep={5}
                    className="cursor__pointer"
                    open={formType === VIEW ? false : undefined}
                    allowClear={formType !== VIEW}
                    inputReadOnly={true}
                    disabled={formType !== VIEW && !isScheduled}
                />
            </Form.Item>
            <Form.Item name="repeatFrequency" className="repeat_frequency">
                <Select
                    suffixIcon={
                        formType === VIEW || !isScheduled ? (
                            <SyncOutlined className="font__size__1" />
                        ) : (
                            <StyledSyncOutlined color={colorInfoText} />
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
        </StyledDiv>
    );
};

export default SecondaryTaskDetails;
