import { Button, Space, Typography, theme } from "antd";
import { INBOX } from "../../../../constants/app.constants";
import { Link } from "react-router-dom";
import styled from "styled-components";
import dayjs from "../../../../utils/dateTime.utils";
import {
    SyncOutlined,
    NodeExpandOutlined,
    DeleteOutlined,
    DeleteFilled,
    UndoOutlined,
} from "@ant-design/icons";
import {
    DATE_FORMAT_IN_TASK_ITEM,
    DAY,
    TIME_ZONE,
} from "../../../../constants/dateTime.constants";
import {
    hardDeleteSingleTaskAction,
    restoreTaskAction,
    softDeleteTaskAction,
} from "../../state/userTasks/userTasks.actions";
import "./css/PrimaryTaskListItemDetail.css";

const StyledLink = styled(Link)`
    align-items: center;
    color: ${(props) => props.color};
    :hover {
        color: ${(props) => props.color};
        text-decoration: underline;
    }
`;

const StyledColorDot = styled.span`
    height: 0.5rem;
    width: 0.5rem;
    border-radius: 50%;
    display: inline-block;
    background-color: ${({ color }) => color};
`;

const StyledDiv = styled.div`
    whitespace: nowrap;
    overflow-x: auto;
    padding-left: 0.25rem;
`;

const StyledUndoOutlined = styled(UndoOutlined)`
    opacity: ${({ opacity }) => opacity};
    color: ${({ color }) => color};
    transition: 0.3s all ease;
`;

const StyledDeleteOutlined = styled(DeleteOutlined)`
    opacity: ${({ opacity }) => opacity};
    color: ${({ color }) => color};
    transition: 0.3s all ease;
`;

const StyledDeleteFilled = styled(DeleteFilled)`
    opacity: ${({ opacity }) => opacity};
    color: ${({ color }) => color};
    transition: 0.3s all ease;
`;

const renderColorDot = (color) => {
    return <StyledColorDot color={color} />;
};

const StyledNodeExpandOutlined = styled(NodeExpandOutlined)`
    color: ${(color) => color};
`;

const StyledSyncOutlined = styled(SyncOutlined)`
    color: ${(color) => color};
`;

const renderChildNodeIcon = ({ item, colorBorder, colorTextLabel }) => {
    if (item.childTaskIds.length > 0) {
        return (
            <StyledNodeExpandOutlined
                color={
                    item.isCompleted || item.isWontDo
                        ? colorBorder
                        : colorTextLabel
                }
            />
        );
    }
};

const renderRepeatIcon = ({ item, colorBorder, colorTextLabel }) => {
    if (item.isRepeating) {
        return (
            <StyledSyncOutlined
                color={
                    item.isCompleted || item.isWontDo
                        ? colorBorder
                        : colorTextLabel
                }
            />
        );
    }
};

const renderList = ({ item, lists, colorBorder, colorTextLabel }) => {
    const itemInList = lists?.find((each) => each.id === item?.listId);
    const listColor =
        item.isCompleted || item.isWontDo ? colorBorder : itemInList?.color;
    return (
        <StyledLink
            to={itemInList ? `/tasks/lists/${itemInList?.id}` : `/tasks/inbox`}
            color={colorTextLabel}
            onClick={(e) => e.stopPropagation()}
        >
            {itemInList?.color ? renderColorDot(listColor) : null}
            <Typography.Text
                type="secondary"
                className="link__text"
                disabled={item.isCompleted || item.isWontDo}
            >
                {itemInList?.label || INBOX}
            </Typography.Text>
        </StyledLink>
    );
};

const renderTaskDate = ({ item }) => {
    const today = dayjs.utc().tz(TIME_ZONE).startOf(DAY);

    const taskDate = dayjs(item.taskDate);
    const startMultiDate = dayjs(item.startMultiDate);
    const endMultiDate = dayjs(item.endMultiDate);

    if (item.taskDate) {
        return (
            <Typography.Text
                type={
                    taskDate.endOf(DAY).isBefore(today) ? "danger" : "secondary"
                }
                disabled={item.isCompleted || item.isWontDo}
            >
                {taskDate.format(DATE_FORMAT_IN_TASK_ITEM)}
            </Typography.Text>
        );
    } else if (item.isMultiDay) {
        return (
            <Typography.Text
                type={
                    startMultiDate.endOf(DAY).isBefore(today)
                        ? "danger"
                        : "secondary"
                }
                disabled={item.isCompleted || item.isWontDo}
            >
                {`${startMultiDate.format(
                    DATE_FORMAT_IN_TASK_ITEM
                )}-${endMultiDate.format(DATE_FORMAT_IN_TASK_ITEM)}`}
            </Typography.Text>
        );
    }
};

const WrapperDiv = styled.div`
    display: flex;
    align-item: center;
    justify-content: space-between;
`;

const PrimaryTaskListItemDetail = ({
    taskDetails,
    selectedTaskDetails,
    lists,
    handleTaskRestore,
    showSoftDeleteConfirm,
    handleSoftDelete,
    showHardDeleteConfirm,
    handleHardDelete,
}) => {
    const {
        token: { colorBorder, colorTextLabel, colorError },
    } = theme.useToken();

    return (
        <WrapperDiv>
            <Typography.Text
                className="name__text"
                disabled={taskDetails.isCompleted || taskDetails.isWontDo}
            >{`${taskDetails.name}`}</Typography.Text>
            <StyledDiv>
                <Space size="small" className="padding__right">
                    {renderList({
                        item: taskDetails,
                        lists: lists,
                        colorBorder: colorBorder,
                        colorTextLabel: colorTextLabel,
                    })}
                    {renderChildNodeIcon({
                        item: taskDetails,
                        colorTextLabel,
                        colorBorder,
                    })}
                    {renderRepeatIcon({
                        item: taskDetails,
                        colorTextLabel,
                        colorBorder,
                    })}
                    {renderTaskDate({ item: taskDetails })}
                </Space>
                {taskDetails.isDeleted ? (
                    <Button
                        type="text"
                        icon={
                            <StyledUndoOutlined
                                opacity={
                                    selectedTaskDetails?.length > 1 ? 0.3 : 1
                                }
                                color={
                                    taskDetails.isCompleted ||
                                    taskDetails.isWontDo
                                        ? colorBorder
                                        : colorTextLabel
                                }
                            />
                        }
                        size="small"
                        onClick={(e) => {
                            e.stopPropagation();
                            handleTaskRestore({
                                currentItem: taskDetails,
                                restoreTaskAction: restoreTaskAction,
                                successMessage: "Task restored",
                                failureMessage: "Failed to restore task",
                            });
                        }}
                        disabled={selectedTaskDetails?.length > 1}
                    />
                ) : (
                    <Button
                        type="text"
                        icon={
                            <StyledDeleteOutlined
                                opacity={
                                    selectedTaskDetails?.length > 1 ? 0.3 : 1
                                }
                                color={
                                    taskDetails.isCompleted ||
                                    taskDetails.isWontDo
                                        ? colorBorder
                                        : colorTextLabel
                                }
                            />
                        }
                        size="small"
                        onClick={(e) => {
                            e.stopPropagation();
                            showSoftDeleteConfirm({
                                content: "Delete this task?",
                                handleSoftDelete: handleSoftDelete,
                                currentItem: taskDetails,
                                softDeleteAction: softDeleteTaskAction,
                                successMessage: "Task deleted",
                                failureMessage: "Failed to delete task",
                            });
                        }}
                        disabled={selectedTaskDetails?.length > 1}
                    />
                )}
                {taskDetails.isDeleted ? (
                    <Button
                        type="text"
                        icon={
                            <StyledDeleteFilled
                                opacity={
                                    selectedTaskDetails?.length > 1 ? 0.3 : 1
                                }
                                color={
                                    taskDetails.isCompleted ||
                                    taskDetails.isWontDo
                                        ? colorBorder
                                        : colorError
                                }
                            />
                        }
                        size="small"
                        onClick={(e) => {
                            e.stopPropagation();
                            showHardDeleteConfirm({
                                content: "Delete this task permanently?",
                                handleHardDelete: handleHardDelete,
                                currentItem: taskDetails,
                                hardDeleteAction: hardDeleteSingleTaskAction,
                                successMessage: "Task deleted",
                                failureMessage: "Failed to delete task",
                            });
                        }}
                        disabled={selectedTaskDetails?.length > 1}
                    />
                ) : null}
            </StyledDiv>
        </WrapperDiv>
    );
};

export default PrimaryTaskListItemDetail;
