import { Input, InputNumber, Space, Switch } from "antd";
import { useEffect, useState } from "react";
import { DAYS_LIST } from "../../../../constants/dateTime.constants";

const FrequencyField = ({ value = {}, onChange }) => {
  const [frequencyState, setFrequencyState] = useState({
    repeatBy: "days",
    days: [1, 1, 1, 1, 1, 1, 1],
    interval: 2,
  });

  const [repeatByInterval, setRepeatByInterval] = useState(false);

  // {
  //   repeatBy:"interval"
  //   days: [0,0,0,0,0,0,0],
  //   interval: 2
  // }

  const handleChange = (e) => {
    onChange(frequencyState);
  };

  useEffect(() => {
    onChange(frequencyState);
  }, [frequencyState]);

  const handleSwitchChange = (e) => {
    setRepeatByInterval(e);
    if (e) {
      // days should become 0
      setFrequencyState((prevState) => {
        return {
          ...prevState,
          repeatBy: "interval",
        };
      });
    } else {
      setFrequencyState((prevState) => {
        return {
          ...prevState,
          repeatBy: "days",
        };
      });
    }
  };

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
      <Space>
        {"Repeat by interval"}
        <Switch onChange={(e) => handleSwitchChange(e)} />
      </Space>
      <div style={{ marginTop: "0.75rem" }}>
        {!repeatByInterval && (
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
        {repeatByInterval && (
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
    </div>
  );
};

export default FrequencyField;
