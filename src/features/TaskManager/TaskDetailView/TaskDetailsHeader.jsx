import { Button, Form, Input, Space } from "antd";
import { EDIT, VIEW } from "../../../constants/formType.constants";
import {
  EditFilled,
  SaveOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import styled from "styled-components";
import "./css/TaskDetailsHeader.css"

const StyledDiv = styled.div`
    display: flex;
    align-content: center;
    justify-content: space-between;
    overflow-x: auto;
    align-items: center;
`;

const TaskDetailHeader = ({ formType, setFormType, onReset }) => {
  return (
      <StyledDiv>
          <Form.Item
              name="name"
              rules={[
                  {
                      required: true,
                      message: "Task name is required",
                  },
              ]}
              className="form__item__name"
          >
              <Input
                  autoComplete="off"
                  maxLength={25}
                  className="input__field"
                  readOnly={formType === VIEW}
                  variant="borderless"
              />
          </Form.Item>
          {formType === VIEW ? (
              <Space>
                  <Button
                      type="text"
                      icon={<EditFilled />}
                      onClick={() => setFormType(EDIT)}
                      className="margin__right"
                  />
              </Space>
          ) : (
              <Space>
                  <Button
                      type="text"
                      icon={<CloseOutlined />}
                      onClick={onReset}
                  />
                  <Button
                      type="text"
                      icon={<SaveOutlined />}
                      htmlType="submit"
                      className="margin__right"
                  />
              </Space>
          )}
      </StyledDiv>
  );
};

export default TaskDetailHeader;
