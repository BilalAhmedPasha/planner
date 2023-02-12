import { Form, Layout } from "antd";
import TaskDialogLeftPanel from "./TaskDialogLeftPanel";
import TaskDialogRightPanel from "./TaskDialogRightPanel";

const TaskDialogForm = ({
  form,
  layout,
  initialValues,
  setDisableAddButton,
}) => {
  return (
    <Form
      form={form}
      layout={layout}
      name="form_in_modal"
      initialValues={initialValues}
    >
      <Layout>
        <Layout.Sider collapsed collapsedWidth={0} />
        <TaskDialogLeftPanel
          form={form}
          height={72}
          setDisableAddButton={setDisableAddButton}
        />
        <TaskDialogRightPanel form={form} height={72} />
      </Layout>
    </Form>
  );
};

export default TaskDialogForm;
