import { Alert, Button, Divider, Form, Input, Typography } from "antd";
import styled from "styled-components";
import {
    UserOutlined,
    MailOutlined,
    LockOutlined,
    GoogleOutlined,
    GithubOutlined,
} from "@ant-design/icons";
import { UserAuth } from "../../context/AuthContext";

const StyledFormItem = styled(Form.Item)`
    margin: 1.5rem 2rem;
`;

const SignUpForm = ({ setShowSignIn, errorMessage, setErrorMessage }) => {
    const { googleSignIn, githubSignIn, registerUserWithEmailAndPassword } =
        UserAuth();

    const onFinish = (values) => {
        const name = values.username;
        const email = values.email;
        const password = values.password;
        if (name && email && password) {
            registerUserWithEmailAndPassword(name, email, password);
        }
    };

    const onSignInClick = () => {
        setShowSignIn(true);
    };

    const onErrorMessageClose = () => {
        setErrorMessage("");
    };

    return (
        <>
            <Form name="signUpForm" onFinish={onFinish} autoComplete="off">
                <StyledFormItem
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: "User name can't be empty",
                        },
                    ]}
                >
                    <Input
                        size="large"
                        placeholder="User name"
                        prefix={
                            <UserOutlined style={{ marginRight: "0.5rem" }} />
                        }
                        style={{ marginTop: "2rem" }}
                        autoComplete="off"
                    />
                </StyledFormItem>
                <StyledFormItem
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: "Email address can't be empty",
                        },
                    ]}
                >
                    <Input
                        size="large"
                        placeholder="Email"
                        prefix={
                            <MailOutlined style={{ marginRight: "0.5rem" }} />
                        }
                        autoComplete="off"
                    />
                </StyledFormItem>
                <StyledFormItem
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: "Password can't be empty",
                        },
                    ]}
                >
                    <Input.Password
                        size="large"
                        placeholder="Password"
                        prefix={
                            <LockOutlined style={{ marginRight: "0.5rem" }} />
                        }
                        autoComplete="off"
                    />
                </StyledFormItem>
                {errorMessage?.length > 0 && (
                    <Alert
                        message={errorMessage}
                        type="error"
                        showIcon
                        style={{ margin: "1.5rem 2rem" }}
                        closable
                        afterClose={onErrorMessageClose}
                    />
                )}
                <StyledFormItem>
                    <Button type="primary" htmlType="submit" block>
                        {"Sign Up"}
                    </Button>
                </StyledFormItem>
                <Divider plain style={{ padding: "0rem 2rem" }}>
                    <Typography.Text type="secondary">
                        {"Sign up with"}
                    </Typography.Text>
                </Divider>
                <StyledFormItem>
                    <Button
                        type="default"
                        onClick={googleSignIn}
                        block
                        icon={<GoogleOutlined />}
                    >
                        {"Google"}
                    </Button>
                </StyledFormItem>
                <StyledFormItem>
                    <Button
                        type="default"
                        onClick={githubSignIn}
                        block
                        icon={<GithubOutlined />}
                    >
                        {"Github"}
                    </Button>
                </StyledFormItem>
            </Form>
            <div>
                <div style={{ textAlign: "center", alignItems: "center" }}>
                    <Typography.Text>
                        {"Have an account already?"}
                    </Typography.Text>
                    <Button
                        type="link"
                        onClick={onSignInClick}
                        style={{ paddingLeft: "0.5rem" }}
                    >
                        {"Sign In"}
                    </Button>
                </div>
            </div>
        </>
    );
};

export default SignUpForm;
