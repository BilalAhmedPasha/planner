import { DatePicker, Form, Input, Layout, Select, TimePicker } from "antd";

const TaskDialogForm = ({ form, layout, initialValues }) => {
  return (
    <Form
      form={form}
      layout={layout}
      name="form_in_modal"
      initialValues={initialValues}
    >
      <Layout
        style={{
          height: "75vh",
          overflowY: "scroll",
          padding: "1rem 2rem 1rem 2rem",
        }}
      >
        <Layout.Content>
          <Form.Item
            name="name"
            label="Name"
            rules={[
              {
                required: true,
                message: "Task name is required",
              },
            ]}
          >
            <Input autoComplete="off" />
          </Form.Item>
          <Form.Item name="description" label="Desciption">
            <Input.TextArea autoComplete="off" rows={2} />
          </Form.Item>
          <Form.Item
            name="list"
            label="List"
            rules={[
              {
                required: true,
                message: "List name is required",
              },
            ]}
          >
            <Select
              options={[
                {
                  value: "inbox",
                  label: "Inbox",
                },
              ]}
            />
          </Form.Item>
          <Form.Item name="tag" label="Tags">
            <Select
              mode="multiple"
              allowClear
              options={[
                {
                  value: "lucy",
                  label: "Lucy",
                },
                {
                  value: "inbox",
                  label: "Inbox",
                },
              ]}
            />
          </Form.Item>
          <Form.Item name="priority" label="Priority">
            <Select
              options={[
                {
                  value: "p1",
                  label: "High",
                },
                {
                  value: "p2",
                  label: "Medium",
                },
                {
                  value: "p3",
                  label: "Low",
                },
                {
                  value: "p4",
                  label: "None",
                },
              ]}
            />
          </Form.Item>
          <Form.Item name="date" label="Date">
            <DatePicker format="DD-MM-YYYY" />
          </Form.Item>
          <Form.Item name="duration" label="Duration">
            <TimePicker.RangePicker use12Hours={true} format="HH:mm A" />
          </Form.Item>
          <Form.Item name="repeat" label="Repeat">
            <Select
              allowClear
              options={[
                {
                  value: "daily",
                  label: "Daily",
                },
                {
                  value: "weekly",
                  label: "Weekly",
                },
                {
                  value: "monthly",
                  label: "Monthly",
                },
              ]}
            />
          </Form.Item>
          <Form.Item name="endBy" label="End by">
            <Select
              options={[
                {
                  value: "endless",
                  label: "EndLess",
                },
                {
                  value: "endByDate",
                  label: "End by a date",
                },
                {
                  value: "endByARepeatCount",
                  label: "End by a repeat count",
                },
              ]}
            />
          </Form.Item>
        </Layout.Content>
      </Layout>
    </Form>
  );
};

export default TaskDialogForm;
