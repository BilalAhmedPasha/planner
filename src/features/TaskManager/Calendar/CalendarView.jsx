import { Layout, theme, message } from "antd";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import React, { useEffect, useMemo, useState } from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useDispatch, useSelector } from "react-redux";
import { INBOX } from "../../../constants/app.constants";
import { NONE } from "../../../constants/priority.constants";
import TaskDialogForm from "../TaskListView/TaskDialogForm";
import { CREATE } from "../../../constants/formType.constants";
import { ENDLESS } from "../../../constants/repeating.constants";
import { userSelector } from "../../AppLayout/state/userSettings/userSettings.reducer";
import { fetchListsAction } from "../state/userLists/userLists.actions";
import { fetchTagsAction } from "../state/userTags/userTags.actions";
import { fetchTasksAction } from "../state/userTasks/userTasks.actions";
import CalendarComponent from "./CalendarComponent";

dayjs.extend(timezone);

const CalendarView = ({ user, userTheme }) => {
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const initalFormValues = useMemo(() => {
        return {
            name: "",
            listId: INBOX,
            priority: NONE,
            endBy: ENDLESS,
            tagIds: [],
            taskDate: undefined,
            duration: [undefined, undefined],
        };
    }, []);

    const [formValues, setFormValues] = useState(initalFormValues);
    const [openAddTaskDialog, setOpenAddTaskDialog] = useState(false);
    const dispatch = useDispatch();
    const userSetting = useSelector(userSelector);

    useEffect(() => {
        if (user && user.uid !== userSetting.id) {
            dispatch(fetchListsAction(user.uid));
            dispatch(fetchTagsAction(user.uid));
            dispatch(fetchTasksAction(user.uid));
        }
    }, [userSetting, dispatch, user]);

    useEffect(() => {
        if (formValues.taskDate !== undefined) {
            setOpenAddTaskDialog(true);
        }
    }, [formValues]);

    const [formType, setFormType] = useState(CREATE);
    const [taskDetails, setTaskDetails] = useState();
    const [messageApi] = message.useMessage();

    useEffect(() => {
        if (formValues.taskDate !== undefined) {
            setOpenAddTaskDialog(true);
        }
    }, [formValues, setOpenAddTaskDialog]);

    return (
        <Layout.Content
            style={{
                padding: "1vh 0.75rem",
                background: colorBgContainer,
                height: "100vh",
            }}
        >
            <CalendarComponent
                userTheme={userTheme}
                user={user}
                setFormType={setFormType}
                setTaskDetails={setTaskDetails}
                setOpenAddTaskDialog={setOpenAddTaskDialog}
                formValues={formValues}
                setFormValues={setFormValues}
                initalFormValues={initalFormValues}
            />
            {openAddTaskDialog && (
                <TaskDialogForm
                    user={user}
                    messageApi={messageApi}
                    openDialog={openAddTaskDialog}
                    setOpenDialog={setOpenAddTaskDialog}
                    formType={formType}
                    formValues={formValues}
                    taskDetails={taskDetails}
                    isFromCalendar={true}
                    disableDateSelection={formType === CREATE}
                    disableTimeSelection={formType === CREATE}
                />
            )}
        </Layout.Content>
    );
};

export default CalendarView;
