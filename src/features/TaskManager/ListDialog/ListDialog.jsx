import { Typography, Form, Input, Space, Switch } from "antd";
import { SliderPicker } from "react-color";
const { Text } = Typography;

const ListDialogForm = ({
  color,
  handleColorChange,
  hidden,
  handleHiddenChange,
}) => {
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
      <Space align="center">
        <Form.Item name="hidden" label="Hidden">
          <Switch checked={hidden} onChange={handleHiddenChange} />
        </Form.Item>
        <Text type="secondary">
          {"If enabled, tasks in this list will not be shown in smart lists."}
        </Text>
      </Space>
    </>
  );
};

export default ListDialogForm;