import { Form, Input } from "antd";
import { SliderPicker } from "react-color";

const TagDialogForm = ({
  form,
  color,
  handleColorChange,
  layout,
  initialValues,
}) => {
  return (
    <Form
      form={form}
      layout={layout}
      name="form_in_modal"
      initialValues={initialValues}
    >
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
        <Input autoComplete="off" maxLength={20} showCount />
      </Form.Item>
      <Form.Item name="color" label="Color">
        <SliderPicker color={color} onChangeComplete={handleColorChange} />
      </Form.Item>
    </Form>
  );
};

export default TagDialogForm;
