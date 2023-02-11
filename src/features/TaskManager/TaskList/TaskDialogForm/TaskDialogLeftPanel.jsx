import { Button, Divider, Form, Input, Layout, theme } from "antd";
import { NodeExpandOutlined } from "@ant-design/icons";
import { useState } from "react";
import SubTaskPanel from "./SubTaskPanel";
import styled from "styled-components";

const StyledFormItem = styled(Form.Item)`
  // TODO
  // margin: 0.5rem 0rem;
`;

const TaskDialogLeftPanel = ({ height }) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const [subTasks, setSubTasks] = useState([]);

  const [subTaskPanelHeight, setSubTaskPanelHeight] = useState(0);
  const [disabledAddSubTask, setDisabledAddSubTask] = useState(false);

  const openSubTaskPanel = () => {
    setSubTaskPanelHeight(`${height / 3}vh`);
    setDisabledAddSubTask(true);
  };

  const closeSubTaskPanel = () => {
    setSubTaskPanelHeight(0);
    setDisabledAddSubTask(false);
  };

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
          height: `${height}vh`,
          overflowY: "auto",
          padding: "1rem 1.5rem",
        }}
      >
        <StyledFormItem
          name="name"
          rules={[
            {
              required: true,
              message: "Task name is required",
            },
          ]}
        >
          <Input autoComplete="off" maxLength={25} placeholder={"Task name"} />
        </StyledFormItem>
        <StyledFormItem name="description">
          <Input.TextArea
            autoComplete="off"
            rows={3}
            maxLength={200}
            placeholder={"Desciption"}
            autoSize={{
              minRows: 3,
              maxRows: 3,
            }}
          />
        </StyledFormItem>
        <Divider style={{ margin: "1rem 0rem" }} />
        <Button
          type="text"
          icon={<NodeExpandOutlined />}
          onClick={openSubTaskPanel}
          disabled={disabledAddSubTask}
        >
          {"Add Subtask"}
        </Button>
        <SubTaskPanel
          subTaskPanelHeight={subTaskPanelHeight}
          closeSubTaskPanel={closeSubTaskPanel}
        />
        {/* SubTasks list hersubTaskPanelHeighte */}
        {/* <div style={{ overflow: "auto", height: `${height / 2}vh` }}></div> */}
      </div>
    </Layout.Content>
  );
};

export default TaskDialogLeftPanel;
