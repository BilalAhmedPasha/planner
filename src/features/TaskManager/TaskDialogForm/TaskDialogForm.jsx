import { Form, Layout, theme } from "antd";
import { isOnSmallScreen } from "../../../utils/app.utils";
import TaskDialogPrimaryPanel from "./TaskDialogPrimaryPanel";
import TaskDialogSecondaryPanel from "./TaskDialogSecondaryPanel";

const TaskDialogForm = ({
  form,
  layout,
  initialValues,
  setDisableAddButton,
  ...props
}) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const smallScreen = isOnSmallScreen();

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
            marginRight: smallScreen ? "0rem" : "0.1rem",
            background: colorBgContainer,
            width: "12vw",
          }}
        >
          <TaskDialogPrimaryPanel
            form={form}
            height={72}
            smallScreen={smallScreen}
            setDisableAddButton={setDisableAddButton}
          />
          {smallScreen && (
            <TaskDialogSecondaryPanel
              form={form}
              height={72}
              smallScreen={smallScreen}
              {...props}
            />
          )}
        </Layout.Content>
        {!smallScreen && (
          <Layout.Content
            style={{
              marginLeft: "0.1rem",
              background: colorBgContainer,
            }}
          >
            <TaskDialogSecondaryPanel form={form} height={72} {...props} />
          </Layout.Content>
        )}
      </Layout>
    </Form>
  );
};

export default TaskDialogForm;
