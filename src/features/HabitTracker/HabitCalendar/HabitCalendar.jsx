import styled from "styled-components";
import { cn, generateDate } from "../../../utils/habit.utils";
import "./HabitCalendar.css";
import { Button, theme } from "antd";
import dayjs from "../../../utils/dateTime.utils";
import { useState } from "react";
import { months } from "../../../constants/calendar.constants";
import Typography from "antd/es/typography/Typography";
import { CaretLeftOutlined, CaretRightOutlined } from "@ant-design/icons";

const CalendarWrapper = styled.div``;
const CalenderDays = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
`;

const CalendarDay = styled.div`
  padding: 10px;
  margin: 5px;
  text-align: center;
  color: #a1a1a1;
`;

const CalenderDates = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  justify-content: center;
  align-items: center;
`;

const CalenderDate = styled.div`
  aspect-ratio: 1;
  border-radius: 50%;
  justify-content: center;
  align-items: center;
  display: flex;
  margin: 1rem;
  cursor: pointer;
  background-color: ${(props) => props.colorBgContainer};

  &:hover {
    background-color: ${(props) => props.colorBgTextHover};
  }
  box-shadow: rgba(99, 99, 99, 0.1) 0px 2px 8px 0px;
`;

const HabitCalendar = () => {
  const {
    token: { colorBgContainer, colorPrimary, colorBgTextHover },
  } = theme.useToken();

  const days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];

  const currentDate = dayjs();
  const [today, setToday] = useState(currentDate);

  return (
    <CalendarWrapper>
      <div style={{ display: "flex", justifyContent: "space-between", overflow:"hidden" }}>
        <Typography.Text
          style={{
            fontWeight: "bold",
            fontSize: "20px",
          }}
        >
          {months[today.month()]}, {today.year()}
        </Typography.Text>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 5,
            fontSize: "2rem",
          }}
        >
          <Button
            type="text"
            icon={<CaretLeftOutlined />}
            onClick={() => {
              setToday(today.month(today.month() - 1));
            }}
          />
          <Button
            type="text"
            size="small"
            onClick={() => {
              setToday(currentDate);
            }}
          >
            <Typography.Text>{"Today"}</Typography.Text>
          </Button>
          <Button
            type="text"
            icon={<CaretRightOutlined />}
            onClick={() => {
              setToday(today.month(today.month() + 1));
            }}
          />
        </div>
      </div>
      <CalenderDays>
        {days.map((day, index) => {
          return (
            <CalendarDay key={index}>
              <h3>{day}</h3>
            </CalendarDay>
          );
        })}
      </CalenderDays>
      <CalenderDates>
        {generateDate(today.month(), today.year()).map(
          ({ date, currentMonth, today }, index) => {
            return (
              <CalenderDate
                key={index}
                colorBgContainer={colorBgContainer}
                colorBgTextHover={colorBgTextHover}
                colorPrimary={colorPrimary}
                onClick={(e) => console.log("Clicked", date.toDate())}
                onContextMenu={(e) => {
                  e.preventDefault();
                  console.log("Right clicked", date.toDate());
                }}
              >
                <h3
                  className={cn(
                    currentMonth ? "" : "text-grey",
                    today ? "color-blue" : ""
                  )}
                >
                  {date.date()}
                </h3>
              </CalenderDate>
            );
          }
        )}
      </CalenderDates>
    </CalendarWrapper>
  );
};

export default HabitCalendar;
