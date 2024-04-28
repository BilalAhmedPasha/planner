import { Space, Typography, theme } from "antd";
import { SyncOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { useState } from "react";
import { cross, tick } from "../../../../constants/checkBox.constants";
import CheckBoxDropdown from "../../TaskListView/TaskListItem/CheckBoxDropdown";

const CalendarEvent = ({ event, user }) => {
  const {
    token: { colorTextBase },
  } = theme.useToken();

  const [checkBoxContent, setCheckBoxContent] = useState(
    event.isCompleted ? tick : cross
  );

  const [showCheckBoxMenu, setShowCheckBoxMenu] = useState(false);

  function keyPress(e) {
    if (e.key === "Escape") {
      setShowCheckBoxMenu(false);
    }
  }

  return (
    <div
      style={{
        paddingLeft: "0.25rem",
        paddingTop: "0.25rem",
        overflow: "scroll",
      }}
      onClick={(e) => {
        e.stopPropagation();
      }}
      onKeyDown={keyPress}
    >
      <Space>
        <CheckBoxDropdown
          user={user}
          taskDetails={event}
          showCheckBoxMenu={showCheckBoxMenu}
          setShowCheckBoxMenu={setShowCheckBoxMenu}
          checkBoxContent={checkBoxContent}
          setCheckBoxContent={setCheckBoxContent}
          isInCalendar={true}
        />
        <Typography.Text strong={true} ellipsis={true} tooltip={false}>
          {event.name}
        </Typography.Text>
      </Space>
      <br />
      <Space>
        {event.isRepeating && (
          <SyncOutlined
            style={{
              color: colorTextBase,
            }}
          />
        )}
        {event.startTime && event.endTime && (
          <Typography.Text ellipsis={true}>
            {dayjs(event.startTime, "HH:mm:ss").format("hh:mm A")} -{" "}
            {dayjs(event.endTime, "HH:mm:ss").format("hh:mm A")}
          </Typography.Text>
        )}
      </Space>
    </div>
  );
};

export default CalendarEvent;
