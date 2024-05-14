import { Form, Input, Slider } from "antd";
import { VIEW } from "../../../constants/formType.constants";

const PrimaryDetails = ({
  form,
  formType,
}) => {
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
          railSize="3"
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
    </>
  );
};

export default PrimaryDetails;
