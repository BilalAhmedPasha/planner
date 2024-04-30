import { Layout, Skeleton, message, theme } from "antd";
import HabitItem from "./HabitItem";
import { habitsSelector } from "../state/userHabits/userHabits.reducer";
import { useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import Spinner from "../../../components/Spinner";
import Loading from "../../../components/Loading";
import HabitListHeader from "./HabitListHeader";
import HabitDialogForm from "../HabitList/HabitDialogForm";

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
            />
          ))}
          {contextHolder}
        </Spinner>
      </Skeleton>
    </Layout.Content>
  );
};

export default HabitListContainer;
