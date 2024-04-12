import { Typography, Space, Dropdown, Button } from "antd";
import { Calendar, dayjsLocalizer, Views } from "react-big-calendar";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import CustomToolbar from "./CustomToolBar/CustomToolBar";
import { useSelector } from "react-redux";
import { listsSelector } from "../state/userLists/userLists.reducer";
import { tasksSelector } from "../state/userTasks/userTasks.reducer";
import { INBOX_LIST_COLOR } from "../../../constants/color.constants";
import { BgColorsOutlined } from "@ant-design/icons";
import { PRIORITY } from "../../../constants/sort.constants";
import { LISTS, LOADER_SIZE } from "../../../constants/app.constants";
import { TIME_FORMAT_IN_DB } from "../../../constants/dateTime.constants";
import { priorityColorMappings } from "../../../constants/priority.constants";
import { CREATE, EDIT } from "../../../constants/formType.constants";
import {
  END_BY_DATE,
  END_BY_REPEAT_COUNT,
} from "../../../constants/repeating.constants";
import { disableWeekView } from "../../../utils/screen.utils";
import useWindowSize from "../../../hooks/useWindowSize";
import Spinner from "../../../components/Spinner";
import Loading from "../../../components/Loading";
import styled from "styled-components";

dayjs.extend(timezone);

const CalendarWrapper = styled.div`
  height: 92vh;
  overflow-y: auto;
  .rbc-calendar {
    color: ${(props) => (props.userTheme ? "#fff" : "#000")};
  }

  .rbc-current-time-indicator {
    background-color: rgba(255, 87, 87, 1);
    height: 0.2rem;
  }

  .rbc-today {
    color: ${(props) => (props.userTheme ? "#fff" : "#000")};
    background-color: ${(props) =>
      props.userTheme
        ? "rgba(39, 192, 255, 0.075)"
        : "rgba(39, 192, 255, 0.15)"};
  }

  .rbc-header {
    border-bottom: 0.75px solid
      ${(props) =>
        props.userTheme ? "rgba(255, 255, 255, 0.2)" : "rgba(66, 66, 66, 0.5)"};
  }

  .rbc-header + .rbc-header {
    border-left: 0.75px solid
      ${(props) =>
        props.userTheme ? "rgba(255, 255, 255, 0.2)" : "rgba(66, 66, 66, 0.5)"};
  }

  .rbc-day-bg + .rbc-day-bg {
    border-left: 0.75px solid
      ${(props) =>
        props.userTheme ? "rgba(255, 255, 255, 0.2)" : "rgba(66, 66, 66, 0.5)"};
  }

  .rbc-timeslot-group {
    border-bottom: 0.75px solid
      ${(props) =>
        props.userTheme ? "rgba(255, 255, 255, 0.2)" : "rgba(66, 66, 66, 0.5)"};
  }

  .rbc-time-view {
    border: 0.75px solid
      ${(props) =>
        props.userTheme ? "rgba(255, 255, 255, 0.2)" : "rgba(66, 66, 66, 0.5)"};
  }

  .rbc-time-content {
    border-top: 0.75px solid
      ${(props) =>
        props.userTheme ? "rgba(255, 255, 255, 0.2)" : "rgba(66, 66, 66, 0.5)"};
  }

  .rbc-time-content > * + * > * {
    border-left: 0.75px solid
      ${(props) =>
        props.userTheme ? "rgba(255, 255, 255, 0.2)" : "rgba(66, 66, 66, 0.5)"};
  }

  .rbc-time-header-content {
    border-left: 0.75px solid
      ${(props) =>
        props.userTheme ? "rgba(255, 255, 255, 0.2)" : "rgba(66, 66, 66, 0.5)"};
  }

  .rbc-day-slot .rbc-time-slot {
    border-top: 0px solid
      ${(props) =>
        props.userTheme ? "rgba(255, 255, 255, 0.2)" : "rgba(66, 66, 66, 0.5)"};
  }
`;

const CalendarComponent = ({
  userTheme,
  setFormType,
  setTaskDetails,
  setFormValues,
  initalFormValues,
}) => {
  const { lists } = useSelector(listsSelector);
  const { tasks, isLoadingTasks } = useSelector(tasksSelector);
  const localizer = useMemo(() => dayjsLocalizer(dayjs), []);

  const taskEvents = useMemo(() => {
    const taskEventList = [];
    for (let i = 0; i < tasks.length; i++) {
      if (!tasks[i].isDeleted && tasks[i].taskDate !== null) {
        if (tasks[i].isAllDay) {
          taskEventList.push({
            ...tasks[i],
            title: tasks[i].name,
            start: dayjs(tasks[i].taskDate).toDate(),
            end: dayjs(tasks[i].taskDate).toDate(),
            allDay: true,
          });
        } else {
          const startTimeStamp = tasks[i].taskDate.replace(
            "00:00:00",
            tasks[i].startTime
          );
          const endTimeStamp = tasks[i].taskDate.replace(
            "00:00:00",
            tasks[i].endTime
          );

          taskEventList.push({
            ...tasks[i],
            title: tasks[i].name,
            start: dayjs(startTimeStamp).toDate(),
            end: dayjs(endTimeStamp).toDate(),
            allDay: false,
          });
        }
      }
    }
    return taskEventList;
  }, [tasks]);

  const { views } = useMemo(
    () => ({
      views: [Views.WEEK, Views.DAY],
    }),
    []
  );

  const slotGroupPropGetter = useCallback(
    () => ({
      style: {
        minHeight: 80,
      },
    }),
    []
  );

  const formats = {
    eventTimeRangeFormat: () => {
      return "";
    },
  };

  const [colorBy, setColorBy] = useState(LISTS);

  const colorByMenuItemList = [
    {
      label: "List",
      key: LISTS,
    },
    {
      label: "Priority",
      key: PRIORITY,
    },
  ];
  const handleColorByMenuClick = (e) => {
    setColorBy(e.key);
  };

  const eventPropGetter = useCallback(
    (event) => {
      let getListColor;
      if (colorBy === LISTS) {
        getListColor =
          lists.find((each) => each.id === event.listId)?.color ||
          INBOX_LIST_COLOR;
        return {
          style: {
            background: getListColor,
            border: `0.5px solid ${getListColor}`,
            opacity: event.isCompleted || event.isWontDo ? 0.5 : 1,
            padding: "3px",
          },
        };
      } else if (colorBy === PRIORITY) {
        return {
          style: {
            background: priorityColorMappings[event.priority],
            border: `0.5px solid ${priorityColorMappings[event.priority]}`,
            opacity: event.isCompleted || event.isWontDo ? 0.5 : 1,
            padding: "3px",
          },
        };
      }
    },
    [lists, colorBy]
  );

  const clickRef = useRef(null);

  useEffect(() => {
    return () => {
      window.clearTimeout(clickRef?.current);
    };
  }, []);

  const [spinner, setSpinner] = useState(false);

  const onSelectEvent = useCallback(
    (event) => {
      setSpinner(true);
      setFormType(EDIT);
      setTaskDetails(event);
      window.clearTimeout(clickRef?.current);
      clickRef.current = window.setTimeout(() => {
        setFormValues(() => {
          return {
            ...initalFormValues,
            name: event.name,
            description: event.description,
            listId: event.listId,
            priority: event.priority,
            tags: event.tagIds,
            taskDate: dayjs(event.taskDate),
            duration:
              event.startTime && event.endTime
                ? [
                    dayjs(event.startTime, TIME_FORMAT_IN_DB),
                    dayjs(event.endTime, TIME_FORMAT_IN_DB),
                  ]
                : [undefined, undefined],
            repeatFrequency: event.repeatFrequency,
            endBy: event.endBy,
            [END_BY_DATE]: event.endByDate ? dayjs(event.endByDate) : undefined,
            [END_BY_REPEAT_COUNT]: event.endByRepeatCount,
          };
        });
      }, 0);
      setSpinner(false);
    },
    [initalFormValues, setFormType, setTaskDetails, setFormValues]
  );

  const onSelecting = useCallback(
    (range) => {
      setFormType(CREATE);
      window.clearTimeout(clickRef?.current);
      clickRef.current = window.setTimeout(() => {
        const selectedDate = dayjs(range.start).startOf("day");
        const startTime = dayjs(range.start);
        const endTime = dayjs(range.end);
        setFormValues(() => {
          return {
            ...initalFormValues,
            taskDate: selectedDate,
            duration: [startTime, endTime],
          };
        });
      }, 60);
    },
    [initalFormValues, setFormType, setFormValues]
  );

  const screenSize = useWindowSize();
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          height: "5vh",
          marginBottom: "0.5vh",
        }}
      >
        <Typography.Text
          style={{
            fontWeight: "bold",
            fontSize: "24px",
            whiteSpace: "nowrap",
            overflowX: "auto",
          }}
        >
          {"Calendar"}
        </Typography.Text>
        <Space>
          <Dropdown
            menu={{
              items: colorByMenuItemList,
              selectable: true,
              defaultSelectedKeys: [LISTS],
              onClick: handleColorByMenuClick,
            }}
            trigger={["click"]}
            placement="bottomLeft"
          >
            <Space style={{ cursor: "pointer" }}>
              <Button type="text" icon={<BgColorsOutlined />}>
                {"Color by"}
              </Button>
            </Space>
          </Dropdown>
        </Space>
      </div>
      <Spinner
        spinning={isLoadingTasks || spinner}
        indicator={Loading(LOADER_SIZE)}
        delay={0}
      >
        <CalendarWrapper userTheme={userTheme}>
          <Calendar
            events={taskEvents}
            localizer={localizer}
            defaultView={
              disableWeekView({ currentWidth: screenSize.width })
                ? Views.DAY
                : Views.WEEK
            }
            views={views}
            components={{
              toolbar: CustomToolbar,
            }}
            timeslots={4}
            step={15}
            slotGroupPropGetter={slotGroupPropGetter}
            min={new Date(0, 0, 0, 0, 0, 0)}
            max={new Date(0, 0, 0, 23, 59, 59)}
            scrollToTime={new Date(0, 0, 0, 9, 0, 0)}
            eventPropGetter={eventPropGetter}
            dayLayoutAlgorithm="no-overlap"
            formats={formats}
            selectable={true}
            onSelecting={onSelecting}
            longPressThreshold={250}
            onSelectEvent={onSelectEvent}
          />
        </CalendarWrapper>
      </Spinner>
    </>
  );
};

export default React.memo(CalendarComponent);
