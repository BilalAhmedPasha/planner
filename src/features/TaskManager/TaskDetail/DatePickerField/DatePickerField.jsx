import { DatePicker } from "antd";
import styled from "styled-components";

const DatePickerField = styled(DatePicker)`
  border: 0px solid black;
  :hover {
    border: 0.5px solid grey;
    border-radius: 1%;
  }
`;

export default DatePickerField;
