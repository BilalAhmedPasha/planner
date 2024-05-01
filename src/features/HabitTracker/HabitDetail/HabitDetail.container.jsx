import useWindowSize from "../../../hooks/useWindowSize";
import { detailsToDrawer, navToDrawer } from "../../../utils/screen.utils";
import HabitCalendar from "./HabitCalendar/HabitCalendar";
import NoHabitSelected from "./NoHabitSelected";
import { Button, Drawer, Layout, Typography, theme } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const HabitDetailContainer = ({
  user,
  selectedHabitDetail,
  setSelectedHabitDetail,
  isHabitDetailsDrawerCollapsed,
  setIsHabitDetailsDrawerCollapsed,
}) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const navigateTo = useNavigate();

  const screenSize = useWindowSize();

  return detailsToDrawer({ currentWidth: screenSize.width }) ? (
    <Drawer
      title={
        <Typography.Text
          style={{ whiteSpace: "nowrap", overflowX: "auto" }}
          ellipsis
        >
          {selectedHabitDetail?.name}
        </Typography.Text>
      }
      placement={"right"}
      closable={false}
      open={!isHabitDetailsDrawerCollapsed}
      width={navToDrawer({ currentWidth: screenSize.width }) ? "90vw" : "60vw"}
      destroyOnClose={true}
      extra={
        <Button
          type="text"
          icon={<CloseOutlined />}
          onClick={() => {
            setIsHabitDetailsDrawerCollapsed(true);
            setSelectedHabitDetail(null);
            navigateTo(-1);
          }}
        />
      }
      styles={{
        header: { height: "2.5rem", padding: "0.5rem 1rem" },
        body: { padding: "0rem", overflow: "auto", display: "flex", minWidth:"10rem" },
      }}
    >
      {selectedHabitDetail ? (
        <HabitCalendar
          habit={selectedHabitDetail}
          user={user}
          isInDrawer={true}
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
        <HabitCalendar habit={selectedHabitDetail} user={user} />
      ) : (
        <NoHabitSelected />
      )}
    </Layout.Content>
  );
};

export default HabitDetailContainer;
