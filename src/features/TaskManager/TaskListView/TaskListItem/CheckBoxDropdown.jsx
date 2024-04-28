import { Dropdown, theme } from "antd";
import CheckBoxInput from "../../../../components/CheckBox/CheckBox";
import { HIGH, LOW, MEDIUM } from "../../../../constants/priority.constants";
import {
  HIGH_BG_COLOR,
  HIGH_COLOR,
  LOW_BG_COLOR,
  LOW_COLOR,
  MEDIUM_BG_COLOR,
  MEDIUM_COLOR,
  NONE_BG_COLOR,
  NONE_COLOR,
} from "../../../../constants/color.constants";
import {
  END_BY_DATE,
  END_BY_REPEAT_COUNT,
  repeatMapping,
} from "../../../../constants/repeating.constants";
import {
  COMPLETED,
  SUCCESS,
  WONT_DO,
} from "../../../../constants/app.constants";
import { cross, tick } from "../../../../constants/checkBox.constants";
import { DAY } from "../../../../constants/dateTime.constants";
import dayjs from "../../../../utils/dateTime.utils";
import {
  completeTaskAction,
  wontDoTaskAction,
} from "../../state/userTasks/userTasks.actions";
import { useDispatch } from "react-redux";

const getPriorityColor = ({ isInCalendar, item, completedColor, completedBGColor }) => {
  if (!isInCalendar && (item.isCompleted || item.isWontDo)) {
    return { color: completedColor, bgColor: completedBGColor };
  }
  if (item.priority === HIGH) {
    return { color: HIGH_COLOR, bgColor: HIGH_BG_COLOR };
  } else if (item.priority === MEDIUM) {
    return { color: MEDIUM_COLOR, bgColor: MEDIUM_BG_COLOR };
  } else if (item.priority === LOW) {
    return { color: LOW_COLOR, bgColor: LOW_BG_COLOR };
  }
  return { color: NONE_COLOR, bgColor: NONE_BG_COLOR };
};

const CheckBoxDropdown = ({
  user,
  taskDetails,
  showCheckBoxMenu,
  setShowCheckBoxMenu,
  checkBoxContent,
  setCheckBoxContent,
  isInCalendar = false,
}) => {
  const dispatch = useDispatch();

  const {
    token: { colorBgContainer, colorBorder, colorBorderSecondary },
  } = theme.useToken();

  const checkBoxMenuItems = [
    {
      label: "Complete",
      key: COMPLETED,
    },
    {
      label: "Won't Do",
      key: WONT_DO,
    },
  ];

  const handleClick = (e) => {
    e.stopPropagation();
    markTaskComplete(e.target.checked).then((response) => {
      if (response.success === SUCCESS) {
        setShowCheckBoxMenu(false);
        setCheckBoxContent(tick);
      }
    });
  };

  const handleRightClick = ({ e, taskDetails }) => {
    e.preventDefault();
    if (taskDetails.isDeleted) return false;
    setShowCheckBoxMenu(true);
  };

  const markTaskComplete = (isCompleted) => {
    const markedTime = dayjs.utc().endOf(DAY).format();
    let shouldCreateNewTask = true;
    let updatedTaskDate = null;

    if (taskDetails.isRepeating) {
      updatedTaskDate = dayjs(taskDetails.taskDate).add(
        1,
        repeatMapping[taskDetails.repeatFrequency]
      );
      let endTaskDate = null;
      if (taskDetails.endBy === END_BY_DATE) {
        endTaskDate = dayjs(taskDetails.endByDate).endOf(DAY);
      } else if (taskDetails.endBy === END_BY_REPEAT_COUNT) {
        endTaskDate = dayjs(taskDetails.endByRepeatCountDate).endOf(DAY);
      }
      if (endTaskDate) {
        if (updatedTaskDate.isAfter(endTaskDate)) {
          shouldCreateNewTask = false;
        }
      }
    }
    if(isInCalendar) {
      delete taskDetails.start;
      delete taskDetails.end;
    }
    return dispatch(
      completeTaskAction(
        user.uid,
        taskDetails,
        isCompleted,
        markedTime,
        updatedTaskDate?.format(),
        shouldCreateNewTask
      )
    );
  };

  const markTaskWontDo = (isWontDo) => {
    const markedTime = dayjs.utc().endOf(DAY).format();
    let shouldCreateNewTask = true;
    let updatedTaskDate = null;

    if (taskDetails.isRepeating) {
      updatedTaskDate = dayjs(taskDetails.taskDate).add(
        1,
        repeatMapping[taskDetails.repeatFrequency]
      );
      let endTaskDate = null;
      if (taskDetails.endBy === END_BY_DATE) {
        endTaskDate = dayjs(taskDetails.endByDate).endOf(DAY);
      } else if (taskDetails.endBy === END_BY_REPEAT_COUNT) {
        endTaskDate = dayjs(taskDetails.endByRepeatCountDate).endOf(DAY);
      }
      if (endTaskDate) {
        if (updatedTaskDate.isAfter(endTaskDate)) {
          shouldCreateNewTask = false;
        }
      }
    }
    return dispatch(
      wontDoTaskAction(
        user.uid,
        taskDetails,
        isWontDo,
        markedTime,
        updatedTaskDate?.format(),
        shouldCreateNewTask
      )
    );
  };

  const handleMenuClick = (e) => {
    if (e.key === COMPLETED) {
      markTaskComplete(!taskDetails.isCompleted).then((response) => {
        if (response.success === SUCCESS) {
          setShowCheckBoxMenu(false);
          setCheckBoxContent(tick);
        }
      });
    } else if (e.key === WONT_DO) {
      markTaskWontDo(!taskDetails.isWontDo).then((response) => {
        if (response.success === SUCCESS) {
          setShowCheckBoxMenu(false);
          setCheckBoxContent(cross);
        }
      });
    }
  };

  const colorConfig = getPriorityColor({
    isInCalendar: isInCalendar,
    item: taskDetails,
    completedColor: colorBorder,
    completedBGColor: colorBorderSecondary,
  });

  return (
    <Dropdown
      menu={{
        items: checkBoxMenuItems,
        onClick: handleMenuClick,
      }}
      placement="bottomLeft"
      open={showCheckBoxMenu}
      disabled={taskDetails.isDeleted}
    >
      <CheckBoxInput
        uniCode={checkBoxContent}
        backgroundColor={colorConfig.color}
        borderColor={colorConfig.color}
        checkBoxColor={colorConfig.color}
        hoverBgColor={colorConfig.bgColor}
        onChange={handleClick}
        onContextMenu={(e) => handleRightClick({ e, taskDetails })}
        checked={taskDetails.isCompleted || taskDetails.isWontDo}
        disabled={taskDetails.isDeleted}
        colorBgContainer={colorBgContainer}
      />
    </Dropdown>
  );
};

export default CheckBoxDropdown;
