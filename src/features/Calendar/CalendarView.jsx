import { Layout, theme, message } from "antd";
import { useEffect,  useState } from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useDispatch, useSelector } from "react-redux";
import { INBOX } from "../../constants/app.constants";
import { NONE } from "../../constants/priority.constants";
import TaskDialogForm from "../TaskManager/ListView/DialogForm";
import { CREATE } from "../../constants/formType.constants";
import { ENDLESS } from "../../constants/repeating.constants";
import { userSelector } from "../AppLayout/state/userSettings/userSettings.reducer";
import { fetchListsAction } from "../TaskManager/state/userLists/userLists.actions";
import { fetchTagsAction } from "../TaskManager/state/userTags/userTags.actions";
import { fetchTasksAction } from "../TaskManager/state/userTasks/userTasks.actions";
import CalendarComponent from "./CalendarComponent";
import { fetchHabitsAction } from "../HabitTracker/state/userHabits/userHabits.actions";

export const initalFormValues = {
  name: "",
  listId: INBOX,
  priority: NONE,
  endBy: ENDLESS,
  tagIds: [],
  taskDate: undefined,
  duration: [undefined, undefined],
};

const CalendarView = ({ user, userTheme }) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const [formValues, setFormValues] = useState(initalFormValues);
  const [openAddTaskDialog, setOpenAddTaskDialog] = useState(false);
  const dispatch = useDispatch();
  const userSetting = useSelector(userSelector);

  useEffect(() => {
    if (user && user.uid !== userSetting.id) {
      dispatch(fetchListsAction(user.uid));
      dispatch(fetchTagsAction(user.uid));
      dispatch(fetchTasksAction(user.uid));
      dispatch(fetchHabitsAction(user.uid));
    }
  }, [userSetting, dispatch, user]);

  const [formType, setFormType] = useState(CREATE);
  const [taskDetails, setTaskDetails] = useState();
  const [messageApi] = message.useMessage();

  return (
    <Layout.Content
      style={{
        padding: "0.25rem 0.75rem",
        background: colorBgContainer,
      }}
    >
      <CalendarComponent
        userTheme={userTheme}
        user={user}
        setFormType={setFormType}
        setTaskDetails={setTaskDetails}
        setFormValues={setFormValues}
        setOpenAddTaskDialog={setOpenAddTaskDialog}
        initalFormValues={initalFormValues}
      />
      <TaskDialogForm
        user={user}
        messageApi={messageApi}
        openDialog={openAddTaskDialog}
        setOpenDialog={setOpenAddTaskDialog}
        formType={formType}
        formValues={formValues}
        setFormValues={setFormValues}
        taskDetails={taskDetails}
        isFromCalendar={true}
        disableDateSelection={formType === CREATE}
        disableTimeSelection={formType === CREATE}
      />
    </Layout.Content>
  );
};

export default CalendarView;
