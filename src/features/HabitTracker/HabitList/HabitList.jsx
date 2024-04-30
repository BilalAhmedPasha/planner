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
import { CREATE } from "../../../constants/formType.constants";
import { TIME_ZONE } from "../../../constants/dateTime.constants";
import dayjs from "../../../utils/dateTime.utils";
import {
  DEFAULT_REPEAT_CRITERIA,
  REPEAT_DAYS,
} from "../../../constants/habits.constants";

const HabitListContainer = ({ user, setSelectedHabitDetail }) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const [messageApi] = message.useMessage();
  const [openAddHabitDialog, setOpenAddHabitDialog] = useState(false);

  const handleAddHabit = () => {
    setOpenAddHabitDialog(true);
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

  const [modal, contextHolder] = Modal.useModal();

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

  const FORM_VALUES = {
    name: "",
    startDate: dayjs.utc().tz(TIME_ZONE),
    frequency: REPEAT_DAYS,
    repeatCriteria: DEFAULT_REPEAT_CRITERIA,
  };

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
          <HabitListHeader handleAddHabit={handleAddHabit} />
          {openAddHabitDialog && (
            <HabitDialogForm
              user={user}
              messageApi={messageApi}
              openDialog={openAddHabitDialog}
              setOpenDialog={setOpenAddHabitDialog}
              formType={CREATE}
              formValues={FORM_VALUES}
            />
          )}
          {habits.map((habit) => (
            <HabitItem
              habit={habit}
              setSelectedHabitDetail={setSelectedHabitDetail}
            />
          ))}
          {contextHolder}
        </Spinner>
      </Skeleton>
    </Layout.Content>
  );
};

export default HabitListContainer;
