import { Typography, Form, Input, Space, Switch } from "antd";
import { SliderPicker } from "react-color";
const { Text } = Typography;

const ListDialogForm = ({
  form,
  color,
  handleColorChange,
  hidden,
  handleHiddenChange,
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
            message: "List name is required",
          },
        ]}
      >
        <Input autoComplete="off" />
      </Form.Item>
      <Form.Item name="color" label="Color">
        <SliderPicker color={color} onChangeComplete={handleColorChange} />
      </Form.Item>
      <Space align="center">
        <Form.Item name="hidden" label="Hidden">
          <Switch checked={hidden} onChange={handleHiddenChange} />
        </Form.Item>
        <Text type="secondary">
          {"If enabled, tasks in this list will not be shown in smart lists."}
        </Text>
      </Space>
    </Form>
  );
};

export default ListDialogForm;
