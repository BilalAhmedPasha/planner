import { Input } from "antd";
const NumericInput = (props) => {
  const { onChange } = props;
  const handleChange = (e) => {
    const { value: inputValue } = e.target;
    const reg = /^\d*(\d*)?$/;
    if (reg.test(inputValue) || inputValue === "") {
      onChange(inputValue);
    }
  };

  return <Input {...props} onChange={handleChange} />;
};

export default NumericInput;
