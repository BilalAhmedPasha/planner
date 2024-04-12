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
                        <MenuUnfoldOutlined
                            style={{
                                fontSize: "20px",
                            }}
                        />
                    ) : (
                        <MenuFoldOutlined
                            style={{
                                fontSize: "20px",
                            }}
                        />
                    )
                ) : isMenuCollapsed ? (
                    <MenuUnfoldOutlined
                        style={{
                            fontSize: "20px",
                        }}
                    />
                ) : (
                    <MenuFoldOutlined
                        style={{
                            fontSize: "20px",
                        }}
                    />
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
        <div
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "0.5rem",
                top: 0,
                zIndex: 1,
                background: colorBgContainer,
                position: "sticky",
            }}
        >
            {" "}
            <Space size="small" style={{ alignItems: "center" }}>
                {renderTaskMenuIcon({
                    screenSize,
                    isMenuCollapsed,
                    setIsMenuCollapsed,
                    isNavDrawerCollapsed,
                    setIsNavDrawerCollapsed,
                })}
                <Typography.Text
                    style={{
                        fontWeight: "bold",
                        fontSize: "24px",
                        whiteSpace: "nowrap",
                        overflowX: "auto",
                    }}
                >
                    {currentSection?.label}
                </Typography.Text>
                {sortedSectionTasks?.length > 0 && (
                    <Typography.Text
                        type="secondary"
                        style={{ whiteSpace: "nowrap", overflowX: "auto" }}
                    >{`${sortedSectionTasks?.length}`}</Typography.Text>
                )}
            </Space>
            {!hideAddIcon && (
                <Space size="small" direction="horizontal">
                    {currentSection?.id !== DELETED && (
                        <StyledButton
                            type="text"
                            icon={<DeleteFilled style={{ fontSize: "1rem" }} />}
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
                            style={{
                                opacity: selectedTaskDetails.length > 1 ? 1 : 0,
                                transition: "0.3s all ease",
                                cursor:
                                    selectedTaskDetails.length > 1
                                        ? "pointer"
                                        : "auto",
                            }}
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
                                <ClockCircleOutlined
                                    style={{
                                        fontSize: "1rem",
                                        color: colorTextBase,
                                        cursor: "pointer",
                                    }}
                                />
                            ) : sortBy === PRIORITY ? (
                                <FlagOutlined
                                    style={{
                                        fontSize: "1rem",
                                        color: colorTextBase,
                                        cursor: "pointer",
                                    }}
                                />
                            ) : (
                                <Icon
                                    component={SortTextSvg}
                                    style={{ fontSize: "1.25rem" }}
                                />
                            )}
                            <ArrowDownOutlined
                                style={{
                                    fontSize: "1rem",
                                    color: colorTextBase,
                                    marginLeft: "0.2rem",
                                    cursor: "pointer",
                                }}
                            />{" "}
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
                    <Button
                        type="text"
                        icon={<UndoOutlined style={{ fontSize: "1rem" }} />}
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

                    <Button
                        type="text"
                        icon={<DeleteFilled style={{ fontSize: "1rem" }} />}
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
        </div>
    );
};

export default TaskListHeader;
