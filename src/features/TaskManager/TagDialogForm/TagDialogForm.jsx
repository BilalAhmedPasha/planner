import { Form, Input } from "antd";
import { SliderPicker } from "react-color";

const TagDialogForm = ({ color, handleColorChange, layout, initialValues }) => {
  const [form] = Form.useForm();
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
        <Input autoComplete="off" />
      </Form.Item>
      <Form.Item name="color" label="Color">
        <SliderPicker color={color} onChangeComplete={handleColorChange} />
      </Form.Item>
    </Form>
  );
};

export default TagDialogForm;
