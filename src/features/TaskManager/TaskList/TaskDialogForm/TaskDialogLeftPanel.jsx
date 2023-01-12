import { Form, Input, Layout, theme } from "antd";

const TaskDialogLeftPanel = () => {
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
          height: "70vh",
          overflowY: "scroll",
          padding: "2rem 2rem",
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
          <Input.TextArea autoComplete="off" rows={5} />
        </Form.Item>
      </div>
    </Layout.Content>
  );
};

export default TaskDialogLeftPanel;
