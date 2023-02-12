import "react-big-calendar/lib/css/react-big-calendar.css";
import { Navigate } from "react-big-calendar";
import { Button, Segmented, Typography } from "antd";
import { DAY, WEEK } from "../../../../constants/calendar.constants";
import { CaretLeftOutlined, CaretRightOutlined } from "@ant-design/icons";

const CustomToolbar = (props) => {
  const goToDayView = () => {
    props.onView("day");
  };
  const goToWeekView = () => {
    props.onView("week");
  };

  const goToBack = () => {
    props.onNavigate(Navigate.PREVIOUS);
  };

  const goToNext = () => {
    props.onNavigate(Navigate.NEXT);
  };

  const goToToday = () => {
    props.onNavigate(Navigate.TODAY);
  };

  const handleViewChange = (e) => {
    if (e === WEEK) goToWeekView();
    else goToDayView();
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        marginBottom: "1rem",
        alignItems: "center",
      }}
    >
      <Segmented options={[WEEK, DAY]} onChange={handleViewChange} />
      <Typography.Text strong style={{ fontSize: "1.25rem" }}>
        {props.label}
      </Typography.Text>
      <div>
        <Button
          type="text"
          size="small"
          onClick={goToBack}
          icon={<CaretLeftOutlined />}
        />
        <Button type="text" size="small" onClick={goToToday}>
          {"Today"}
        </Button>
        <Button
          type="text"
          size="small"
          onClick={goToNext}
          icon={<CaretRightOutlined />}
        />
      </div>
    </div>
  );
};

export default CustomToolbar;
