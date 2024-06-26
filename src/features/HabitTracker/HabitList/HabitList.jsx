import { Layout, Modal, Skeleton, message, theme } from "antd";
import HabitItem from "./HabitItem";
import { habitsSelector } from "../state/userHabits/userHabits.reducer";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import HabitListHeader from "./HabitListHeader";
import HabitDialogForm from "../HabitList/HabitDialogForm";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { deleteHabitAction } from "../state/userHabits/userHabits.actions";
import { SUCCESS } from "../../../constants/app.constants";

const HabitListContainer = ({
  user,
  selectedHabitDetail,
  setSelectedHabitDetail,
  habitHistory,
  setHabitHistory
}) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const [messageApi, contextHolder] = message.useMessage();
  const [openHabitDialog, setOpenHabitDialog] = useState(false);

  const handleOpenHabitDialog = () => {
    setOpenHabitDialog(true);
  };

  const { habits, isLoadingHabits } = useSelector(habitsSelector);
  const url = useLocation();
  const pathParameters = useMemo(() => {
    return url?.pathname.split("/");
  }, [url]);

  useEffect(() => {
    if (pathParameters.length > 2 && habits.length > 0) {
      const selectedItemViaURL = habits.find(
        (each) => each.id === pathParameters[2]
      );
      selectedItemViaURL && setSelectedHabitDetail(selectedItemViaURL);
    }
  }, [pathParameters, habits, setSelectedHabitDetail]);

  const [formConfig, setFormConfig] = useState();
  const [numRows, setNumRows] = useState(10);
  useEffect(() => {
    const handleResize = () => {
      const windowHeight = window.innerHeight;
      const rowHeight = 60;
      const availableRows = Math.floor(windowHeight / rowHeight) - 1;
      setNumRows(availableRows);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const [modal, modelContextHolder] = Modal.useModal();
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

  const navigateTo = useNavigate();
  const dispatch = useDispatch();
  const handleDelete = ({ successMessage, failureMessage, habitId }) => {
    dispatch(deleteHabitAction(user.uid, habitId)).then((response) => {
      if (response.success === SUCCESS) {
        deleteSuccess({ messageText: successMessage });
        const parsedURL = url.pathname.split("/");
        if (parsedURL[parsedURL.length - 1] === habitId) {
          const updatedURL = parsedURL.slice(0, -1).join("/");
          setSelectedHabitDetail(null);
          navigateTo(updatedURL);
        }
      } else {
        deleteFailed({ messageText: failureMessage });
      }
    });
  };

  const showDeleteConfirm = ({
    successMessage,
    failureMessage,
    content,
    handleDelete,
    habitId,
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
          habitId: habitId,
        });
      },
      onCancel() {
        Modal.destroyAll();
      },
    });
  };

  const handleDeleteHabit = ({ habitId }) => {
    showDeleteConfirm({
      successMessage: "Habit deleted",
      failureMessage: "Failed to delete habit",
      content: "Delete the habit ?",
      handleDelete: handleDelete,
      habitId: habitId,
    });
  };

  return (
    <Layout.Content
      style={{
        overflow: "auto",
        background: colorBgContainer,
        position: "relative",
      }}
    >
      <HabitListHeader
        handleOpenHabitDialog={handleOpenHabitDialog}
        setFormConfig={setFormConfig}
      />
      {isLoadingHabits && habits?.length === 0
        ? Array.from({ length: numRows }).map((each, index) => (
            <Skeleton.Button
              key={index}
              active={true}
              style={{ margin: "0.25rem 1rem", width: "95%", height: 60 }}
              block={true}
            />
          ))
        : habits.map((habit) => (
            <HabitItem
              key={habit.name}
              habit={habit}
              user={user}
              selectedHabitDetail={selectedHabitDetail}
              setSelectedHabitDetail={setSelectedHabitDetail}
              handleOpenHabitDialog={handleOpenHabitDialog}
              setFormConfig={setFormConfig}
              handleDeleteHabit={handleDeleteHabit}
              setHabitHistory={setHabitHistory}
            />
          ))}
      {openHabitDialog && (
        <HabitDialogForm
          user={user}
          messageApi={messageApi}
          openDialog={openHabitDialog}
          setOpenDialog={setOpenHabitDialog}
          formType={formConfig.mode}
          formValues={formConfig.values}
        />
      )}
      {contextHolder}
      {modelContextHolder}
    </Layout.Content>
  );
};

export default HabitListContainer;
