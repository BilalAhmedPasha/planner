import { Button, Divider, Form, Input, Layout, theme } from "antd";
import { NodeExpandOutlined } from "@ant-design/icons";
import { useState } from "react";
import SubTaskPanel from "./SubTaskPanel";
import styled from "styled-components";
import { showSubTasks } from "../../../../constants/app.constants";

const StyledFormItem = styled(Form.Item)`
  // TODO
  // margin: 0.5rem 0rem;
`;

const TaskDialogLeftPanel = ({ form, height, setDisableAddButton }) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

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

  const handleTaskNameChange = (e) => {
    form.setFieldValue("name", e.target.value);
    if (e.target.value && e.target.value.length > 0) {
      setDisableAddButton(false);
    } else {
      setDisableAddButton(true);
    }
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
        <StyledFormItem name="name" lable="Task name">
          <Input
            autoComplete="off"
            maxLength={25}
            placeholder={"Task name"}
            onInput={handleTaskNameChange}
          />
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
        {showSubTasks && (
          <>
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
              form={form}
            />
          </>
        )}
      </div>
    </Layout.Content>
  );
};

export default TaskDialogLeftPanel;
