import { Typography } from "antd";
import noSelection from "../../../assets/noSelection.png";
import multiSelection from "../../../assets/multiSelection.png";

const NotTaskSelected = ({ selectedTaskDetails }) => {
  return (
    <div
      style={{
        textAlign: "center",
        paddingTop: "40%",
      }}
    >
      <div>
        <img
          src={selectedTaskDetails.length > 1 ? multiSelection : noSelection}
          alt="DetailsNotFound"
          style={{
            width: "5rem",
          }}
        />
      </div>
      <Typography.Text style={{ fontSize: "1rem" }} type="secondary">
        {selectedTaskDetails.length > 1
          ? "Select only a single task to view details"
          : "Click on a task to view details"}
      </Typography.Text>
    </div>
  );
};

export default NotTaskSelected;
