import { Button, Space, Typography, theme } from "antd";
import { useSelector } from "react-redux";
import { habitsSelector } from "../state/userHabits/userHabits.reducer.js";
import { PlusOutlined } from "@ant-design/icons";
import { CREATE } from "../../../constants/formType.constants.js";
import { TIME_ZONE } from "../../../constants/dateTime.constants.js";
import {
  DEFAULT_REPEAT_CRITERIA,
  REPEAT_DAYS,
} from "../../../constants/habits.constants.js";
import dayjs from "../../../utils/dateTime.utils.js";

const HabitListHeader = ({ handleOpenHabitDialog, setFormConfig }) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const { totalHabits, isLoadingHabits } = useSelector(habitsSelector);

  const handleAddHabit = () => {
    setFormConfig({
      mode: CREATE,
      values: {
        name: "",
        startDate: dayjs.utc().tz(TIME_ZONE),
        frequency: REPEAT_DAYS,
        repeatCriteria: DEFAULT_REPEAT_CRITERIA,
      },
    });
    handleOpenHabitDialog();
  };

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
      <Button
        type="dashed"
        icon={<PlusOutlined />}
        onClick={handleAddHabit}
        disabled={isLoadingHabits}
      />
    </div>
  );
};

export default HabitListHeader;
