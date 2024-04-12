import { Form, Layout, theme } from "antd";
import useWindowSize from "../../../../hooks/useWindowSize";
import { taskDetailsToDrawer } from "../../../../utils/screen.utils";
import TaskDialogPrimaryPanel from "./TaskDialogPrimaryPanel";
import TaskDialogSecondaryPanel from "./TaskDialogSecondaryPanel";
import styled from "styled-components";

const StyledLayoutContent = styled(Layout.Content)`
    margin-right: ${({ marginRight }) => marginRight};
    width: 12vw;
    background: ${({ bgcolor }) => bgcolor};
`;

const StyledLayoutContentNested = styled(Layout.Content)`
    margin-leftt: ${({ marginLeft }) => marginLeft};
    background: ${({ bgcolor }) => bgcolor};
`;

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
    const verticallyAlignForm = taskDetailsToDrawer({
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
                <StyledLayoutContent
                    StyledLayoutContent
                    marginRight={verticallyAlignForm ? "0rem" : "0.1rem"}
                    bgcolor={colorBgContainer}
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
                </StyledLayoutContent>
                {!verticallyAlignForm && (
                    <StyledLayoutContentNested
                        marginLeft={"0.1rem"}
                        bgcolor={colorBgContainer}
                    >
                        <TaskDialogSecondaryPanel
                            form={form}
                            height={72}
                            {...props}
                        />
                    </StyledLayoutContentNested>
                )}
            </Layout>
        </Form>
    );
};

export default TaskDialogForm;
