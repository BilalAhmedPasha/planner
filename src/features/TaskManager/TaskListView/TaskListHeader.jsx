import { Button, Dropdown, Space, Typography, theme } from "antd";
import {
    hardDeleteMultipleTaskAction,
    softDeleteMultipleTaskAction,
    softRestoreMultipleTaskAction,
} from "../state/userTasks/userTasks.actions";
import { moreMenuItemList } from "../../../constants/taskList.constants";
import Icon, {
    PlusOutlined,
    ClearOutlined,
    FlagOutlined,
    ClockCircleOutlined,
    ArrowDownOutlined,
    DeleteFilled,
    UndoOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
} from "@ant-design/icons";
import SortTextSvg from "../../../svg/sort-text.svg?react";
import { taskNavToDrawer } from "../../../utils/screen.utils";
import useWindowSize from "../../../hooks/useWindowSize";
import { DELETED } from "../../../constants/app.constants";
import { PRIORITY, TIME } from "../../../constants/sort.constants";
import styled from "styled-components";
import "./css/TaskListHeader.css";

const StyledDiv = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.5rem;
    top: 0;
    z-index: 1;
    background: ${({ color }) => color};
    position: sticky;
`;

const StyledButton = styled(Button)`
    transition: 0.3s all ease;
    opacity: ${({ opacity }) => opacity};
    cursor: ${({ cursor }) => cursor};
`;

const StyledClockCircleOutlined = styled(ClockCircleOutlined)`
    font-size: 1rem;
    cursor: pointer;
    color: ${({ color }) => color};
`;

const StyledFlagOutlined = styled(FlagOutlined)`
    font-size: 1rem;
    cursor: pointer;
    color: ${({ color }) => color};
`;

const StyledArrowDownOutlined = styled(ArrowDownOutlined)`
    font-size: 1rem;
    cursor: pointer;
    margin-left: 0.2rem;
    color: ${({ color }) => color};
`;

const renderTaskMenuIcon = ({
    screenSize,
    isMenuCollapsed,
    setIsMenuCollapsed,
    isNavDrawerCollapsed,
    setIsNavDrawerCollapsed,
}) => {
    return (
        <Button
            type="text"
            icon={
                taskNavToDrawer({ currentWidth: screenSize.width }) ? (
                    isNavDrawerCollapsed ? (
                        <MenuUnfoldOutlined className="font__size__20" />
                    ) : (
                        <MenuFoldOutlined className="font__size__20" />
                    )
                ) : isMenuCollapsed ? (
                    <MenuUnfoldOutlined className="font__size__20" />
                ) : (
                    <MenuFoldOutlined className="font__size__20" />
                )
            }
            onClick={() => {
                setIsMenuCollapsed((prevState) => !prevState);
                setIsNavDrawerCollapsed((prevState) => !prevState);
            }}
            size="medium"
        />
    );
};

const TaskListHeader = ({
    currentSection,
    sortedSectionTasks,
    showMultiSelectConfirm,
    selectedTaskDetails,
    handleSortMenuClick,
    handleMultipleSelection,
    hideAddIcon,
    handleAddTask,
    handlePermanentDelete,
    sortBy,
    isMenuCollapsed,
    setIsMenuCollapsed,
    isNavDrawerCollapsed,
    setIsNavDrawerCollapsed,
}) => {
    const {
        token: { colorBgContainer, colorTextBase },
    } = theme.useToken();
    const screenSize = useWindowSize();

    return (
        <StyledDiv color={colorBgContainer}>
            <Space size="small" className="styled__space">
                {renderTaskMenuIcon({
                    screenSize,
                    isMenuCollapsed,
                    setIsMenuCollapsed,
                    isNavDrawerCollapsed,
                    setIsNavDrawerCollapsed,
                })}
                <Typography.Text className="typography__text typography__text__font">
                    {currentSection?.label}
                </Typography.Text>
                {sortedSectionTasks?.length > 0 && (
                    <Typography.Text
                        type="secondary"
                        className="typography__text"
                    >{`${sortedSectionTasks?.length}`}</Typography.Text>
                )}
            </Space>
            {!hideAddIcon && (
                <Space size="small" direction="horizontal">
                    {currentSection?.id !== DELETED && (
                        <StyledButton
                            type="text"
                            icon={<DeleteFilled className="font__size__1" />}
                            danger
                            onClick={(e) => {
                                e.stopPropagation();
                                showMultiSelectConfirm({
                                    content: `Delete these ${selectedTaskDetails.length} tasks?`,
                                    successMessage: `${selectedTaskDetails.length} tasks deleted`,
                                    failureMessage: `Failed to delete ${selectedTaskDetails.length} tasks`,
                                    onOkHandler: handleMultipleSelection,
                                    dispatchAction:
                                        softDeleteMultipleTaskAction,
                                    title: "Delete",
                                    okText: "Delete",
                                    okType: "danger",
                                });
                            }}
                            disabled={
                                selectedTaskDetails.length > 1 ? false : true
                            }
                            opacity={selectedTaskDetails.length > 1 ? 1 : 0}
                            cursor={
                                selectedTaskDetails.length > 1
                                    ? "pointer"
                                    : "auto"
                            }
                        />
                    )}
                    <Dropdown
                        menu={{
                            items: moreMenuItemList,
                            onClick: handleSortMenuClick,
                        }}
                        trigger={["click"]}
                        placement="bottomLeft"
                    >
                        <div>
                            {sortBy === TIME ? (
                                <StyledClockCircleOutlined
                                    color={colorTextBase}
                                />
                            ) : sortBy === PRIORITY ? (
                                <StyledFlagOutlined color={colorTextBase} />
                            ) : (
                                <Icon
                                    component={SortTextSvg}
                                    className="font__size__1_25"
                                />
                            )}
                            <StyledArrowDownOutlined color={colorTextBase} />
                        </div>
                    </Dropdown>
                    <Button
                        type="dashed"
                        icon={<PlusOutlined />}
                        onClick={handleAddTask}
                    />
                </Space>
            )}
            {currentSection?.id === DELETED && (
                <Space size="small">
                    <StyledButton
                        type="text"
                        icon={<UndoOutlined className="font__size__1" />}
                        onClick={(e) => {
                            e.stopPropagation();
                            showMultiSelectConfirm({
                                content: `Restore these ${selectedTaskDetails.length} tasks?`,
                                successMessage: `${selectedTaskDetails.length} tasks restored`,
                                failureMessage: `Failed to restore ${selectedTaskDetails.length} tasks`,
                                onOkHandler: handleMultipleSelection,
                                dispatchAction: softRestoreMultipleTaskAction,
                                title: "Restore",
                                okText: "Restore",
                                okType: "primary",
                            });
                        }}
                        disabled={selectedTaskDetails.length > 1 ? false : true}
                        opacity={selectedTaskDetails.length > 1 ? 1 : 0}
                        cursor={
                            selectedTaskDetails.length > 1 ? "pointer" : "auto"
                        }
                    />

                    <StyledButton
                        type="text"
                        icon={<DeleteFilled className="font__size__1" />}
                        danger
                        onClick={(e) => {
                            e.stopPropagation();
                            showMultiSelectConfirm({
                                content: `Permanently delete these ${selectedTaskDetails.length} tasks?`,
                                successMessage: `${selectedTaskDetails.length} tasks deleted`,
                                failureMessage: `Failed to delete ${selectedTaskDetails.length} tasks`,
                                onOkHandler: handleMultipleSelection,
                                dispatchAction: hardDeleteMultipleTaskAction,
                                title: "Delete",
                                okText: "Delete",
                                okType: "danger",
                            });
                        }}
                        disabled={selectedTaskDetails.length > 1 ? false : true}
                        opacity={selectedTaskDetails.length > 1 ? 1 : 0}
                        cursor={
                            selectedTaskDetails.length > 1 ? "pointer" : "auto"
                        }
                    />

                    <Button
                        size="large"
                        type="text"
                        icon={<ClearOutlined />}
                        onClick={handlePermanentDelete}
                    />
                </Space>
            )}
        </StyledDiv>
    );
};

export default TaskListHeader;
