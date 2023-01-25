import { Button, Layout, Space, theme, Typography } from "antd";
import { EditFilled, SaveOutlined, CloseOutlined } from "@ant-design/icons";
import { useState } from "react";
import { EDIT, VIEW } from "../../../constants/formType.constants";
const TaskDetailsContainer = ({ taskDetails }) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const [formType, setFormType] = useState(VIEW);

  return (
    <Layout.Content
      style={{
        marginLeft: "0.1rem",
        padding: "1rem 1rem",
        background: colorBgContainer,
      }}
    >
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          height: "2.5rem",
          marginBottom: "0.5rem",
        }}
      >
        {/* <Typography.Text
          style={{
            fontWeight: "bold",
            fontSize: "24px",
          }}
        >
          {taskDetails.name}
        </Typography.Text>
        {formType === VIEW ? (
          <Button
            type="text"
            icon={<EditFilled />}
            onClick={() => setFormType(EDIT)}
          />
        ) : (
          <Space>
            <Button
              type="text"
              icon={<CloseOutlined />}
              onClick={() => setFormType(VIEW)}
            />
            <Button
              type="text"
              icon={<SaveOutlined />}
              onClick={() => setFormType(VIEW)}
            />
          </Space>
        )} */}
        <Typography.Text>Select a task to show details</Typography.Text>
      </div>
    </Layout.Content>
  );
};

export default TaskDetailsContainer;
