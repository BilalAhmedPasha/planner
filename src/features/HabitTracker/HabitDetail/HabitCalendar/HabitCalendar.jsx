import styled from "styled-components";
import { checkIfValidDate, generateDate } from "../../../../utils/habit.utils";
import "./HabitCalendar.css";
import { Button, Layout, theme } from "antd";
import dayjs from "../../../../utils/dateTime.utils";
import { useState } from "react";
import { months } from "../../../../constants/calendar.constants";
import Typography from "antd/es/typography/Typography";
import { CaretLeftOutlined, CaretRightOutlined } from "@ant-design/icons";
import { DAYS_LIST } from "../../../../constants/dateTime.constants";

const CalendarWrapper = styled.div``;

const CalenderDays = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
`;

const CalendarText = styled.h3`
  color: ${(props) =>
    !props.isValidDate
      ? props.colorBorder
      : props.today
      ? props.colorPrimary
      : props.currentMonth
      ? props.colorTextBase
      : props.colorTextSecondary};
`;

const CalendarDay = styled.div`
  padding: 10px;
  margin: 5px;
  text-align: center;
  color: ${(props) => props.colorTextSecondary};
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
  cursor: ${(props) => props.cursor};
  background-color: ${(props) => props.colorBgContainer};
  &:hover {
    background-color: ${(props) =>
      props.isValidDate ? props.colorBgTextHover : props.colorBgContainer};
  }
  box-shadow: rgba(99, 99, 99, 0.1) 0px 2px 8px 0px;
`;

const HabitCalendar = ({ habit }) => {
  const {
    token: {
      colorBgContainer,
      colorPrimary,
      colorTextBase,
      colorBgTextHover,
      colorTextSecondary,
      colorBorder,
    },
  } = theme.useToken();

  const currentDate = dayjs();
  const [today, setToday] = useState(currentDate);

 

  return (
    <Layout.Content
      style={{
        marginLeft: "0.1rem",
        padding: "0.25rem 0.75rem",
        background: colorBgContainer,
        height: "100vh",
        overflow: "auto",
      }}
    >
      <CalendarWrapper>
        <Typography.Text
          style={{
            fontWeight: "bold",
            fontSize: "25px",
          }}
        >
          {habit.name}
        </Typography.Text>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            overflow: "hidden",
          }}
        >
          <Typography.Text
            style={{
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
          {DAYS_LIST.map((day, index) => {
            return (
              <CalendarDay key={index} colorTextSecondary={colorTextSecondary}>
                <h3>{day}</h3>
              </CalendarDay>
            );
          })}
        </CalenderDays>
        <CalenderDates>
          {generateDate(today.month(), today.year()).map(
            ({ date, currentMonth, today }, index) => {
              const isValidDate = checkIfValidDate({ date, habit });
              return (
                <CalenderDate
                  key={index}
                  colorBgContainer={colorBgContainer}
                  colorBgTextHover={colorBgTextHover}
                  colorPrimary={colorPrimary}
                  onClick={() => {
                    if (isValidDate) {
                      console.log("Clicked", date.toDate());
                    }
                  }}
                  onContextMenu={(e) => {
                    e.preventDefault();
                    if (isValidDate) {
                      console.log("Right clicked", date.toDate());
                    }
                  }}
                  cursor={isValidDate ? "pointer" : "not-allowed"}
                  isValidDate={isValidDate}
                >
                  <CalendarText
                    currentMonth={currentMonth}
                    today={today}
                    colorPrimary={colorPrimary}
                    colorTextBase={colorTextBase}
                    colorTextSecondary={colorTextSecondary}
                    colorBorder={colorBorder}
                    isValidDate={isValidDate}
                  >
                    {date.date()}
                  </CalendarText>
                </CalenderDate>
              );
            }
          )}
        </CalenderDates>
      </CalendarWrapper>
    </Layout.Content>
  );
};

export default HabitCalendar;
