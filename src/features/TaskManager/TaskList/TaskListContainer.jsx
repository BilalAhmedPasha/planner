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
import { useEffect, useState } from "react";
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
import TaskDialogForm from "./TaskDialogForm";
import Container from "./TaskListItem/Container";
import {
  PlusOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  ClearOutlined,
  ExclamationCircleOutlined,
  FlagOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";
import Icon from "@ant-design/icons";
import { ReactComponent as SortSvg } from "../../../svg/sort-arrow.svg";
import { ReactComponent as SortTextSvg } from "../../../svg/sort-text.svg";
import dayjs from "../../../utils/dateTime.uitls";
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
} from "./TaskListItem/TaskUtils";
import { TIME_ZONE } from "../../../constants/dateTime.constants";
import { hardDeleteTaskAction } from "../state/userTasks/userTasks.actions";
import Spinner from "../../../components/Spinner";
import { PRIORITY, TIME, TITLE } from "../../../constants/sort.constants";

const computeSectionData = ({ tasks, currentSection }) => {
  if (currentSection.id === ALL) {
    return getAllTasks({ tasks });
  } else if (currentSection.id === INBOX) {
    return getInboxTasks({ tasks });
  } else if (currentSection.id === TODAY) {
    const today = dayjs.utc().tz(TIME_ZONE);
    return getTasksByDate({ tasks, date: today, includeOverDue: true });
  } else if (currentSection.id === TOMORROW) {
    const tomorrow = dayjs.utc().tz(TIME_ZONE).add(1, "day");
    return getTasksByDate({ tasks, date: tomorrow, includeOverDue: false });
  } else if (currentSection.id === NEXT_7_DAYS) {
    const tomorrow = dayjs.utc().tz(TIME_ZONE).add(1, "day");
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

const showAddForSections = [
  ALL,
  INBOX,
  TODAY,
  TOMORROW,
  NEXT_7_DAYS,
  LISTS,
  TAGS,
  NO_DATE,
];

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
  {
    label: "Title",
    key: TITLE,
    icon: <Icon component={SortTextSvg} style={{ fontSize: "1.25rem" }} />,
  },
];

const TaskListContainer = ({
  user,
  currentSection,
  selectedCardId,
  setSelectedCardId,
  isMenuCollapsed,
  setIsMenuCollapsed,
  setSelectedTaskDetails,
}) => {
  const {
    token: { colorBgContainer },
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

  return (
    <Layout.Content
      style={{
        marginRight: "0.1rem",
        padding: "1rem 1rem",
        background: colorBgContainer,
      }}
    >
      <Spinner spinning={isLoadingTasks} indicator={Loading(LOADER_SIZE)}>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            height: "2.5rem",
            marginBottom: "0.5rem",
          }}
        >
          <Space>
            <Button
              type="text"
              icon={
                isMenuCollapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />
              }
              onClick={() => {
                setIsMenuCollapsed((prevState) => !prevState);
              }}
              size="large"
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

          {(showAddForSections.includes(currentSection?.id) ||
            showAddForSections.includes(currentSection?.type)) && (
            <Space size="small">
              <Dropdown
                menu={{
                  items: moreMenuItemList,
                  onClick: handleSortMenuClick,
                }}
                trigger={["hover"]}
                placement="bottomLeft"
              >
                <div>
                  {sortBy === TIME ? (
                    <ClockCircleOutlined
                      style={{
                        fontSize: "1rem",
                      }}
                    />
                  ) : sortBy === PRIORITY ? (
                    <FlagOutlined
                      style={{
                        fontSize: "1rem",
                      }}
                    />
                  ) : (
                    <Icon
                      component={SortTextSvg}
                      style={{ fontSize: "1.25rem" }}
                    />
                  )}
                  <Icon component={SortSvg} style={{ fontSize: "1.25rem" }} />
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
          />
        )}
        <div
          style={{
            overflowY: "scroll",
            height: "90vh",
            padding: "0rem 1rem",
            marginTop: "0.5rem",
          }}
        >
          <Container
            user={user}
            tasks={sortedSectionTasks}
            sortBy={sortBy}
            selectedCardId={selectedCardId}
            setSelectedCardId={setSelectedCardId}
            setSelectedTaskDetails={setSelectedTaskDetails}
          />
        </div>
      </Spinner>
    </Layout.Content>
  );
};

export default TaskListContainer;
