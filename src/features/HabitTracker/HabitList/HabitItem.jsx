import { Typography, theme, Button, Space } from "antd";
import styled from "styled-components";
import { AiOutlineDelete } from "react-icons/ai";
import { FiEdit2 } from "react-icons/fi";
import DaySelector from "../../../components/DaySelector";
import { checkIfValidDate, getLast7Days } from "../../../utils/habit.utils";
import { EDIT } from "../../../constants/formType.constants";
import dayjs from "../../../utils/dateTime.utils";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { handleHabitDateClick } from "../HabitDetail/HabitCalendar/HabitCalendar";
import useWindowSize from "../../../hooks/useWindowSize";
import { navToDrawer } from "../../../utils/screen.utils";

const StyledDiv = styled.div`
  padding: 0.75rem 1rem;
  margin: 0.25rem 0.5rem;
  opacity: ${(props) => props.opacity};
  &:hover {
    background-color: ${(props) =>
      props.$isSelected ? props.$colorPrimaryBg : props.$colorBgTextHover};
  }
  background-color: ${(props) =>
    props.$isSelected ? props.$colorPrimaryBg : props.$colorBgContainer};
  box-shadow: rgba(99, 99, 99, 0.1) 0px 2px 8px 0px;
  user-select: none;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const DateText = styled.h5`
  color: ${(props) =>
    !props.$isValidDate
      ? props.$colorBorder
      : props.today
      ? props.$colorPrimary
      : props.$currentMonth || props.$markedValue !== 0
      ? props.$colorTextBase
      : props.$colorTextSecondary};
`;

const HabitItem = ({
  habit,
  user,
  selectedHabitDetail,
  setSelectedHabitDetail,
  handleOpenHabitDialog,
  setFormConfig,
  handleDeleteHabit,
  setHabitHistory
}) => {
  const {
    token: {
      colorBgContainer,
      colorTextLabel,
      controlItemBgHover,
      colorPrimaryBg,
      colorBgTextHover,
      colorTextSecondary,
      colorBorder,
      colorTextBase,
      colorPrimary,
      colorSuccess,
      colorError,
    },
  } = theme.useToken();

  const last7Dates = getLast7Days();

  const handleEditHabit = () => {
    setFormConfig({
      mode: EDIT,
      values: {
        ...habit,
        startDate: dayjs(habit.startDate),
        endDate: habit.endDate ? dayjs(habit.endDate) : null,
      },
    });
    handleOpenHabitDialog();
  };

  const screenSize = useWindowSize();

  const currentURL = useLocation();
  const navigateTo = useNavigate();
  const dispatch = useDispatch();
  return (
    <StyledDiv
      opacity={1}
      $isSelected={selectedHabitDetail && selectedHabitDetail.id === habit.id}
      $colorBgContainer={colorBgContainer}
      $colorPrimaryBg={colorPrimaryBg}
      $controlItemBgHover={controlItemBgHover}
      $colorBgTextHover={colorBgTextHover}
      $colorBorder={colorBorder}
      onClick={(e) => {
        e.stopPropagation();
        const urlPath = currentURL.pathname.split("/");
        navigateTo(`/${urlPath[1]}/${habit.id}`);
      }}
    >
      <Typography.Text
        style={{
          whiteSpace: "nowrap",
          overflowX: "auto",
          maxWidth: !navToDrawer({ currentWidth: screenSize.width })
            ? "100%"
            : "100%",
        }}
      >
        {habit.name}
      </Typography.Text>
      <div
        style={{
          whiteSpace: "nowrap",
          paddingLeft: "0.25rem",
        }}
      >
        <Space>
          {!navToDrawer({ currentWidth: screenSize.width }) && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              {last7Dates.map((date,index) => {
                const isValidDate = checkIfValidDate({
                  date: dayjs(date),
                  habit,
                });
                const markedValue =
                  habit.history && habit.history[`${dayjs(date).format()}`]
                    ? habit.history[`${dayjs(date).format()}`]
                    : 0;
                return (
                  <DaySelector
                    key={index}
                    height={2}
                    $colorBgContainer={colorBgContainer}
                    $colorBgTextHover={colorBgTextHover}
                    $colorPrimary={colorPrimary}
                    $colorTextBase={colorTextSecondary}
                    $colorSuccess={colorSuccess}
                    $colorError={colorError}
                    $isSelected={false}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (isValidDate) {
                        handleHabitDateClick({
                          habit: habit,
                          date: dayjs(date),
                          dispatch: dispatch,
                          user: user,
                          setHabitHistory
                        });
                      }
                    }}
                    cursor={isValidDate ? "pointer" : "not-allowed"}
                    $isValidDate={isValidDate}
                    $markedValue={markedValue}
                  >
                    <DateText
                      $isValidDate={isValidDate}
                      $colorBorder={colorBorder}
                      $colorPrimary={colorPrimary}
                      $colorTextBase={colorTextBase}
                      $colorTextSecondary={colorTextSecondary}
                      $markedValue={markedValue}
                    >
                      {date.getDate() <= 9 ? `0${date.getDate()}` : date.getDate()}
                    </DateText>
                  </DaySelector>
                );
              })}
            </div>
          )}
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Button
              type="text"
              icon={
                <FiEdit2
                  style={{
                    fontSize: "1rem",
                    color: colorTextLabel,
                    opacity: 1,
                    transition: "0.3s all ease",
                  }}
                />
              }
              onClick={(e) => {
                e.stopPropagation();
                handleEditHabit();
              }}
            />
            <Button
              type="text"
              icon={
                <AiOutlineDelete
                  style={{
                    fontSize: "1rem",
                    color: colorTextLabel,
                    opacity: 1,
                    transition: "0.3s all ease",
                  }}
                />
              }
              onClick={(e) => {
                e.stopPropagation();
                handleDeleteHabit({ habitId: habit.id });
              }}
            />
          </div>
        </Space>
      </div>
    </StyledDiv>
  );
};

export default HabitItem;
