import { Typography } from "antd";
import {
  MdOutlineCheckCircle,
  MdOutlineCancel,
  MdOutlinePending,
} from "react-icons/md";

const HabitHistory = ({ habitHistory, colorSuccess, colorError }) => {
  return (
    <div
      style={{
        display: "flex",
        textAlign: "center",
        justifyContent: "space-between",
      }}
    >
      <span style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
        <MdOutlineCheckCircle
          style={{ fontSize: "1.25rem", color: colorSuccess }}
        />
        <Typography.Text
          style={{
            fontSize: "1rem",
          }}
          ellipsis={true}
        >
          {`Achieved ${habitHistory.achieved}`}
        </Typography.Text>
      </span>
      <span style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
        <MdOutlineCancel style={{ fontSize: "1.25rem", color: colorError }} />
        <Typography.Text
          style={{
            fontSize: "1rem",
          }}
          ellipsis={true}
        >
          {`Unachieved ${habitHistory.unachieved}`}
        </Typography.Text>
      </span>
      <span style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
        <MdOutlinePending style={{ fontSize: "1.25rem" }} />
        <Typography.Text
          style={{
            fontSize: "1rem",
          }}
          ellipsis={true}
        >
          {`Pending ${habitHistory.pending}`}
        </Typography.Text>
      </span>
    </div>
  );
};

export default HabitHistory;
