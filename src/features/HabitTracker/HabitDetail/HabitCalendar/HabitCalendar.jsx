import styled from "styled-components";
import { checkIfValidDate, generateDate } from "../../../../utils/habit.utils";
import { Button, Layout, theme } from "antd";
import dayjs from "../../../../utils/dateTime.utils";
import { useEffect, useState } from "react";
import { months } from "../../../../constants/calendar.constants";
import Typography from "antd/es/typography/Typography";
import { CaretLeftOutlined, CaretRightOutlined } from "@ant-design/icons";
import { DAYS_LIST, MONTH } from "../../../../constants/dateTime.constants";
import { useDispatch, useSelector } from "react-redux";
import { markHabitAction } from "../../state/userHabits/userHabits.actions";
import {
  HABIT_MARKED_DONE,
  HABIT_MARKED_NOT_DONE,
  HABIT_UNMARKED,
} from "../../../../constants/habits.constants";
import { habitsSelector } from "../../state/userHabits/userHabits.reducer";
import Loading from "../../../../components/Loading";
import Spinner from "../../../../components/Spinner";

const CalendarWrapper = styled.div``;

const CalenderDays = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-row: 1;
  justify-content: flex-start;
  align-items: center;
`;

const CalendarText = styled.h2`
  color: ${(props) =>
    !props.currentMonth ||
    props.isFuture ||
    !props.isValidDate ||
    props.markedValue !== 0
      ? props.colorBorder
      : props.isToday
      ? props.colorPrimary
      : props.colorTextBase};
`;

const CalendarDay = styled.div`
  padding: 10px;
  margin: 5px;
  text-align: center;
  font-size: 1rem;
  color: ${(props) => props.colorTextSecondary};
`;

const CalenderDates = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-row: 2;
  justify-content: flex-start;
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
  background-color: ${(props) => {
    if (props.markedValue === 1) {
      return props.colorSuccess;
    } else if (props.markedValue === -1) {
      return props.colorError;
    }
    return props.colorBgContainer;
  }};
  &:hover {
    background-color: ${(props) => {
      if (props.markedValue === 1) {
        return props.colorSuccess;
      } else if (props.markedValue === -1) {
        return props.colorError;
      }
      return props.isValidDate && !props.isFuture
        ? props.colorBgTextHover
        : props.colorBgContainer;
    }};
  }
  box-shadow: ${(props) =>
    props.isValidDate && !props.isFuture
      ? "rgba(99, 99, 99, 0.20) 0px 2px 8px 0px"
      : "none"};
`;

const mapValue = (input) => {
  switch (input) {
    case HABIT_MARKED_NOT_DONE:
      return HABIT_UNMARKED;
    case HABIT_UNMARKED:
      return HABIT_MARKED_DONE;
    case HABIT_MARKED_DONE:
      return HABIT_MARKED_NOT_DONE;
  }
};

export const handleHabitDateClick = ({ habit, date, dispatch, user }) => {
  if (!habit.history || !habit.history.hasOwnProperty(date.format())) {
    dispatch(
      markHabitAction(user.uid, habit.id, date.format(), HABIT_MARKED_DONE)
    );
  } else {
    dispatch(
      markHabitAction(
        user.uid,
        habit.id,
        date.format(),
        mapValue(habit.history[`${date.format()}`])
      )
    );
  }
};

const HabitCalendar = ({ user, habit, isInDrawer = false }) => {
  const {
    token: {
      colorBgContainer,
      colorPrimary,
      colorTextBase,
      colorBgTextHover,
      colorTextSecondary,
      colorBorder,
      colorSuccess,
      colorError,
    },
  } = theme.useToken();

  const currentDate = dayjs();
  const [today, setToday] = useState(currentDate);

  useEffect(() => {
    setToday(currentDate);
  }, [habit.id]);

  const dispatch = useDispatch();
  const { isLoadingHabits } = useSelector(habitsSelector);

  return (
    <Spinner spinning={isLoadingHabits} indicator={Loading(0)}>
      <CalendarWrapper>
        {!isInDrawer && (
          <div
            style={{
              padding: "0.5rem 1rem 0rem 1rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "start",
              top: 0,
              zIndex: 1,
              background: colorBgContainer,
              position: "sticky",
            }}
          >
            <Typography.Text
              style={{
                fontWeight: "bold",
                fontSize: "25px",
              }}
              ellipsis={true}
            >
              {habit.name}
            </Typography.Text>
          </div>
        )}
        <div
          style={{
            padding: !isInDrawer ? "0.5rem 1rem" : "0rem",
            marginTop: "0.5rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            overflowX: "auto",
            width: "100%",
          }}
        >
          <Typography.Text
            style={{
              fontSize: "1.25rem",
              whiteSpace: "nowrap",
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
              disabled={today
                .month(today.month())
                .startOf(MONTH)
                .isSame(dayjs(habit.startDate).startOf(MONTH).toDate())}
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
              disabled={today
                .month(today.month())
                .startOf(MONTH)
                .isSame(dayjs().startOf(MONTH).toDate())}
              onClick={() => {
                setToday(today.month(today.month() + 1));
              }}
            />
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            overflowX: "auto",
            marginBottom: "1rem",
            width: "100%",
          }}
        >
          <CalenderDays>
            {DAYS_LIST.map((day, index) => {
              return (
                <CalendarDay
                  key={index}
                  colorTextSecondary={colorTextSecondary}
                >
                  <p>{day}</p>
                </CalendarDay>
              );
            })}
          </CalenderDays>
          <CalenderDates>
            {generateDate(today.month(), today.year()).map(
              ({ date, currentMonth, isPast, isToday, isFuture }, index) => {
                const isValidDate = checkIfValidDate({ date, habit });
                const markedValue =
                  habit.history && habit.history[`${date.format()}`]
                    ? habit.history[`${date.format()}`]
                    : 0;
                return (
                  <CalenderDate
                    key={index}
                    colorBgContainer={colorBgContainer}
                    colorBgTextHover={colorBgTextHover}
                    colorPrimary={colorPrimary}
                    colorSuccess={colorSuccess}
                    colorError={colorError}
                    onClick={() => {
                      if (isValidDate && !isFuture) {
                        handleHabitDateClick({ habit, date, dispatch, user });
                      }
                    }}
                    onContextMenu={(e) => {
                      e.preventDefault();
                      if (isValidDate) {
                        console.log("Right clicked", date.toDate());
                      }
                    }}
                    cursor={
                      isValidDate && !isFuture ? "pointer" : "not-allowed"
                    }
                    isFuture={isFuture}
                    isValidDate={isValidDate}
                    markedValue={markedValue}
                  >
                    <CalendarText
                      currentMonth={currentMonth}
                      isFuture={isFuture}
                      isToday={isToday}
                      colorPrimary={colorPrimary}
                      colorTextBase={colorTextBase}
                      colorTextSecondary={colorTextSecondary}
                      colorBorder={colorBorder}
                      isValidDate={isValidDate}
                      markedValue={markedValue}
                    >
                      {date.date()}
                    </CalendarText>
                  </CalenderDate>
                );
              }
            )}
          </CalenderDates>
        </div>
      </CalendarWrapper>
    </Spinner>
  );
};

export default HabitCalendar;
