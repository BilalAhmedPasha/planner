import { Layout, Modal, Skeleton, message, theme } from "antd";
import HabitItem from "./HabitItem";
import { habitsSelector } from "../state/userHabits/userHabits.reducer";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import Spinner from "../../../components/Spinner";
import Loading from "../../../components/Loading";
import HabitListHeader from "./HabitListHeader";
import HabitDialogForm from "../HabitList/HabitDialogForm";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { deleteHabitAction } from "../state/userHabits/userHabits.actions";

const HabitListContainer = ({ user, setSelectedHabitDetail }) => {
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
    if (pathParameters.length > 3 && habits.length > 0) {
      const selectedItemViaURL = habits.find(
        (each) => each.id === pathParameters[3]
      );
      selectedItemViaURL && setSelectedHabitDetail(selectedItemViaURL);
    }
  }, [pathParameters, habits, setSelectedHabitDetail]);

  const [formConfig, setFormConfig] = useState();
  const [numRows, setNumRows] = useState(10);
  useEffect(() => {
    const handleResize = () => {
      const windowHeight = window.innerHeight;
      const rowHeight = 32;
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

  const dispatch = useDispatch();
  const handleDelete = ({ successMessage, failureMessage, habitId }) => {
    dispatch(deleteHabitAction(user.uid, habitId)).then((response) => {
      if (response.success === SUCCESS) {
        deleteSuccess({ messageText: successMessage });
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
      <Skeleton
        active
        loading={isLoadingHabits && habits?.length === 0}
        paragraph={{ rows: numRows }}
        style={{ padding: "1rem" }}
      >
        <Spinner
          spinning={isLoadingHabits && habits?.length > 0}
          indicator={Loading(0)}
        >
          <HabitListHeader
            handleOpenHabitDialog={handleOpenHabitDialog}
            setFormConfig={setFormConfig}
          />
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
          {habits.map((habit) => (
            <HabitItem
              habit={habit}
              setSelectedHabitDetail={setSelectedHabitDetail}
              handleOpenHabitDialog={handleOpenHabitDialog}
              setFormConfig={setFormConfig}
              handleDeleteHabit={handleDeleteHabit}
            />
          ))}
          {contextHolder}
          {modelContextHolder}
        </Spinner>
      </Skeleton>
    </Layout.Content>
  );
};

export default HabitListContainer;
