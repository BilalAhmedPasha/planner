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
      <Form.Item
        name="progress"
        style={{
          width: "100%",
          margin: 0,
          padding: 0,
        }}
      >
        <Slider
          initialvalues={form.getFieldValue("progress")}
          trackStyle={{ height: "3px" }}
          disabled={formType === VIEW}
          tooltip={{
            open: false,
          }}
        />
      </Form.Item>

      <Form.Item
        name="description"
        style={{
          margin: "0rem 0rem 1.5rem 0rem",
        }}
      >
        <Input.TextArea
          autoComplete="off"
          maxLength={200}
          autoSize={{
            minRows: 1,
            maxRows: 3,
          }}
          placeholder="Task description"
          readOnly={formType === VIEW}
          style={{ padding: "0rem" }}
          variant="borderless"
        />
      </Form.Item>
      <div
        style={{
          display: "flex",
          overflowX: "auto",
          justifyContent: "space-between",
          marginBottom: "1rem",
          width: "100%",
        }}
      >
        <Form.Item
          name="priority"
          style={{
            marginRight: "1rem",
            marginBottom: "0.5rem",
            width: "20%",
            minWidth: "6rem",
          }}
        >
          <Select
            suffixIcon={
              <FlagFilled
                style={{
                  color: priorityColor,
                  fontSize: "1rem",
                }}
              />
            }
            initialvalues={form.getFieldValue("priority")}
            onSelect={(event) => handlePriorityColor(event)}
            options={priorityOptions}
            // disabled={formType === VIEW}
            readOnly={true}
            open={formType === VIEW ? false : undefined}
          />
        </Form.Item>
        <Form.Item
          name="listId"
          style={{
            marginRight: "1rem",
            marginBottom: "0.5rem",
            width: "35%",
            minWidth: "10rem",
          }}
        >
          <Select
            suffixIcon={
              formType === VIEW ? (
                <UnorderedListOutlined
                  style={{
                    fontSize: "1rem",
                  }}
                />
              ) : (
                <UnorderedListOutlined
                  style={{
                    fontSize: "1rem",
                    color: colorInfoText,
                  }}
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
        <Form.Item
          name="tagIds"
          style={{ marginBottom: "0.5rem", width: "45%", minWidth: "10rem" }}
        >
          <MultiSelect
            suffixIcon={
              formType === VIEW ? (
                <TagOutlined
                  style={{
                    fontSize: "1rem",
                  }}
                />
              ) : (
                <TagTwoTone
                  style={{
                    fontSize: "1rem",
                  }}
                />
              )
            }
            mode="multiple"
            options={tagOptions}
            tagRender={(props) => tagRender(formType !== VIEW, props)}
            initialvalues={form.getFieldValue("tagIds")}
            placeholder="Tags"
            showSearch={false}
            // disabled={formType === VIEW}
            open={formType === VIEW ? false : undefined}
          />
        </Form.Item>
      </div>
    </>
  );
};

export default PrimaryTaskDetails;
