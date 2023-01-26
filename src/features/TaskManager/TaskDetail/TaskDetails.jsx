import { Button, Form, Input, Layout, theme, Typography } from "antd";
import { EditFilled, SaveOutlined, CloseOutlined } from "@ant-design/icons";
import { EDIT, VIEW } from "../../../constants/formType.constants";

const TaskDetails = ({ form, formType, setFormType }) => {
  const onReset = () => {
    form.resetFields();
    setFormType(VIEW);
  };
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <>
      {formType === VIEW ? (
        <Layout
          style={{
            background: colorBgContainer,
          }}
        >
          <Layout.Content>
            {/* <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignContent: "baseline",
                justifyContent: "space-between",
                height: "2.5rem",
                marginBottom: "0.5rem",
              }}
            >
              <Typography.Text
                style={{
                  fontWeight: "bold",
                  fontSize: "24px",
                }}
              >
                {form.getFieldValue("name")}
              </Typography.Text>
              <Button
                type="text"
                icon={<EditFilled />}
                onClick={() => setFormType(EDIT)}
              />
            </div>
            <Typography.Text>
              {form.getFieldValue("description")}
            </Typography.Text>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignContent: "baseline",
                justifyContent: "space-between",
                height: "2.5rem",
                marginBottom: "0.5rem",
              }}
            >
              <Typography.Text>{form.getFieldValue("listId")}</Typography.Text>
            </div> */}
            <Typography.Text>{form.getFieldValue("listId")}</Typography.Text>
          </Layout.Content>
          <Layout.Footer >Footer</Layout.Footer>
        </Layout>
      ) : (
        <>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignContent: "baseline",
              justifyContent: "space-between",
              height: "2.5rem",
              marginBottom: "0.5rem",
            }}
          >
            <Form.Item
              name="name"
              rules={[
                {
                  required: true,
                  message: "Task name is required",
                },
              ]}
            >
              <Input
                autoComplete="off"
                maxLength={25}
                style={{
                  fontWeight: "bold",
                  fontSize: "24px",
                  padding: "0rem",
                  margin: "0rem",
                }}
                bordered={false}
              />
            </Form.Item>
            <div>
              <Button type="text" icon={<CloseOutlined />} onClick={onReset} />
              <Button type="text" icon={<SaveOutlined />} htmlType="submit" />
            </div>
          </div>
          <Form.Item name="description">
            <Input.TextArea
              autoComplete="off"
              rows={2}
              maxLength={200}
              style={{
                padding: "0rem",
                margin: "0rem",
              }}
              bordered={false}
              autoSize={true}
            />
          </Form.Item>
        </>
      )}
    </>
  );
};

export default TaskDetails;
