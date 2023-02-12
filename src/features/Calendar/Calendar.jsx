import { Layout, Typography, theme, Space, Dropdown } from "antd";
import { Calendar, dayjsLocalizer, Views } from "react-big-calendar";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import CustomToolbar from "./CustomToolBar/CustomToolBar";
import { fetchListsAction } from "../TaskManager/state/userLists/userLists.actions";
import { fetchTagsAction } from "../TaskManager/state/userTags/userTags.actions";
import { fetchTasksAction } from "../TaskManager/state/userTasks/userTasks.actions";
import { useDispatch, useSelector } from "react-redux";
import { userSelector } from "../AppLayout/state/userSettings/userSettings.reducer";
import { listsSelector } from "../TaskManager/state/userLists/userLists.reducer";
import { tasksSelector } from "../TaskManager/state/userTasks/userTasks.reducer";
import { INBOX_LIST_COLOR } from "../../constants/color.constants";
import { BgColorsOutlined } from "@ant-design/icons";
import { PRIORITY } from "../../constants/sort.constants";
import { LISTS } from "../../constants/app.constants";
import { priorityColorMappings } from "../../constants/priority.constants";

dayjs.extend(timezone);

const CalendarView = ({ user }) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const dispatch = useDispatch();
  const userSetting = useSelector(userSelector);

  useEffect(() => {
    if (user.uid !== userSetting.id) {
      dispatch(fetchListsAction(user.uid));
      dispatch(fetchTagsAction(user.uid));
      dispatch(fetchTasksAction(user.uid));
    }
  }, [userSetting, dispatch, user.uid]);

  const { lists } = useSelector(listsSelector);
  const { tasks } = useSelector(tasksSelector);

  const localizer = useMemo(() => dayjsLocalizer(dayjs), []);

  const taskEvents = useMemo(() => {
    const taskEventList = [];
    for (let i = 0; i < tasks.length; i++) {
      if (!tasks[i].isDeleted) {
        if (tasks[i].isAllDay) {
          taskEventList.push({
            title: tasks[i].name,
            start: dayjs(tasks[i].taskDate).toDate(),
            end: dayjs(tasks[i].taskDate).toDate(),
            allDay: true,
            ...tasks[i],
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
            title: tasks[i].name,
            start: dayjs(startTimeStamp).toDate(),
            end: dayjs(endTimeStamp).toDate(),
            allDay: false,
            ...tasks[i],
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

  return (
    <Layout.Content
      style={{
        padding: "1rem 3rem",
        background: colorBgContainer,
        height: "100vh",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography.Text
          style={{
            fontWeight: "bold",
            fontSize: "24px",
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
            <Space>
              <Typography.Text>{"Color by"}</Typography.Text>
              <BgColorsOutlined style={{ fontSize: "16px" }} />
            </Space>
          </Dropdown>
        </Space>
      </div>
      <div style={{ height: "85vh", margin: "1rem 0rem" }}>
        <Calendar
          events={taskEvents}
          localizer={localizer}
          defaultView={Views.WEEK}
          views={views}
          components={{
            toolbar: CustomToolbar,
          }}
          timeslots={2}
          step={30}
          slotGroupPropGetter={slotGroupPropGetter}
          min={new Date(0, 0, 0, 0, 0, 0)}
          max={new Date(0, 0, 0, 23, 59, 59)}
          scrollToTime={new Date(0, 0, 0, 9, 0, 0)}
          eventPropGetter={eventPropGetter}
          dayLayoutAlgorithm="no-overlap"
          formats={formats}
        />
      </div>
    </Layout.Content>
  );
};

export default React.memo(CalendarView);
