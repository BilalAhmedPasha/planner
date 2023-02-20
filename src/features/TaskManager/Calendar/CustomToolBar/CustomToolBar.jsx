import "react-big-calendar/lib/css/react-big-calendar.css";
import { Navigate } from "react-big-calendar";
import { Button, Segmented, Typography } from "antd";
import { DAY, WEEK } from "../../../../constants/calendar.constants";
import { CaretLeftOutlined, CaretRightOutlined } from "@ant-design/icons";
import { useCallback, useEffect, useMemo } from "react";
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

  const buttonOptions = useMemo(() => {
    return [
      {
        label: WEEK,
        value: WEEK,
        disabled: disableWeekView({ currentWidth: screenSize.width })
          ? true
          : false,
      },
      {
        label: DAY,
        value: DAY,
        disabled: false,
      },
    ];
  }, [screenSize]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        marginBottom: "1rem",
        alignItems: "center",
      }}
    >
      <Typography.Text strong style={{ fontSize: "1.25rem" }}>
        {props.label}
      </Typography.Text>
      <div>
        <Button
          type="text"
          onClick={goToBack}
          icon={<CaretLeftOutlined />}
        />
        <Button type="text" onClick={goToToday}>
          {"Today"}
        </Button>
        <Button type="text" onClick={goToNext} icon={<CaretRightOutlined />} />
        <Segmented
          defaultValue={
            disableWeekView({ currentWidth: screenSize.width }) ? DAY : WEEK
          }
          options={buttonOptions}
          onChange={handleViewChange}
        />
      </div>
    </div>
  );
};

export default CustomToolbar;
