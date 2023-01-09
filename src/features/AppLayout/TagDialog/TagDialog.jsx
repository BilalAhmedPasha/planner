import { Form, Input } from "antd";
import { SliderPicker } from "react-color";

const TagDialogForm = ({ color, handleColorChange }) => {
  return (
    <>
      <Form.Item
        name="name"
        label="Name"
        rules={[
          {
            required: true,
            message: "Tag name is required",
          },
        ]}
      >
        <Input autoComplete="off" />
      </Form.Item>
      <Form.Item name="color" label="Color">
        <SliderPicker color={color} onChangeComplete={handleColorChange} />
      </Form.Item>
    </>
  );
};

export default TagDialogForm;
