import { Button, Divider, Tag } from "antd";
import { NodeExpandOutlined } from "@ant-design/icons";
import { EDIT, VIEW } from "../../../constants/formType.constants";
import { useSelector } from "react-redux";
import { tagsSelector } from "../state/userTags/userTags.reducer";
import { showSubTasks } from "../../../constants/app.constants";
import { useMemo, useState, useEffect } from "react";
import { listsSelector } from "../state/userLists/userLists.reducer";
import {
  HIGH_COLOR,
  LOW_COLOR,
  MEDIUM_COLOR,
  NONE_COLOR,
} from "../../../constants/color.constants";
import { HIGH, LOW, MEDIUM } from "../../../constants/priority.constants";
import { DAY } from "../../../constants/dateTime.constants";
import {
  END_BY_DATE,
  END_BY_REPEAT_COUNT,
} from "../../../constants/repeating.constants";
import SubTaskInDetails from "./SubTaskInDetails";
import TaskDetailHeader from "./TaskDetailsHeader";
import PrimaryTaskDetails from "./PrimaryTaskDetails";
import SecondaryTaskDetails from "./SecondaryTaskDetails";

const getPriorityColor = (event) => {
  if (event === HIGH) {
    return HIGH_COLOR;
  } else if (event === MEDIUM) {
    return MEDIUM_COLOR;
  } else if (event === LOW) {
    return LOW_COLOR;
  } else {
    return NONE_COLOR;
  }
};

const TaskDetails = ({
  taskDetails,
  form,
  formType,
  setFormType,
  lastSavedFormValues,
}) => {
  const [priorityColor, setPriorityColor] = useState(
    getPriorityColor(taskDetails["priority"])
  );
  const [startDate, setStartDate] = useState(form.getFieldValue("taskDate"));

  const [isRepeating, setIsRepeating] = useState(
    form.getFieldValue("isRepeating")
  );

  const [openTaskDatePicker, setOpenTaskDatePicker] = useState(false);
  const [openTaskEndDatePicker, setOpenTaskEndDatePicker] = useState(false);
  useEffect(() => {
    if (formType === EDIT) {
      setOpenTaskDatePicker(false);
      setOpenTaskEndDatePicker(false);
    }
  }, [formType]);

  const [showEndByDate, setShowEndByDate] = useState(
    taskDetails[END_BY_DATE] ? true : false
  );
  const [showEndByRepeatCount, setshowEndByRepeatCount] = useState(
    taskDetails[END_BY_REPEAT_COUNT] ? true : false
  );
  const [isScheduled, setIsScheduled] = useState(
    taskDetails["taskDate"] ? true : false
  );

  const onReset = () => {
    form.setFieldsValue(lastSavedFormValues);
    setFormType(VIEW);
    setPriorityColor(getPriorityColor(lastSavedFormValues["priority"]));
    setIsScheduled(lastSavedFormValues["taskDate"] ? true : false);
    setshowEndByRepeatCount(
      lastSavedFormValues[END_BY_REPEAT_COUNT] ? true : false
    );
    setShowEndByDate(lastSavedFormValues[END_BY_DATE] ? true : false);
  };

  useEffect(() => {
    setPriorityColor(getPriorityColor(taskDetails["priority"]));
    setIsScheduled(taskDetails["taskDate"] ? true : false);
    setshowEndByRepeatCount(taskDetails[END_BY_REPEAT_COUNT] ? true : false);
    setShowEndByDate(taskDetails[END_BY_DATE] ? true : false);
  }, [taskDetails]);

  const handlePriorityColor = (event) => {
    setPriorityColor(getPriorityColor(event));
    form.setFieldValue({ priority: event });
  };

  const { lists } = useSelector(listsSelector);
  const { tags } = useSelector(tagsSelector);

  const listOptions = useMemo(() => {
    return lists.map((each) => {
      return {
        value: each.id,
        label: each.label,
        color: each.color,
      };
    });
  }, [lists]);

  const tagOptions = useMemo(() => {
    return tags.map((each) => {
      return {
        label: each.label,
        value: each.id,
      };
    });
  }, [tags]);

  const tagRender = (closable, props) => {
    const { label, value, onClose } = props;
    const color = tags.find((each) => each.id === value)?.color;
    const onPreventMouseDown = (event) => {
      event.preventDefault();
      event.stopPropagation();
    };
    return (
      <Tag
        color={color}
        onMouseDown={onPreventMouseDown}
        closable={closable}
        onClose={onClose}
        style={{
          marginRight: 3,
        }}
      >
        {label}
      </Tag>
    );
  };

  const handleStartDateChange = (e) => {
    setStartDate(e);
    if (e) {
      setIsScheduled(true);
    } else {
      setIsScheduled(false);
    }
  };

  const handleRepeatDropDownChange = (e) => {
    form.validateFields();
    if (e) {
      setIsRepeating(true);
    } else {
      setIsRepeating(false);
    }
  };

  const handleEndByDropDownChange = (e) => {
    form.validateFields();
    if (e === END_BY_DATE) {
      setShowEndByDate(true);
      setshowEndByRepeatCount(false);
    } else if (e === END_BY_REPEAT_COUNT) {
      setShowEndByDate(false);
      setshowEndByRepeatCount(true);
    } else {
      setShowEndByDate(false);
      setshowEndByRepeatCount(false);
    }
  };

  const disabledEndDate = (current) => {
    return startDate && current.startOf(DAY).isBefore(startDate.startOf(DAY));
  };

  const [subTasks, setSubTasks] = useState([]);
  const onAddSubTask = () => {
    setSubTasks((prevState) => [...prevState, 1]);
  };

  useEffect(() => {
    setSubTasks([]);
  }, [taskDetails]);

  return (
    <>
      <TaskDetailHeader
        formType={formType}
        setFormType={setFormType}
        onReset={onReset}
      />
      <PrimaryTaskDetails form={form} formType={formType} />
      <SecondaryTaskDetails
        form={form}
        formType={formType}
        handleStartDateChange={handleStartDateChange}
        openTaskDatePicker={openTaskDatePicker}
        setOpenTaskDatePicker={setOpenTaskDatePicker}
        isScheduled={isScheduled}
        handleRepeatDropDownChange={handleRepeatDropDownChange}
        handlePriorityColor={handlePriorityColor}
        priorityColor={priorityColor}
        listOptions={listOptions}
        tagOptions={tagOptions}
        tagRender={tagRender}
        isRepeating={isRepeating}
        handleEndByDropDownChange={handleEndByDropDownChange}
        showEndByDate={showEndByDate}
        showEndByRepeatCount={showEndByRepeatCount}
        disabledEndDate={disabledEndDate}
        openTaskEndDatePicker={openTaskEndDatePicker}
        setOpenTaskEndDatePicker={setOpenTaskEndDatePicker}
      />
      <Divider />
      {showSubTasks && (
        <Button
          type="text"
          icon={<NodeExpandOutlined />}
          onClick={onAddSubTask}
        >
          {"Add Subtask"}
        </Button>
      )}
      <div style={{ overflow: "auto" }}>
        {subTasks.map((each, index) => (
          <SubTaskInDetails key={index} taskDetails={taskDetails} />
        ))}
      </div>
    </>
  );
};

export default TaskDetails;
