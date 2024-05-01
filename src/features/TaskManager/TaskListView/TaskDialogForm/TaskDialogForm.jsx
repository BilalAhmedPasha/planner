import { Form, Layout, theme } from "antd";
import useWindowSize from "../../../../hooks/useWindowSize";
import { detailsToDrawer } from "../../../../utils/screen.utils";
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

  const screenSize = useWindowSize();
  const verticallyAlignForm = detailsToDrawer({
    currentWidth: screenSize.width,
  });

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
            marginRight: verticallyAlignForm ? "0rem" : "0.1rem",
            background: colorBgContainer,
            width: "12vw",
          }}
        >
          <TaskDialogPrimaryPanel
            form={form}
            height={72}
            smallScreen={verticallyAlignForm}
            setDisableAddButton={setDisableAddButton}
          />
          {verticallyAlignForm && (
            <TaskDialogSecondaryPanel
              form={form}
              height={72}
              smallScreen={verticallyAlignForm}
              {...props}
            />
          )}
        </Layout.Content>
        {!verticallyAlignForm && (
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
