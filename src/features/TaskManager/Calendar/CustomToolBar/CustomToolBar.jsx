import "react-big-calendar/lib/css/react-big-calendar.css";
import { Navigate } from "react-big-calendar";
import { Button, Segmented, Typography } from "antd";
import { DAY, WEEK } from "../../../../constants/calendar.constants";
import { CaretLeftOutlined, CaretRightOutlined } from "@ant-design/icons";
import { useCallback, useEffect } from "react";
import { disableWeekView } from "../../../../utils/screen.utils";
import useWindowSize from "../../../../hooks/useWindowSize";

const CustomToolbar = (props) => {
  const goToDayView = useCallback(() => {
    props.onView("day");
  }, [props]);

  const goToWeekView = useCallback(() => {
    props.onView("week");
  }, [props]);

  const goToBack = useCallback(() => {
    props.onNavigate(Navigate.PREVIOUS);
  }, [props]);

  const goToNext = useCallback(() => {
    props.onNavigate(Navigate.NEXT);
  }, [props]);

  const goToToday = useCallback(() => {
    props.onNavigate(Navigate.TODAY);
  }, [props]);

  const handleViewChange = (e) => {
    if (e === WEEK) goToWeekView();
    else goToDayView();
  };

  const screenSize = useWindowSize();

  useEffect(() => {
    if (disableWeekView({ currentWidth: screenSize.width })) {
      goToDayView();
    }
  }, [screenSize, goToDayView]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        marginBottom: "0.5vh",
        alignItems: "center",
        overflow: "auto",
        whiteSpace: "nowrap",
      }}
    >
      <Typography.Text
        strong
        style={{
          fontSize: "1.25rem",
        }}
      >
        {props.label}
      </Typography.Text>
      <div>
        <Button type="text" onClick={goToBack} icon={<CaretLeftOutlined />} />
        <Button type="text" onClick={goToToday} size="small">
          {"Today"}
        </Button>
        <Button type="text" onClick={goToNext} icon={<CaretRightOutlined />} />
        {disableWeekView({ currentWidth: screenSize.width }) ? (
          <Segmented
            defaultValue={DAY}
            options={[
              {
                label: DAY,
                value: DAY,
              },
            ]}
            onChange={handleViewChange}
          />
        ) : (
          <Segmented
            defaultValue={WEEK}
            options={[
              {
                label: WEEK,
                value: WEEK,
              },
              {
                label: DAY,
                value: DAY,
              },
            ]}
            onChange={handleViewChange}
          />
        )}
      </div>
    </div>
  );
};

export default CustomToolbar;
