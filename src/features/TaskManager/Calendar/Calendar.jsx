import {
  Layout,
  Typography,
  theme,
  Space,
  Dropdown,
  message,
  Button,
} from "antd";
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
import { fetchListsAction } from "../state/userLists/userLists.actions";
import { fetchTagsAction } from "../state/userTags/userTags.actions";
import { fetchTasksAction } from "../state/userTasks/userTasks.actions";
import { useDispatch, useSelector } from "react-redux";
import { userSelector } from "../../AppLayout/state/userSettings/userSettings.reducer";
import { listsSelector } from "../state/userLists/userLists.reducer";
import { tasksSelector } from "../state/userTasks/userTasks.reducer";
import { INBOX_LIST_COLOR } from "../../../constants/color.constants";
import { BgColorsOutlined } from "@ant-design/icons";
import { PRIORITY } from "../../../constants/sort.constants";
import { INBOX, LISTS, LOADER_SIZE } from "../../../constants/app.constants";
import { TIME_FORMAT_IN_DB } from "../../../constants/dateTime.constants";
import {
  NONE,
  priorityColorMappings,
} from "../../../constants/priority.constants";
import TaskDialogForm from "../TaskDialogForm";
import { CREATE, EDIT } from "../../../constants/formType.constants";
import Spinner from "../../../components/Spinner";
import Loading from "../../../components/Loading";
import {
  ENDLESS,
  END_BY_DATE,
  END_BY_REPEAT_COUNT,
} from "../../../constants/repeating.constants";

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
  const { tasks, isLoadingTasks } = useSelector(tasksSelector);

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

  const clickRef = useRef(null);
  useEffect(() => {
    return () => {
      window.clearTimeout(clickRef?.current);
    };
  }, []);

  const initalFormValues = useMemo(() => {
    return {
      name: "",
      list: INBOX,
      priority: NONE,
      endBy: ENDLESS,
      tags: [],
      taskDate: undefined,
      duration: [undefined, undefined],
    };
  }, []);

  const [formValues, setFormValues] = useState(initalFormValues);

  useEffect(() => {
    if (formValues.taskDate !== undefined) {
      setOpenAddTaskDialog(true);
    }
  }, [formValues]);

  const [spinner, setSpinner] = useState(false);

  const [formType, setFormType] = useState(CREATE);
  const onSelectEvent = useCallback(
    (event) => {
      setSpinner(true);
      setFormType(EDIT);
      window.clearTimeout(clickRef?.current);
      clickRef.current = window.setTimeout(() => {
        setFormValues((prevFormValues) => {
          return {
            ...initalFormValues,
            name: event.name,
            description: event.description,
            list: event.listId,
            priority: event.priority,
            tags: event.tagIds,
            taskDate: dayjs(event.taskDate),
            duration: [
              dayjs(event.startTime, TIME_FORMAT_IN_DB),
              dayjs(event.endTime, TIME_FORMAT_IN_DB),
            ],
            repeatFrequency: event.repeatFrequency,
            endBy: event.endBy,
            [END_BY_DATE]: dayjs(event.endByDate),
            [END_BY_REPEAT_COUNT]: event.endByRepeatCount,
          };
        });
        setSpinner(false);
      }, 10);
    },
    [initalFormValues]
  );

  const onSelecting = useCallback(
    (range) => {
      setFormType(CREATE);
      window.clearTimeout(clickRef?.current);
      clickRef.current = window.setTimeout(() => {
        const selectedDate = dayjs(range.start).startOf("day");
        const startTime = dayjs(range.start);
        const endTime = dayjs(range.end);
        setFormValues((prevFormValues) => {
          return {
            ...initalFormValues,
            taskDate: selectedDate,
            duration: [startTime, endTime],
          };
        });
      }, 250);
    },
    [initalFormValues]
  );

  const [messageApi] = message.useMessage();
  const [openAddTaskDialog, setOpenAddTaskDialog] = useState(false);

  return (
    <Layout.Content
      style={{
        padding: "1rem 3rem",
        background: colorBgContainer,
        height: "100vh",
      }}
    >
      <Spinner
        spinning={isLoadingTasks || spinner}
        indicator={Loading(LOADER_SIZE)}
        delay={0}
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
              <Space style={{ cursor: "pointer" }}>
                <Button type="text" size="small" icon={<BgColorsOutlined />}>
                  {"Color by"}
                </Button>
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
            longPressThreshold={20}
            onSelectEvent={onSelectEvent}
          />
          {openAddTaskDialog && (
            <TaskDialogForm
              user={user}
              messageApi={messageApi}
              openDialog={openAddTaskDialog}
              setOpenDialog={setOpenAddTaskDialog}
              formType={formType}
              formValues={formValues}
              disableDateSelection={formType === CREATE}
              disableTimeSelection={formType === CREATE}
            />
          )}
        </div>
      </Spinner>
    </Layout.Content>
  );
};

export default React.memo(CalendarView);
