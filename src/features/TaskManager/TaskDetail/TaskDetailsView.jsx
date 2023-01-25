import { Button, Space, Typography } from "antd";
import { EditFilled, SaveOutlined, CloseOutlined } from "@ant-design/icons";
import { useState } from "react";
import { EDIT, VIEW } from "../../../constants/formType.constants";

const TaskDetailsView = ({ taskDetails }) => {
  const [formType, setFormType] = useState(VIEW);

  return (
    <>
      <Typography.Text
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
      )}
    </>
  );
};

export default TaskDetailsView;
