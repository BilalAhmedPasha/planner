import { Button, Form, Input, Typography } from "antd";
import styled from "styled-components";

const StyledDiv = styled.div`
  border: 0.1px solid #bfbfbf;
  margin-top: 0.5rem;
  border-radius: 5px;
  max-height: ${(props) => props.maxHeight};
  overflow: auto;
  transition: max-height 0.8s ease-out;
`;

const StyledFormItem = styled(Form.Item)`
  margin: 0.5rem 0rem;
`;

const SubTaskPanel = ({ subTaskPanelHeight, closeSubTaskPanel }) => {
  return (
    <StyledDiv maxHeight={subTaskPanelHeight}>
      <div style={{ padding: "0rem 1rem" }}>
        <StyledFormItem
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
            bordered={false}
            placeholder={"Task name"}
            style={{ padding: "0rem" }}
          />
        </StyledFormItem>
        <StyledFormItem name="description">
          <Input.TextArea
            autoComplete="off"
            autoSize={{
              minRows: 1,
              maxRows: 3,
            }}
            maxLength={200}
            bordered={false}
            placeholder={"Description"}
            style={{ padding: "0rem" }}
          />
        </StyledFormItem>
        <div style={{ float: "right" }}>
          <Button
            type="text"
            size="small"
            style={{ marginLeft: "0.5rem" }}
            onClick={closeSubTaskPanel}
          >
            {"Cancel"}
          </Button>
          <Button
            type="primary"
            size="small"
            style={{ margin: "0.5rem" }}
            onClick={closeSubTaskPanel}
          >
            {"Add"}
          </Button>
        </div>
      </div>
    </StyledDiv>
  );
};

export default SubTaskPanel;
