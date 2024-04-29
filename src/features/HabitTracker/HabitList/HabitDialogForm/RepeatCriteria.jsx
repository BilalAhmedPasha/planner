import { InputNumber, theme } from "antd";
import { useEffect, useState } from "react";
import { DAYS_LIST } from "../../../../constants/dateTime.constants";
import {
  REPEAT_DAYS,
  REPEAT_INTERVAL,
} from "../../../../constants/habits.constants";
import styled from "styled-components";

const DaySelector = styled.div`
  height: 3rem;
  aspect-ratio: 1;
  align-items: center;
  justify-content: center;
  display: flex;
  fontsize: 1.15rem;
  cursor: pointer;
  border-radius: 50%;
  color: ${(props) => (props.isSelected ? "#ffffff" : props.colorTextBase)};
  background-color: ${(props) =>
    !props.isSelected ? props.colorBgContainer : props.colorPrimary};
  &:hover {
    background-color: ${(props) =>
      !props.isSelected ? props.colorBgTextHover : props.colorPrimary};
  }
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
`;

const RepeatCriteria = ({ value = {}, onChange, repeatType }) => {
  const {
    token: { colorTextBase, colorBgContainer, colorPrimary, colorBgTextHover },
  } = theme.useToken();

  const [frequencyState, setFrequencyState] = useState(value);

  useEffect(() => {
    onChange(frequencyState);
  }, [frequencyState]);

  const toggleActiveState = (e, index) => {
    const updatedDaysArray = [...frequencyState.days];
    updatedDaysArray[index] = updatedDaysArray[index] === 0 ? 1 : 0;
    if (!updatedDaysArray.includes(1)) {
      return;
    }
    setFrequencyState((prevState) => {
      return {
        ...prevState,
        days: [...updatedDaysArray],
      };
    });
  };

  const updateIntervalValue = (value) => {
    setFrequencyState((prevState) => {
      return {
        ...prevState,
        interval: value,
      };
    });
  };

  return (
    <div>
      {repeatType === REPEAT_DAYS && (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {frequencyState.days.map((each, index) => {
            return (
              <DaySelector
                colorBgContainer={colorBgContainer}
                colorBgTextHover={colorBgTextHover}
                colorPrimary={colorPrimary}
                colorTextBase={colorTextBase}
                isSelected={each}
                onClick={(e) => toggleActiveState(e, index)}
              >
                {DAYS_LIST[index].substring(0, 2)}
              </DaySelector>
            );
          })}
        </div>
      )}

      {repeatType === REPEAT_INTERVAL && (
        <div>
          {"Every "}
          <InputNumber
            min={2}
            defaultValue={frequencyState.interval}
            onChange={(e) => updateIntervalValue(e)}
          />
          {" Days"}
        </div>
      )}
    </div>
  );
};

export default RepeatCriteria;
