import { Button, Space, Typography, theme } from "antd";
import { useSelector } from "react-redux";
import { habitsSelector } from "../state/userHabits/userHabits.reducer.js";
import { PlusOutlined } from "@ant-design/icons";

const HabitListHeader = ({ handleAddHabit }) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const { totalHabits } = useSelector(habitsSelector);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0.5rem",
        top: 0,
        zIndex: 1,
        background: colorBgContainer,
        position: "sticky",
      }}
    >
      <Space size="small" style={{ alignItems: "center" }}>
        <Typography.Text
          style={{
            fontWeight: "bold",
            fontSize: "20px",
            whiteSpace: "nowrap",
            overflowX: "auto",
          }}
        >
          {"Habits"}
        </Typography.Text>
        <Typography.Text
          type="secondary"
          style={{ whiteSpace: "nowrap", overflowX: "auto" }}
        >
          {totalHabits}
        </Typography.Text>
      </Space>
      <Button type="dashed" icon={<PlusOutlined />} onClick={handleAddHabit} />
    </div>
  );
};

export default HabitListHeader;
