import { Button, Layout, message, Space, Spin, theme, Typography } from "antd";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Loading from "../../../components/Loading";
import {
  ALL,
  COMPLETED,
  DELETED,
  INBOX,
  LISTS,
  LOADER_SIZE,
  NEXT_7_DAYS,
  TAGS,
  TODAY,
  TOMORROW,
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
} from "@ant-design/icons";
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
  getWontDoTasks,
} from "./TaskListItem/TaskUtils";
import { TIME_ZONE } from "../../../constants/dateTime.constants";

const TaskListContainer = ({
  user,
  currentSection,
  selectedCardId,
  setSelectedCardId,
  isMenuCollapsed,
  setIsMenuCollapsed,
}) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const [messageApi] = message.useMessage();
  const [openAddTaskDialog, setOpenAddTaskDialog] = useState(false);

  const handleAddTask = () => {
    setOpenAddTaskDialog(true);
  };

  const { tasks, isLoadingTasks } = useSelector(tasksSelector);
  const [currentSectionTasks, setCurrentSectionTasks] = useState([]);

  const computeSectionData = useCallback(({ tasks, currentSection }) => {
    if (currentSection.id === ALL) {
      return getAllTasks({ tasks });
    } else if (currentSection.id === INBOX) {
      return getInboxTasks({ tasks });
    } else if (currentSection.id === TODAY) {
      const today = dayjs.utc().tz(TIME_ZONE);
      return getTasksByDate({ tasks, date: today });
    } else if (currentSection.id === TOMORROW) {
      const tomorrow = dayjs.utc().tz(TIME_ZONE).add(1, "day");
      return getTasksByDate({ tasks, date: tomorrow });
    } else if (currentSection.id === NEXT_7_DAYS) {
      const tomorrow = dayjs.utc().tz(TIME_ZONE).add(1, "day");
      return getTasksByNextXDays({ tasks, fromDate: tomorrow, count: 6 });
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
  }, []);

  useEffect(() => {
    if (currentSection?.label) {
      const sectionData = computeSectionData({
        tasks,
        currentSection,
      });
      setCurrentSectionTasks(sectionData);
    }
  }, [currentSection, tasks, computeSectionData]);

  return (
    <Layout.Content
      style={{
        marginRight: "0.1rem",
        padding: "1rem 1rem",
        background: colorBgContainer,
      }}
    >
      <Spin spinning={isLoadingTasks} indicator={Loading(LOADER_SIZE)}>
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
          <Button
            size="small"
            type="primary"
            icon={<PlusOutlined />}
            onClick={handleAddTask}
          />
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
            tasks={currentSectionTasks}
            selectedCardId={selectedCardId}
            setSelectedCardId={setSelectedCardId}
          />
        </div>
      </Spin>
    </Layout.Content>
  );
};

export default TaskListContainer;
