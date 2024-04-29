import { InputNumber } from "antd";
import { useEffect, useState } from "react";
import { DAYS_LIST } from "../../../../constants/dateTime.constants";
import {
  REPEAT_DAYS,
  REPEAT_INTERVAL,
} from "../../../../constants/habits.constants";

const RepeatCriteria = ({ value = {}, onChange, repeatType }) => {
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
              <div
                style={{
                  borderRadius: "50%",
                  background: each ? "#68C0FF" : "#D6D6D6",
                  height: "3rem",
                  aspectRatio: 1,
                  color: "white",
                  alignItems: "center",
                  justifyContent: "center",
                  display: "flex",
                  fontSize: "1.15rem",
                  cursor: "pointer",
                }}
                onClick={(e) => toggleActiveState(e, index)}
              >
                {DAYS_LIST[index].substring(0, 2)}
              </div>
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
