import { Form, Input, Select, Slider, theme } from "antd";
import { VIEW } from "../../../constants/formType.constants";
import { priorityOptions } from "../../../constants/priority.constants";
import { INBOX } from "../../../constants/app.constants";
import {
    UnorderedListOutlined,
    FlagFilled,
    TagTwoTone,
    TagOutlined,
} from "@ant-design/icons";
import styled from "styled-components";
import "./css/PrimaryTaskDetails.css";

const StyledFlagFilled = styled(FlagFilled)`
    font-size: 1rem;
    color: ${({ color }) => color};
`;

const StyledUnorderedListOutlined1 = styled(UnorderedListOutlined)`
    font-size: 1rem;
`;

const StyledUnorderedListOutlined2 = styled(UnorderedListOutlined)`
    font-size: 1rem;
    color: ${({ color }) => color};
`;

const StyledTagOutlined = styled(TagOutlined)`
    font-size: 1rem;
`;

const StyledTagTwoTone = styled(TagTwoTone)`
    font-size: 1rem;
`;

const StyledDiv = styled.div`
    display: flex;
    overflow-x: auto;
    justify-content: space-between;
    margin-bottom: 1rem;
    width: 100%;
`;

const MultiSelect = styled(Select)`
    .ant-select-selection-overflow {
        display: flex;
        flex-wrap: nowrap;
        max-width: 95%;
        overflow: auto;
    }
`;
const PrimaryTaskDetails = ({
    form,
    formType,
    handlePriorityColor,
    priorityColor,
    listOptions,
    tagOptions,
    tagRender,
}) => {
    const {
        token: { colorInfoText },
    } = theme.useToken();

    return (
        <>
            <Form.Item name="progress" className="slider__form__item">
                <Slider
                    initialvalues={form.getFieldValue("progress")}
                    railSize="3"
                    disabled={formType === VIEW}
                    tooltip={{
                        open: false,
                    }}
                />
            </Form.Item>

            <Form.Item name="description" className="description__form__item">
                <Input.TextArea
                    autoComplete="off"
                    maxLength={200}
                    autoSize={{
                        minRows: 1,
                        maxRows: 3,
                    }}
                    placeholder="Task description"
                    readOnly={formType === VIEW}
                    className="input__text__area"
                    variant="borderless"
                />
            </Form.Item>
            <StyledDiv>
                <Form.Item name="priority" className="priority__form__item">
                    <Select
                        suffixIcon={<StyledFlagFilled color={priorityColor} />}
                        initialvalues={form.getFieldValue("priority")}
                        onSelect={(event) => handlePriorityColor(event)}
                        options={priorityOptions}
                        // disabled={formType === VIEW}
                        readOnly={true}
                        open={formType === VIEW ? false : undefined}
                    />
                </Form.Item>
                <Form.Item name="listId" className="list__id__form__item">
                    <Select
                        suffixIcon={
                            formType === VIEW ? (
                                <StyledUnorderedListOutlined1 />
                            ) : (
                                <StyledUnorderedListOutlined2
                                    color={colorInfoText}
                                />
                            )
                        }
                        initialvalues={form.getFieldValue("listId")}
                        options={[
                            {
                                value: INBOX,
                                label: "Inbox",
                            },
                            ...listOptions,
                        ]}
                        // disabled={formType === VIEW}
                        open={formType === VIEW ? false : undefined}
                    />
                </Form.Item>
                <Form.Item name="tagIds" className="tag__id__form__item">
                    <MultiSelect
                        suffixIcon={
                            formType === VIEW ? (
                                <StyledTagOutlined />
                            ) : (
                                <StyledTagTwoTone />
                            )
                        }
                        mode="multiple"
                        options={tagOptions}
                        tagRender={(props) =>
                            tagRender(formType !== VIEW, props)
                        }
                        initialvalues={form.getFieldValue("tagIds")}
                        placeholder="Tags"
                        showSearch={false}
                        // disabled={formType === VIEW}
                        open={formType === VIEW ? false : undefined}
                    />
                </Form.Item>
            </StyledDiv>
        </>
    );
};

export default PrimaryTaskDetails;
