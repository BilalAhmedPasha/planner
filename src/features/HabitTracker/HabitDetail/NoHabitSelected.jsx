import { Typography } from "antd";
import noSelection from "../../../assets/noSelection.png";

const NoHabitSelected = () => {
  return (
    <div
      style={{
        textAlign: "center",
        paddingTop: "40%",
      }}
    >
      <div>
        <img
          src={noSelection}
          alt="DetailsNotFound"
          style={{
            width: "5rem",
          }}
        />
      </div>
      <Typography.Text style={{ fontSize: "1rem" }} type="secondary">
        {"Click on a habit to view details"}
      </Typography.Text>
    </div>
  );
};

export default NoHabitSelected;
