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
import { hardDeleteTaskAction } from "../state/userTasks/userTasks.actions";
import Spinner from "../../../components/Spinner";
import { PRIORITY, TIME, TITLE } from "../../../constants/sort.constants";
import { useParams } from "react-router-dom";
import { NONE } from "../../../constants/priority.constants";
import { ENDLESS } from "../../../constants/repeating.constants";

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
          <Space size="small">
            <Button
              type="text"
              icon={
                isMenuCollapsed ? (
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
              }}
              size="medium"
            />
            <Typography.Text
              style={{
                fontWeight: "bold",
                fontSize: "24px",
              }}
            >
              {currentSection?.label}
            </Typography.Text>
          </Space>
          {!hideAddIcon && (
            <Space size="small" direction="horizontal">
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
                  {/* <Icon
                    component={SortSvg}
                    style={{ fontSize: "1.25rem", color: colorTextBase }}
                  /> */}
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
            <Button
              size="large"
              type="text"
              icon={<ClearOutlined />}
              onClick={handlePermanentDelete}
            />
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
