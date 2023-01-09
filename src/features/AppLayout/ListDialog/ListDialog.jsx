import { Form, Input } from "antd";
import { SliderPicker } from "react-color";

const ListDialogForm = ({ color, handleColorChange }) => {
  return (
    <>
      <Form.Item
        name="name"
        label="Name"
        rules={[
          {
            required: true,
            message: "List name is required",
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

export default ListDialogForm;
