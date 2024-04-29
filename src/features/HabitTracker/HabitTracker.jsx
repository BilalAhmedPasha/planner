import { Layout, Typography, message, theme } from "antd";
import HabitList from "./HabitList/HabitList";
import HabitCalendar from "./HabitCalendar/HabitCalendar";
import { useDispatch, useSelector } from "react-redux";
import { userSelector } from "../AppLayout/state/userSettings/userSettings.reducer";
import { fetchHabitsAction } from "./state/userHabits/userHabits.actions";
import { useEffect, useState } from "react";
import HabitListContainer from "./HabitList/HabitList";

const HabitTracker = ({ user }) => {
  const dispatch = useDispatch();
  const userSetting = useSelector(userSelector);

  useEffect(() => {
    if (user && user.uid !== userSetting.id) {
      dispatch(fetchHabitsAction(user.uid));
    }
  }, [userSetting, dispatch, user]);

  const [selectedHabitDetails, setSelectedHabitDetails] = useState([]);

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <>
      <HabitListContainer
        user={user}
        selectedHabitDetails={selectedHabitDetails}
        setSelectedHabitDetails={setSelectedHabitDetails}
      />
      {/* <Layout.Content
        style={{
          marginRight: "0.1rem",
          padding: "0.25rem 0.75rem",
          background: colorBgContainer,
          height: "100vh",
        }}
      >
        <Typography.Text
          style={{
            fontWeight: "bold",
            fontSize: "24px",
          }}
        >
          {"Habits"}
        </Typography.Text>
        <HabitList />
      </Layout.Content> */}
      <Layout.Content
        style={{
          marginLeft: "0.1rem",
          padding: "0.25rem 0.75rem",
          background: colorBgContainer,
          height: "100vh",
          overflow: "auto",
        }}
      >
        <HabitCalendar />
      </Layout.Content>
    </>
  );
};

export default HabitTracker;
