import { Button, Form, Input, Select, Space, Tag, Typography } from "antd";
import { EditFilled, SaveOutlined, CloseOutlined } from "@ant-design/icons";
import { EDIT, VIEW } from "../../../constants/formType.constants";
import { useSelector } from "react-redux";
import { tagsSelector } from "../state/userTags/userTags.reducer";
import { INBOX } from "../../../constants/app.constants";
import { useMemo, useState } from "react";
import { listsSelector } from "../state/userLists/userLists.reducer";
import SelectField from "../../../components/SelectField/SelectField";
import { FlagFilled } from "@ant-design/icons";
import {
  HIGH_COLOR,
  LOW_COLOR,
  MEDIUM_COLOR,
  NONE_COLOR,
} from "../../../constants/color.constants";
import {
  HIGH,
  LOW,
  MEDIUM,
  priorityOptions,
} from "../../../constants/priority.constants";

const getPriorityColor = (event) => {
  if (event === HIGH) {
    return HIGH_COLOR;
  } else if (event === MEDIUM) {
    return MEDIUM_COLOR;
  } else if (event === LOW) {
    return LOW_COLOR;
  } else {
    return NONE_COLOR;
  }
};

const TaskDetails = ({ form, formType, setFormType }) => {
  const [priorityColor, setPriorityColor] = useState(() =>
    getPriorityColor(form.getFieldValue("priority"))
  );

  const onReset = () => {
    form.resetFields();
    setFormType(VIEW);
    setPriorityColor(getPriorityColor(form.getFieldValue("priority")));
  };

  const { lists } = useSelector(listsSelector);
  const { tags } = useSelector(tagsSelector);

  const listOptions = useMemo(() => {
    return lists.map((each) => {
      return {
        value: each.id,
        label: each.label,
        color: each.color,
      };
    });
  }, [lists]);

  const tagOptions = useMemo(() => {
    return tags.map((each) => {
      return {
        label: each.label,
        value: each.id,
      };
    });
  }, [tags]);

  const tagRender = (props) => {
    const { label, value, closable, onClose } = props;
    const color = tags.find((each) => each.id === value)?.color;
    const onPreventMouseDown = (event) => {
      event.preventDefault();
      event.stopPropagation();
    };
    return (
      <Tag
        color={color}
        onMouseDown={onPreventMouseDown}
        closable={closable}
        onClose={onClose}
        style={{
          marginRight: 3,
        }}
      >
        {label}
      </Tag>
    );
  };

  const handlePriorityColor = (event) => {
    setPriorityColor(getPriorityColor(event));
  };

  return (
    <>
      {formType === VIEW ? (
        <>
          <div
            style={{
              display: "flex",
              alignContent: "baseline",
              justifyContent: "space-between",
              height: "2.5rem",
              overflowX: "scroll",
              margin: "0rem 0.5rem",
            }}
          >
            <Typography.Text
              style={{
                fontWeight: "bold",
                fontSize: "24px",
              }}
            >
              {form.getFieldValue("name")}
            </Typography.Text>
            <Button
              type="text"
              icon={<EditFilled />}
              onClick={() => setFormType(EDIT)}
            />
          </div>
          <div>
            <Typography.Text>
              {form.getFieldValue("description")}
            </Typography.Text>
          </div>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignContent: "baseline",
              justifyContent: "space-between",
              height: "2.5rem",
              margin: "1rem 0rem",
            }}
          >
            <Typography.Text>{form.getFieldValue("listId")}</Typography.Text>
            <Select
              bordered={false}
              mode="multiple"
              disabled
              maxTagCount={2}
              maxTagTextLength={5}
              tagRender={tagRender}
            />
            <Select
              bordered={false}
              mode="multiple"
              disabled
              maxTagCount={2}
              maxTagTextLength={5}
              tagRender={tagRender}
            />
          </div>
        </>
      ) : (
        <>
          <div
            style={{
              display: "flex",
              alignContent: "baseline",
              justifyContent: "space-between",
              height: "2.5rem",
              overflowX: "scroll",
            }}
          >
            <Form.Item
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
                style={{
                  fontWeight: "bold",
                  fontSize: "24px",
                  padding: "0rem",
                  margin: "0rem",
                }}
                bordered={false}
              />
            </Form.Item>
            <Space>
              <Button type="text" icon={<CloseOutlined />} onClick={onReset} />
              <Button type="text" icon={<SaveOutlined />} htmlType="submit" />
            </Space>
          </div>
          <div
            style={{
              overflowX: "scroll",
            }}
          >
            <Form.Item name="description">
              <Input.TextArea
                autoComplete="off"
                rows={2}
                maxLength={200}
                bordered={false}
                autoSize={true}
                style={{ padding: "0rem" }}
              />
            </Form.Item>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              overflowX: "scroll",
            }}
          >
            <Form.Item name="priority">
              <Space size="small">
                <FlagFilled style={{ color: priorityColor }} />
                <SelectField
                  defaultValue={form.getFieldValue("priority")}
                  onSelect={(event) => handlePriorityColor(event)}
                  options={priorityOptions}
                  style={{ width: "6rem" }}
                  bordered={false}
                  showArrow={false}
                />
              </Space>
            </Form.Item>
            <Form.Item name="listId">
              <SelectField
                defaultValue={form.getFieldValue("listId")}
                options={[
                  {
                    value: INBOX,
                    label: "Inbox",
                  },
                  ...listOptions,
                ]}
                style={{ width: "10rem" }}
                bordered={false}
                showArrow={false}
              />
            </Form.Item>
            <Form.Item name="tagIds">
              <SelectField
                mode="multiple"
                options={tagOptions}
                maxTagCount={3}
                maxTagTextLength={8}
                tagRender={tagRender}
                defaultValue={form.getFieldValue("tagIds")}
                style={{ width: "22rem" }}
                placeholder="Select tags here"
                bordered={false}
              />
            </Form.Item>
          </div>
        </>
      )}
    </>
  );
};

export default TaskDetails;
