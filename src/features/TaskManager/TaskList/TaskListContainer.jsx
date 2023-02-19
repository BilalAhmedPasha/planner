import {
  Button,
  Dropdown,
  Layout,
  message,
  Modal,
  Space,
  theme,
  Typography,
} from "antd";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../../components/Loading";
import {
  ALL,
  COMPLETED,
  DELETED,
  INBOX,
  LISTS,
  LOADER_SIZE,
  NEXT_7_DAYS,
  SUCCESS,
  TAGS,
  TODAY,
  TOMORROW,
  NO_DATE,
  WONT_DO,
} from "../../../constants/app.constants";
import { CREATE } from "../../../constants/formType.constants";
import { tasksSelector } from "../state/userTasks/userTasks.reducer";
import TaskDialogForm from "../TaskDialogForm";
import Container from "../TaskListItem/Container";
import Icon, {
  PlusOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  ClearOutlined,
  ExclamationCircleOutlined,
  FlagOutlined,
  ClockCircleOutlined,
  ArrowDownOutlined,
  DeleteFilled,
  UndoOutlined,
} from "@ant-design/icons";
import { ReactComponent as SortTextSvg } from "../../../svg/sort-text.svg";
import dayjs from "../../../utils/dateTime.utils";
import {
  getAllTasks,
  getByListId,
  getByTagId,
  getCompletedTasks,
  getDeletedTasks,
  getInboxTasks,
  getTasksByDate,
  getTasksByNextXDays,
  getNoDateTasks,
  getWontDoTasks,
} from "../TaskListItem/TaskUtils";
import { DAY, TIME_ZONE } from "../../../constants/dateTime.constants";
import {
  hardDeleteTaskAction,
  softDeleteMultipleTaskAction,
  hardDeleteMultipleTaskAction,
  softRestoreMultipleTaskAction,
} from "../state/userTasks/userTasks.actions";
import Spinner from "../../../components/Spinner";
import { PRIORITY, TIME, TITLE } from "../../../constants/sort.constants";
import { useParams } from "react-router-dom";
import { NONE } from "../../../constants/priority.constants";
import { ENDLESS } from "../../../constants/repeating.constants";
import { taskNavToDrawer } from "../../../utils/screen.utils";
import useWindowSize from "../../../hooks/useWindowSize";

const computeSectionData = ({ tasks, currentSection }) => {
  if (currentSection.id === ALL) {
    return getAllTasks({ tasks });
  } else if (currentSection.id === INBOX) {
    return getInboxTasks({ tasks });
  } else if (currentSection.id === TODAY) {
    const today = dayjs.utc().tz(TIME_ZONE);
    return getTasksByDate({ tasks, date: today, includeOverDue: true });
  } else if (currentSection.id === TOMORROW) {
    const tomorrow = dayjs.utc().tz(TIME_ZONE).add(1, DAY);
    return getTasksByDate({ tasks, date: tomorrow, includeOverDue: false });
  } else if (currentSection.id === NEXT_7_DAYS) {
    const tomorrow = dayjs.utc().tz(TIME_ZONE).add(1, DAY);
    return getTasksByNextXDays({ tasks, fromDate: tomorrow, count: 6 });
  } else if (currentSection.id === NO_DATE) {
    return getNoDateTasks({ tasks });
  } else if (currentSection.id === COMPLETED) {
    return getCompletedTasks({ tasks });
  } else if (currentSection.id === WONT_DO) {
    return getWontDoTasks({ tasks });
  } else if (currentSection.id === DELETED) {
    return getDeletedTasks({ tasks });
  } else if (currentSection.type === LISTS) {
    return getByListId({ tasks, listId: currentSection.id });
  } else if (currentSection.type === TAGS) {
    return getByTagId({ tasks, tagId: currentSection.id });
  }
  return [];
};

const hideAddForSections = [COMPLETED, WONT_DO, DELETED];

const moreMenuItemList = [
  {
    label: "Time",
    key: TIME,
    icon: (
      <ClockCircleOutlined
        style={{
          fontSize: "1rem",
        }}
      />
    ),
  },
  {
    label: "Priority",
    key: PRIORITY,
    icon: (
      <FlagOutlined
        style={{
          fontSize: "1rem",
        }}
      />
    ),
  },
  // TODO
  // {
  //   label: "Title",
  //   key: TITLE,
  //   icon: <Icon component={SortTextSvg} style={{ fontSize: "1.25rem" }} />,
  // },
];

const TaskListContainer = ({
  user,
  currentSection,
  isMenuCollapsed,
  setIsMenuCollapsed,
  selectedTaskDetails,
  setSelectedTaskDetails,
  isNavDrawerCollapsed,
  setIsNavDrawerCollapsed,
  setIsTaskDetailsDrawerCollapsed,
}) => {
  const {
    token: { colorBgContainer, colorTextBase },
  } = theme.useToken();

  const [messageApi] = message.useMessage();
  const [openAddTaskDialog, setOpenAddTaskDialog] = useState(false);

  const handleAddTask = () => {
    setOpenAddTaskDialog(true);
  };

  const [sortBy, setSortBy] = useState(TIME);
  const handleSortMenuClick = (e) => {
    setSortBy(e.key);
  };

  const { tasks, isLoadingTasks } = useSelector(tasksSelector);
  const [currentSectionTasks, setCurrentSectionTasks] = useState([]);
  const [sortedSectionTasks, setSortedSectionTasks] = useState([]);

  useEffect(() => {
    if (currentSection?.label) {
      const sectionData = computeSectionData({
        tasks,
        currentSection,
      });

      setCurrentSectionTasks(sectionData);
    }
  }, [currentSection, tasks]);

  useEffect(() => {
    let currentSectionTasksTemp = [];
    if (sortBy === TITLE) {
      currentSectionTasksTemp = currentSectionTasks.sort((a, b) =>
        a.name > b.name ? 1 : b.name > a.name ? -1 : 0
      );
    } else if (sortBy === PRIORITY) {
      currentSectionTasksTemp = currentSectionTasks.sort((a, b) =>
        a.priority < b.priority ? 1 : b.priority > a.priority ? -1 : 0
      );
    } else {
      currentSectionTasksTemp = currentSectionTasks.sort((a, b) =>
        a.taskDate > b.taskDate ? 1 : b.taskDate > a.taskDate ? -1 : 0
      );
    }
    setSortedSectionTasks(currentSectionTasksTemp);
  }, [sortBy, currentSectionTasks]);

  const { confirm } = Modal;
  const deleteSuccess = ({ messageText }) => {
    messageApi.open({
      type: "success",
      content: messageText,
      duration: 3,
    });
  };
  const deleteFailed = ({ messageText }) => {
    messageApi.open({
      type: "error",
      content: messageText,
      duration: 3,
    });
  };

  const dispatch = useDispatch();
  const handleDelete = ({ successMessage, failureMessage }) => {
    dispatch(hardDeleteTaskAction(user.uid)).then((response) => {
      if (response.success === SUCCESS) {
        deleteSuccess({ messageText: successMessage });
      } else {
        deleteFailed({ messageText: failureMessage });
      }
    });
  };

  const showDeleteConfirm = ({
    content,
    handleDelete,
    successMessage,
    failureMessage,
  }) => {
    confirm({
      icon: <ExclamationCircleOutlined />,
      title: "Delete",
      content: content,
      centered: true,
      okText: "Delete",
      okType: "danger",
      cancelText: "Cancel",
      onOk() {
        handleDelete({
          successMessage: successMessage,
          failureMessage: failureMessage,
        });
      },
      onCancel() {
        Modal.destroyAll();
      },
    });
  };

  const handlePermanentDelete = (e) => {
    showDeleteConfirm({
      successMessage: "Tasks deleted",
      failureMessage: "Failed to delete tasks",
      content: "These tasks will be permanantly deleted. Delete the tasks?",
      handleDelete: handleDelete,
    });
  };

  const handleMultipleSelection = ({
    successMessage,
    failureMessage,
    dispatchAction,
  }) => {
    dispatch(dispatchAction(user.uid, selectedTaskDetails)).then((response) => {
      setSelectedTaskDetails([]);
      if (response.success === SUCCESS) {
        deleteSuccess({ messageText: successMessage });
      } else {
        deleteFailed({ messageText: failureMessage });
      }
    });
  };

  const showMultiSelectConfirm = ({
    content,
    successMessage,
    failureMessage,
    onOkHandler,
    dispatchAction,
    title,
    okText,
    okType,
  }) => {
    confirm({
      icon: <ExclamationCircleOutlined />,
      title: title,
      content: content,
      centered: true,
      okText: okText,
      okType: okType,
      cancelText: "Cancel",
      onOk() {
        onOkHandler({
          successMessage: successMessage,
          failureMessage: failureMessage,
          dispatchAction: dispatchAction,
        });
      },
      onCancel() {
        Modal.destroyAll();
      },
    });
  };

  const [hideAddIcon, setHideAddIcon] = useState(false);

  useEffect(() => {
    setHideAddIcon(
      hideAddForSections.includes(currentSection?.id) ||
        hideAddForSections.includes(currentSection?.type)
    );
  }, [currentSection]);

  const { sectionId, documentId } = useParams();

  const TASK_DATE = useMemo(() => {
    if (sectionId === "today") {
      const today = dayjs.utc().tz(TIME_ZONE);
      return today;
    } else if (sectionId === "tomorrow") {
      const tomorrow = dayjs.utc().tz(TIME_ZONE).add(1, DAY);
      return tomorrow;
    }
  }, [sectionId]);

  const TASK_LIST = sectionId === LISTS ? documentId : INBOX;
  const TASK_TAGS = useMemo(() => {
    if (sectionId === TAGS) {
      return [documentId];
    }
    return [];
  }, [documentId, sectionId]);

  const FORM_VALUES = {
    name: "",
    listId: TASK_LIST,
    priority: NONE,
    endBy: ENDLESS,
    tagIds: TASK_TAGS,
    taskDate: TASK_DATE,
  };

  const screenSize = useWindowSize();
  const renderTaskMenuIcon = () => {
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
  return (
    <Layout.Content
      style={{
        overflow: "auto",
        background: colorBgContainer,
        position: "relative",
      }}
    >
      <Spinner spinning={isLoadingTasks} indicator={Loading(LOADER_SIZE)}>
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
          <Space size="small" style={{ alignItems: "center" }}>
            {renderTaskMenuIcon()}
            <Typography.Text
              style={{
                fontWeight: "bold",
                fontSize: "24px",
                whiteSpace: "nowrap",
                overflowX: "auto",
                textOverflow: "ellipsis",
              }}
            >
              {currentSection?.label}
            </Typography.Text>
            {sortedSectionTasks?.length > 0 && (
              <Typography.Text type="secondary">{`${sortedSectionTasks?.length}`}</Typography.Text>
            )}
          </Space>

          {!hideAddIcon && (
            <Space size="small" direction="horizontal">
              {currentSection?.id !== DELETED && (
                <Button
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
                      dispatchAction: softDeleteMultipleTaskAction,
                      title: "Delete",
                      okText: "Delete",
                      okType: "danger",
                    });
                  }}
                  style={{
                    opacity: selectedTaskDetails.length > 1 ? 1 : 0,
                    transition: "0.3s all ease",
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
                      }}
                    />
                  ) : sortBy === PRIORITY ? (
                    <FlagOutlined
                      style={{
                        fontSize: "1rem",
                        color: colorTextBase,
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
                    }}
                  />
                </div>
              </Dropdown>
              <Button
                size="small"
                type="primary"
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
                style={{
                  opacity: selectedTaskDetails.length > 1 ? 1 : 0,
                  transition: "0.3s all ease",
                }}
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
                style={{
                  opacity: selectedTaskDetails.length > 1 ? 1 : 0,
                  transition: "0.3s all ease",
                }}
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
        {openAddTaskDialog && (
          <TaskDialogForm
            user={user}
            messageApi={messageApi}
            openDialog={openAddTaskDialog}
            setOpenDialog={setOpenAddTaskDialog}
            formType={CREATE}
            formValues={FORM_VALUES}
            disableDateSelection={false}
            disableTimeSelection={false}
          />
        )}

        <Container
          user={user}
          tasks={sortedSectionTasks}
          sortBy={sortBy}
          selectedTaskDetails={selectedTaskDetails}
          setSelectedTaskDetails={setSelectedTaskDetails}
        />
      </Spinner>
    </Layout.Content>
  );
};

export default TaskListContainer;
