import {
  DatePicker,
  Form,
  Input,
  InputNumber,
  Layout,
  Select,
  theme,
  TimePicker,
} from "antd";

const TaskDialogForm = ({ form, layout, initialValues }) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Form
      form={form}
      layout={layout}
      name="form_in_modal"
      initialValues={initialValues}
    >
      <Layout>
        <Layout.Sider collapsed collapsedWidth={0} />
        <Layout.Content
          style={{
            marginRight: "0.1rem",
            background: colorBgContainer,
            width: "12vw",
          }}
        >
          <div
            style={{
              height: "70vh",
              overflowY: "scroll",
              padding: "2rem 2rem",
            }}
          >
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
              <Input.TextArea autoComplete="off" rows={5} />
            </Form.Item>
          </div>
        </Layout.Content>
        <Layout.Content
          style={{
            marginLeft: "0.1rem",
            background: colorBgContainer,
          }}
        >
          <div
            style={{
              height: "70vh",
              overflowY: "scroll",
              padding: "2rem 2rem",
            }}
          >
            <Form.Item name="list" label="List">
              <Select
                options={[
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
                    value: "high",
                    label: "High",
                  },
                  {
                    value: "medium",
                    label: "Medium",
                  },
                  {
                    value: "low",
                    label: "Low",
                  },
                  {
                    value: "none",
                    label: "None",
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
            <Form.Item name="date" label="Date">
              <DatePicker format="DD-MM-YYYY" />
            </Form.Item>
            <Form.Item name="dateRange" label="Date Range">
              <DatePicker.RangePicker format="DD-MM-YYYY" />
            </Form.Item>
            <Form.Item name="duration" label="Duration">
              <TimePicker.RangePicker format="h:mm A" />
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
            <Form.Item name="endByDatePicker" label="End by Date">
              <DatePicker format="DD-MM-YYYY" />
            </Form.Item>
            <Form.Item name="endByARepeatCount" label="End by repeat count">
              <InputNumber min={2} />
            </Form.Item>
          </div>
        </Layout.Content>
      </Layout>
    </Form>
  );
};

export default TaskDialogForm;
