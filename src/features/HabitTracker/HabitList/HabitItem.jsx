import { Typography, theme, Button, Space } from "antd";
import styled from "styled-components";
import { AiOutlineDelete } from "react-icons/ai";
import { FiEdit2 } from "react-icons/fi";
import DaySelector from "../../../components/DaySelector";
import { checkIfValidDate, getLast7Days } from "../../../utils/habit.utils";
import { EDIT } from "../../../constants/formType.constants";
import dayjs from "../../../utils/dateTime.utils";
import { useLocation, useNavigate } from "react-router-dom";

const StyledDiv = styled.div`
  padding: 0.75rem 1rem;
  margin: 0.25rem 0.5rem;
  opacity: ${(props) => props.opacity};
  &:hover {
    background-color: ${(props) =>
      props.isSelected ? props.colorPrimaryBg : props.colorBgTextHover};
  }
  background-color: ${(props) =>
    props.isSelected ? props.colorPrimaryBg : props.colorBgContainer};
  box-shadow: rgba(99, 99, 99, 0.1) 0px 2px 8px 0px;
  user-select: none;
  cursor: pointer;
  display: flex;
  align-items: center;
`;

const DateText = styled.h5`
  color: ${(props) =>
    !props.isValidDate
      ? props.colorBorder
      : props.today
      ? props.colorPrimary
      : props.currentMonth
      ? props.colorTextBase
      : props.colorTextSecondary};
`;

const HabitItem = ({
  habit,
  selectedHabitDetail,
  setSelectedHabitDetail,
  handleOpenHabitDialog,
  setFormConfig,
  handleDeleteHabit,
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

  const currentURL = useLocation();
  const navigateTo = useNavigate();
  return (
    <StyledDiv
      opacity={1}
      isSelected={selectedHabitDetail && selectedHabitDetail.id === habit.id}
      colorBgContainer={colorBgContainer}
      colorPrimaryBg={colorPrimaryBg}
      controlItemBgHover={controlItemBgHover}
      colorBgTextHover={colorBgTextHover}
      colorBorder={colorBorder}
      onClick={(e) => {
        e.stopPropagation();
        const urlPath = currentURL.pathname.split("/");
        navigateTo(`/${urlPath[1]}/${habit.id}`);
        setSelectedHabitDetail(habit);
      }}
    >
      <Typography.Text
        style={{
          whiteSpace: "nowrap",
          overflow: "hidden",
          width: "100%",
        }}
        ellipsis={true}
      >
        {habit.name}
      </Typography.Text>
      <Space>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          {last7Dates.map((date) => {
            const isValidDate = checkIfValidDate({ date: dayjs(date), habit });
            return (
              <DaySelector
                height={2}
                colorBgContainer={colorBgContainer}
                colorBgTextHover={colorBgTextHover}
                colorPrimary={colorPrimary}
                colorTextBase={colorTextSecondary}
                isSelected={false}
                onClick={(e) => {
                  e.stopPropagation();
                  if (isValidDate) {
                    console.log(date);
                  }
                }}
                cursor={isValidDate ? "pointer" : "not-allowed"}
                isValidDate={isValidDate}
              >
                <DateText
                  isValidDate={isValidDate}
                  colorBorder={colorBorder}
                  colorPrimary={colorPrimary}
                  colorTextBase={colorTextBase}
                  colorTextSecondary={colorTextSecondary}
                >
                  {date.getDate()}
                </DateText>
              </DaySelector>
            );
          })}
        </div>
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
    </StyledDiv>
  );
};

export default HabitItem;
