import { Button, Divider, Form, Input } from "antd";
import { NodeExpandOutlined } from "@ant-design/icons";
import { useState } from "react";
import SubTaskPanel from "./SubTaskPanel";
import styled from "styled-components";
import { showSubTasks } from "../../../../constants/app.constants";

const StyledFormItem = styled(Form.Item)`
`;

const StyledDivider = styled(Divider)`
    margin: 1rem 0rem;
`;

const StyledDiv = styled.div`
    overflow-y: auto;
    height: ${({ height }) => height};
    padding: ${({ padding }) => padding};
`;

const TaskDialogPrimaryPanel = ({
    form,
    height,
    smallScreen,
    setDisableAddButton,
}) => {
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
        <StyledDiv
            height={smallScreen ? "auto" : `${height}vh`}
            padding={smallScreen ? "0rem" : "1rem 1.5rem 1rem 0.5rem"}
        >
            <StyledFormItem name="name" lable="Task name">
                <Input
                    autoComplete="off"
                    maxLength={25}
                    placeholder={"Task name"}
                    onInput={handleTaskNameChange}
                    showCount
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
            <StyledDivider />
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
        </StyledDiv>
    );
};

export default TaskDialogPrimaryPanel;
