import { InputNumber, theme } from "antd";
import { useEffect, useState } from "react";
import { DAYS_LIST } from "../../../../constants/dateTime.constants";
import {
  REPEAT_DAYS,
  REPEAT_INTERVAL,
} from "../../../../constants/habits.constants";
import DaySelector from "../../../../components/DaySelector";

const RepeatCriteria = ({ value = {}, onChange, frequencyType }) => {
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
      {frequencyType === REPEAT_DAYS && (
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
                height={3}
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

      {frequencyType === REPEAT_INTERVAL && (
        <div>
          {"Every "}
          <InputNumber
            min={2}
            defaultValue={frequencyState.interval}
            onChange={(e) => updateIntervalValue(e)}
            precision={0}
          />
          {" Days"}
        </div>
      )}
    </div>
  );
};

export default RepeatCriteria;
