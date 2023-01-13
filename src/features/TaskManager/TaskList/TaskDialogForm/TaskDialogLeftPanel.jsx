import { Form, Input, Layout, theme } from "antd";

const TaskDialogLeftPanel = ({ height }) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout.Content
      style={{
        marginRight: "0.1rem",
        background: colorBgContainer,
        width: "12vw",
      }}
    >
      <div
        style={{
          height: height,
          overflowY: "scroll",
          padding: "1rem 1.5rem",
        }}
      >
        <Form.Item
          name="name"
          label="Name"
          rules={[
            {
              required: true,
              message: "Task name is required",
            },
          ]}
        >
          <Input autoComplete="off" />
        </Form.Item>
        <Form.Item name="description" label="Desciption">
          <Input.TextArea autoComplete="off" rows={3} />
        </Form.Item>
      </div>
    </Layout.Content>
  );
};

export default TaskDialogLeftPanel;
