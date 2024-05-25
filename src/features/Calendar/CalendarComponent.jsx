import { Typography, Space, Dropdown, Button } from "antd";
import { Calendar, dayjsLocalizer, Views } from "react-big-calendar";
import dayjs from "../../utils/dateTime.utils";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Toolbar from "./Custom/ToolBar";
import { useSelector } from "react-redux";
import { listsSelector } from "../TaskManager/state/userLists/userLists.reducer";
import { tasksSelector } from "../TaskManager/state/userTasks/userTasks.reducer";
import {
  DEFAULT_TAG_COLOR,
  INBOX_LIST_COLOR,
} from "../../constants/color.constants";
import { BgColorsOutlined } from "@ant-design/icons";
import { PRIORITY } from "../../constants/sort.constants";
import { LISTS, TAGS } from "../../constants/app.constants";
import { DAY, TIME_FORMAT_IN_DB } from "../../constants/dateTime.constants";
import { priorityColorMappings } from "../../constants/priority.constants";
import { CREATE, EDIT } from "../../constants/formType.constants";
import {
  END_BY_DATE,
  END_BY_REPEAT_COUNT,
} from "../../constants/repeating.constants";
import { disableWeekView, isOnVerySmallScreen } from "../../utils/screen.utils";
import useWindowSize from "../../hooks/useWindowSize";
import Spinner from "../../components/Spinner";
import Loading from "../../components/Loading";
import { tagsSelector } from "../TaskManager/state/userTags/userTags.reducer";
import { averageColor } from "../../utils/calendar.utils";
import CalendarEvent from "./Custom/CalendarEvent";
import { calculateCalendarEvents } from "./CalendarUtils";
import CalendarWrapper from "./Custom/CalendarWrapper";

const setStartAndEndDate = ({ event, setViewStartDate, setViewEndDate }) => {
  setViewStartDate(new Date(event[0]));
  setViewEndDate(new Date(event[event.length - 1]));
};

const CalendarComponent = ({
  user,
  userTheme,
  setFormType,
  setTaskDetails,
  setFormValues,
  setOpenAddTaskDialog,
  initalFormValues,
}) => {
  const { lists } = useSelector(listsSelector);
  const { tags } = useSelector(tagsSelector);
  const { tasks, isLoadingTasks } = useSelector(tasksSelector);
  const localizer = useMemo(() => dayjsLocalizer(dayjs), []);

  const [viewStartDate, setViewStartDate] = useState(
    new Date(dayjs(new Date()).startOf("week"))
  );

  const [viewEndDate, setViewEndDate] = useState(
    new Date(dayjs(new Date()).endOf("week"))
  );

  const taskEvents = useMemo(
    () => calculateCalendarEvents({ tasks, viewStartDate, viewEndDate }),
    [tasks, viewStartDate, viewEndDate]
  );

  const { views } = useMemo(
    () => ({
      views: [Views.WEEK, Views.DAY],
    }),
    []
  );

  const slotGroupPropGetter = () => ({
    style: {
      minHeight: 80,
    },
  });

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
      label: "Tags",
      key: TAGS,
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
      if (colorBy === LISTS) {
        const getListColor =
          lists.find((each) => each.id === event.listId)?.color ||
          INBOX_LIST_COLOR;
        return {
          style: {
            background: getListColor,
            border: `0.5px solid ${getListColor}`,
            opacity: event.isCompleted || event.isWontDo ? 0.5 : 1,
            padding: "3px",
            overflow: "scroll",
          },
        };
      } else if (colorBy === TAGS) {
        if (event.tagIds.length === 0) {
          return {
            style: {
              background: DEFAULT_TAG_COLOR,
              border: `0.5px solid ${DEFAULT_TAG_COLOR}`,
              opacity: event.isCompleted || event.isWontDo ? 0.5 : 1,
              padding: "3px",
              overflow: "scroll",
            },
          };
        } else {
          const colorMix = averageColor(
            tags
              .filter((tag) => event.tagIds.includes(tag.id))
              .map((tag) => tag.color)
          );
          return {
            style: {
              background: colorMix,
              border: `0.5px solid ${colorMix}`,
              opacity: event.isCompleted || event.isWontDo ? 0.5 : 1,
              padding: "3px",
              overflow: "scroll",
            },
          };
        }
      } else if (colorBy === PRIORITY) {
        return {
          style: {
            background: priorityColorMappings[event.priority],
            border: `0.5px solid ${priorityColorMappings[event.priority]}`,
            opacity: event.isCompleted || event.isWontDo ? 0.5 : 1,
            padding: "3px",
            overflow: "scroll",
          },
        };
      }
    },
    [lists, tags, colorBy]
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
      setFormValues({
        ...initalFormValues,
        name: event.name,
        description: event.description,
        listId: event.listId,
        priority: event.priority,
        tagIds: event.tagIds,
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
      });
      setOpenAddTaskDialog(true);
      setSpinner(false);
    },
    [initalFormValues]
  );

  const onSelectSlot = (range) => {
    setSpinner(true);
    setFormType(CREATE);
    const isAllDay = range.end - range.start === 86400000;
    setFormValues({
      ...initalFormValues,
      taskDate: dayjs(range.start).startOf(DAY),
      duration: isAllDay
        ? [undefined, undefined]
        : [dayjs(range.start), dayjs(range.end)],
      isAllDay: isAllDay,
    });
    setOpenAddTaskDialog(true);
    setSpinner(false);
  };

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
        indicator={Loading(0)}
        delay={0}
      >
        <CalendarWrapper
          userTheme={userTheme}
          isOnVerySmallScreen={isOnVerySmallScreen({
            currentWidth: screenSize.width,
          })}
        >
          <Calendar
            events={taskEvents}
            onRangeChange={(event) =>
              setStartAndEndDate({
                event: event,
                setViewStartDate,
                setViewEndDate,
              })
            }
            localizer={localizer}
            defaultView={
              disableWeekView({ currentWidth: screenSize.width })
                ? Views.DAY
                : Views.WEEK
            }
            views={views}
            components={{
              toolbar: Toolbar,
              event: ({ event }) => {
                return <CalendarEvent event={event} user={user} />;
              },
            }}
            timeslots={6}
            step={10}
            slotGroupPropGetter={slotGroupPropGetter}
            min={new Date(0, 0, 0, 0, 0, 0)}
            max={new Date(0, 0, 0, 23, 59, 59)}
            scrollToTime={new Date(0, 0, 0, new Date().getHours(), 0, 0)}
            eventPropGetter={eventPropGetter}
            dayLayoutAlgorithm="no-overlap"
            formats={formats}
            selectable={true}
            onSelectEvent={onSelectEvent}
            onSelectSlot={onSelectSlot}
            longPressThreshold={5}
          />
        </CalendarWrapper>
      </Spinner>
    </>
  );
};

export default React.memo(CalendarComponent);
