import { Layout, message, Modal, Skeleton, theme } from "antd";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  COMPLETED,
  DELETED,
  INBOX,
  LISTS,
  SUCCESS,
  TAGS,
  WONT_DO,
} from "../../../constants/app.constants";
import { CREATE } from "../../../constants/formType.constants";
import { tasksSelector } from "../state/userTasks/userTasks.reducer";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import dayjs from "../../../utils/dateTime.utils";
import { DAY, TIME_ZONE } from "../../../constants/dateTime.constants";
import { hardDeleteTaskAction } from "../state/userTasks/userTasks.actions";
import { PRIORITY, TIME, TITLE } from "../../../constants/sort.constants";
import { useParams, useLocation } from "react-router-dom";
import { NONE } from "../../../constants/priority.constants";
import { ENDLESS } from "../../../constants/repeating.constants";
import { computeSectionData } from "./List.utils";
import ListHeader from "./Header";
import ListSections from "./Sections";
import DialogForm from "./DialogForm";
import Loading from "../../../components/Loading";
import Spinner from "../../../components/Spinner";

const hideAddForSections = [COMPLETED, WONT_DO, DELETED];

const ListView = ({
  user,
  currentSection,
  isMenuCollapsed,
  setIsMenuCollapsed,
  selectedTaskDetails,
  setSelectedTaskDetails,
  isNavDrawerCollapsed,
  setIsNavDrawerCollapsed,
}) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const [messageApi, messageContextHolder] = message.useMessage();
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

  const url = useLocation();
  const pathParameters = useMemo(() => {
    return url?.pathname.split("/");
  }, [url]);

  useEffect(() => {
    if (
      pathParameters.length > 4 &&
      tasks.length > 0 &&
      (pathParameters[2] === LISTS || pathParameters[2] === TAGS)
    ) {
      const selectedItemViaURL = tasks.find(
        (each) => each.id === pathParameters[4]
      );
      selectedItemViaURL && setSelectedTaskDetails([selectedItemViaURL]);
    } else if (pathParameters.length > 3 && tasks.length > 0) {
      const selectedItemViaURL = tasks.find(
        (each) => each.id === pathParameters[3]
      );
      selectedItemViaURL && setSelectedTaskDetails([selectedItemViaURL]);
    }
  }, [pathParameters, tasks]);

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

  const [modal, modalContextHolder] = Modal.useModal();
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
    modal.confirm({
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
    modal.confirm({
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

  const [numRows, setNumRows] = useState(10);

  useEffect(() => {
    const handleResize = () => {
      const windowHeight = window.innerHeight;
      const rowHeight = 70;
      const availableRows = Math.floor(windowHeight / rowHeight) - 1;
      setNumRows(availableRows);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Layout.Content
      style={{
        overflow: "auto",
        background: colorBgContainer,
        position: "relative",
      }}
    >
      <ListHeader
        currentSection={currentSection}
        sortedSectionTasks={sortedSectionTasks}
        showMultiSelectConfirm={showMultiSelectConfirm}
        selectedTaskDetails={selectedTaskDetails}
        handleSortMenuClick={handleSortMenuClick}
        handleMultipleSelection={handleMultipleSelection}
        hideAddIcon={hideAddIcon}
        handleAddTask={handleAddTask}
        handlePermanentDelete={handlePermanentDelete}
        sortBy={sortBy}
        isMenuCollapsed={isMenuCollapsed}
        setIsMenuCollapsed={setIsMenuCollapsed}
        isNavDrawerCollapsed={isNavDrawerCollapsed}
        setIsNavDrawerCollapsed={setIsNavDrawerCollapsed}
      />

      {isLoadingTasks && tasks?.length === 0 ? (
        Array.from({ length: numRows }).map((each, index) => (
          <Skeleton.Button
            key={index}
            active={true}
            style={{ margin: "0.5rem 1rem", width: "95%", height: 70 }}
            block={true}
          />
        ))
      ) : (
        <Spinner
          spinning={isLoadingTasks}
          indicator={Loading(0)}
          delay={0}
        >
          <ListSections
            user={user}
            tasks={sortedSectionTasks}
            sortBy={sortBy}
            selectedTaskDetails={selectedTaskDetails}
            setSelectedTaskDetails={setSelectedTaskDetails}
          />
        </Spinner>
      )}

      {openAddTaskDialog && (
        <DialogForm
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
      {modalContextHolder}
      {messageContextHolder}
    </Layout.Content>
  );
};

export default ListView;
