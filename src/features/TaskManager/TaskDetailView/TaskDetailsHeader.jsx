import { Button, Form, Input, Space } from "antd";
import { EDIT, VIEW } from "../../../constants/formType.constants";
import {
  EditFilled,
  SaveOutlined,
  CloseOutlined,
} from "@ant-design/icons";

const TaskDetailHeader = ({ formType, setFormType, onReset }) => {
  return (
    <div
      style={{
        display: "flex",
        alignContent: "center",
        justifyContent: "space-between",
        overflowX: "auto",
        alignItems: "center",
      }}
    >
      {" "}
      <Form.Item
        name="name"
        rules={[
          {
            required: true,
            message: "Task name is required",
          },
        ]}
        style={{ height: "1rem", width: "35rem", marginRight: "1rem" }}
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
          readOnly={formType === VIEW}
          bordered={false}
        />
      </Form.Item>
      {formType === VIEW ? (
        <Space>
          <Button
            type="text"
            icon={<EditFilled />}
            onClick={() => setFormType(EDIT)}
            style={{ marginRight: "0.2rem" }}
          />
        </Space>
      ) : (
        <Space>
          <Button type="text" icon={<CloseOutlined />} onClick={onReset} />
          <Button
            type="text"
            icon={<SaveOutlined />}
            htmlType="submit"
            style={{ marginRight: "0.2rem" }}
          />
        </Space>
      )}
    </div>
  );
};

export default TaskDetailHeader;
