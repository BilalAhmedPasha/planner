import {
    DatePicker,
    Form,
    InputNumber,
    Select,
    Space,
    Switch,
    Tag,
    TimePicker,
    Typography,
} from "antd";
import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { listsSelector } from "../../state/userLists/userLists.reducer";
import { tagsSelector } from "../../state/userTags/userTags.reducer";
import { FlagFilled } from "@ant-design/icons";
import {
    HIGH,
    LOW,
    MEDIUM,
    priorityOptions,
    priorityColorMappings,
} from "../../../../constants/priority.constants";
import {
    HIGH_COLOR,
    LOW_COLOR,
    MEDIUM_COLOR,
    NONE_COLOR,
} from "../../../../constants/color.constants";
import {
    INBOX,
    MULTI_DATE_AVAILABLE,
} from "../../../../constants/app.constants";
import {
    DATE_FORMAT,
    DAY,
    TIME_FORMAT,
    TIME_ZONE,
} from "../../../../constants/dateTime.constants";
import dayjs from "../../../../utils/dateTime.utils";
import {
    ENDLESS,
    END_BY_DATE,
    END_BY_REPEAT_COUNT,
} from "../../../../constants/repeating.constants";
import styled from "styled-components";
import "./css/TaskDialogSecondaryPanel.css";

const MultiSelect = styled(Select)`
    .ant-select-selection-overflow {
        display: flex;
        flex-wrap: nowrap;
        max-width: 100%;
        overflow: auto;
    }
`;

const StyledFlagFilled = styled(FlagFilled)`
    color: ${({ color }) => color};
`;

const StyledDiv = styled.div`
    height: ${({ height }) => height};
    overflow-x: hidden;
    overflow-y: auto;
    padding: ${({ padding }) => padding};
`;

const TaskDialogSecondaryPanel = ({ form, height, smallScreen, ...props }) => {
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

    const tagRender = (props) => {
        const { label, value, closable, onClose } = props;
        const color = tags.find((each) => each.id === value).color;
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
                className="tag__margin"
            >
                {label}
            </Tag>
        );
    };

    const [priorityColor, setPriorityColor] = useState(
        priorityColorMappings[form.getFieldValue("priority")]
    );
    const handlePriorityChange = (event) => {
        if (event === HIGH) {
            setPriorityColor(HIGH_COLOR);
        } else if (event === MEDIUM) {
            setPriorityColor(MEDIUM_COLOR);
        } else if (event === LOW) {
            setPriorityColor(LOW_COLOR);
        } else {
            setPriorityColor(NONE_COLOR);
        }
    };

    const [startDate, setStartDate] = useState(form.getFieldValue("taskDate"));
    const [isScheduled, setIsScheduled] = useState(
        form.getFieldValue("taskDate") ? true : false
    );
    const [isMultiDay, setIsMultiDay] = useState(false);
    const [isRepeating, setIsRepeating] = useState(
        form.getFieldValue("repeatFrequency")
    );
    const [showEndByDate, setShowEndByDate] = useState(
        form.getFieldValue("endBy") === END_BY_DATE
    );
    const [showEndByRepeatCount, setshowEndByRepeatCount] = useState(
        form.getFieldValue("endBy") === END_BY_REPEAT_COUNT
    );

    const handleStartDateChange = (e) => {
        setStartDate(e);
        if (e) {
            setIsScheduled(true);
        } else {
            setIsScheduled(false);
        }
    };

    const handleIsMultiDaySwitch = (e) => {
        setIsMultiDay(e);
        setIsRepeating(false);
        setIsScheduled(false);
        if (e === true) {
            form.setFieldValue("dateRange", null);
        } else {
            form.setFieldValue("taskDate", null);
            form.setFieldValue("repeatFrequency", null);
        }
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

    const disabledStartDate = (current) => {
        const today = dayjs.utc().tz(TIME_ZONE).startOf(DAY);
        return current.startOf(DAY).isBefore(today);
    };

    const disabledEndDate = (current) => {
        return (
            startDate && current.startOf(DAY).isBefore(startDate.startOf(DAY))
        );
    };

    const handleDateRangeChange = (e) => {
        if (e) {
            setIsScheduled(true);
        } else {
            setIsScheduled(false);
        }
    };

    return (
        <StyledDiv
            height={smallScreen ? "auto" : `${height}vh`}
            padding={smallScreen ? "0rem" : "1rem 1.5rem"}
        >
            <Form.Item name="listId" label="List">
                <Select
                    options={[
                        {
                            value: INBOX,
                            label: "Inbox",
                        },
                        ...listOptions,
                    ]}
                />
            </Form.Item>

            <Form.Item
                name="priority"
                label={
                    <Space>
                        <Typography.Text className="typography__text">
                            {"Priority"}
                        </Typography.Text>
                        <StyledFlagFilled color={priorityColor} />
                    </Space>
                }
            >
                <Select
                    onSelect={(event) => handlePriorityChange(event)}
                    options={priorityOptions}
                />
            </Form.Item>

            <Form.Item name="tagIds" label="Tags">
                <MultiSelect
                    mode="multiple"
                    options={tagOptions}
                    tagRender={tagRender}
                    placeholder="Select tags"
                    showSearch={false}
                    suffixIcon={null}
                />
            </Form.Item>
            {MULTI_DATE_AVAILABLE && (
                <Form.Item>
                    <div className="nested__div">
                        <Typography.Text className="font__size__0_9 typography__text">
                            {"Multi day task"}
                        </Typography.Text>
                        <Switch onClick={handleIsMultiDaySwitch} />
                    </div>
                </Form.Item>
            )}
            {!isMultiDay && (
                <Form.Item name="taskDate" label="Schedule">
                    <DatePicker
                        format={DATE_FORMAT}
                        className="input__field"
                        onChange={handleStartDateChange}
                        open={props.disableDateSelection ? false : undefined}
                        allowClear={!props.disableDateSelection}
                        inputReadOnly={true}
                    />
                </Form.Item>
            )}
            {isMultiDay && (
                <Form.Item
                    name="dateRange"
                    label="Schedule"
                    rules={[
                        {
                            required: true,
                            message: "Date range is required",
                        },
                    ]}
                >
                    <DatePicker.RangePicker
                        disabledDate={disabledStartDate}
                        format={DATE_FORMAT}
                        className="input__field"
                        onChange={handleDateRangeChange}
                    />
                </Form.Item>
            )}
            {isScheduled && (
                <Form.Item name="duration">
                    <TimePicker.RangePicker
                        format={TIME_FORMAT}
                        minuteStep={5}
                        className="input__field"
                        open={props.disableTimeSelection ? false : undefined}
                        allowClear={!props.disableTimeSelection}
                        inputReadOnly={true}
                    />
                </Form.Item>
            )}
            {!isMultiDay && isScheduled && (
                <Form.Item name="repeatFrequency" label="Repeat">
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
                        placeholder="Select repeat frequency"
                    />
                </Form.Item>
            )}
            {isScheduled && isRepeating && (
                <Form.Item name="endBy" label="End by">
                    <Select
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
                </Form.Item>
            )}

            {isScheduled && isRepeating && showEndByDate && (
                <Form.Item
                    name={END_BY_DATE}
                    label="End Date"
                    rules={[
                        {
                            required: true,
                            message: "End date is required",
                        },
                    ]}
                >
                    <DatePicker
                        format={DATE_FORMAT}
                        className="input__field"
                        disabledDate={disabledEndDate}
                        placeholder="Select end date"
                    />
                </Form.Item>
            )}
            {isScheduled && isRepeating && showEndByRepeatCount && (
                <Form.Item
                    name={END_BY_REPEAT_COUNT}
                    label="Repeat Count"
                    rules={[
                        {
                            required: true,
                            message: "Repeat count is required",
                        },
                    ]}
                >
                    <InputNumber
                        min={1}
                        className="input__field"
                        placeholder="Enter repeat count"
                    />
                </Form.Item>
            )}
        </StyledDiv>
    );
};

export default TaskDialogSecondaryPanel;
