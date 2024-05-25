import useWindowSize from "../../../hooks/useWindowSize";
import { detailsToDrawer, navToDrawer } from "../../../utils/screen.utils";
import HabitCalendar from "./HabitCalendar/HabitCalendar";
import NoHabitSelected from "./NoHabitSelected";
import { Button, Drawer, Layout, Typography, theme } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";

const HabitDetailContainer = ({
  user,
  selectedHabitDetail,
  setSelectedHabitDetail,
  isHabitDetailsDrawerCollapsed,
  setIsHabitDetailsDrawerCollapsed,
  habitHistory,
  setHabitHistory,
}) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const currentURL = useLocation();
  const navigateTo = useNavigate();
  const screenSize = useWindowSize();

  return detailsToDrawer({ currentWidth: screenSize.width }) ? (
    <Drawer
      title={<Typography.Text>{selectedHabitDetail?.name}</Typography.Text>}
      placement={"right"}
      closable={false}
      open={!isHabitDetailsDrawerCollapsed}
      width={navToDrawer({ currentWidth: screenSize.width }) ? "90vw" : "60vw"}
      destroyOnClose={false}
      extra={
        <Button
          icon={<CloseOutlined />}
          onClick={() => {
            setIsHabitDetailsDrawerCollapsed(true);
            setSelectedHabitDetail(null);
            const url = currentURL.pathname.split("/").slice(0, -1).join("/");
            navigateTo(url);
          }}
        />
      }
      styles={{
        header: {
          display: "flex",
          whiteSpace: "nowrap",
          overflow: "hidden",
          padding: "1.5rem 1rem",
        },
        body: { padding: "0rem 1rem", overflow: "auto" },
      }}
    >
      {selectedHabitDetail ? (
        <HabitCalendar
          habit={selectedHabitDetail}
          user={user}
          isInDrawer={true}
          habitHistory={habitHistory}
          setHabitHistory={setHabitHistory}
        />
      ) : (
        <NoHabitSelected />
      )}
    </Drawer>
  ) : (
    <Layout.Content
      style={{
        marginLeft: "0.1rem",
        overflow: "auto",
        background: colorBgContainer,
      }}
    >
      {selectedHabitDetail ? (
        <HabitCalendar
          habit={selectedHabitDetail}
          user={user}
          habitHistory={habitHistory}
          setHabitHistory={setHabitHistory}
        />
      ) : (
        <NoHabitSelected />
      )}
    </Layout.Content>
  );
};

export default HabitDetailContainer;
