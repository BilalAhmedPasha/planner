import { Typography } from "antd";
import noSelection from "../../../assets/noSelection.png";
import multiSelection from "../../../assets/multiSelection.png";
import "./css/NotTaskSelected.css"

const NotTaskSelected = ({ selectedTaskDetails }) => {
  return (
      <div className="wrapper__div">
          <div>
              <img
                  src={
                      selectedTaskDetails.length > 1
                          ? multiSelection
                          : noSelection
                  }
                  alt="DetailsNotFound"
                  className="image__detail"
              />
          </div>
          <Typography.Text className="typography__text" type="secondary">
              {selectedTaskDetails.length > 1
                  ? "Select only a single task to view details"
                  : "Click on a task to view details. To multi select tasks hold shift key."}
          </Typography.Text>
      </div>
  );
};

export default NotTaskSelected;
