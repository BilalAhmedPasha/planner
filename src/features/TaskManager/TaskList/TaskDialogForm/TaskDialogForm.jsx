import { Form, Layout } from "antd";
import TaskDialogLeftPanel from "./TaskDialogLeftPanel";
import TaskDialogRightPanel from "./TaskDialogRightPanel";

const TaskDialogForm = ({ form, layout, initialValues }) => {
  return (
    <Form
      form={form}
      layout={layout}
      name="form_in_modal"
      initialValues={initialValues}
    >
      <Layout>
        <Layout.Sider collapsed collapsedWidth={0} />
        <TaskDialogLeftPanel />
        <TaskDialogRightPanel />
      </Layout>
    </Form>
  );
};

export default TaskDialogForm;
