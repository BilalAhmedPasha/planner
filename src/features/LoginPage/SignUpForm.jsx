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
import "./SignUpForm.css";

const StyledDiv = styled.div`
    text-align: center;
    align-items: center;
`;

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
                        prefix={<UserOutlined className="prefix__icon" />}
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
                        prefix={<MailOutlined className="prefix__icon" />}
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
                        prefix={<LockOutlined className="prefix__icon" />}
                        autoComplete="off"
                    />
                </StyledFormItem>
                {errorMessage?.length > 0 && (
                    <Alert
                        message={errorMessage}
                        type="error"
                        showIcon
                        className="alert__message"
                        closable
                        afterClose={onErrorMessageClose}
                    />
                )}
                <StyledFormItem>
                    <Button type="primary" htmlType="submit" block>
                        {"Sign Up"}
                    </Button>
                </StyledFormItem>
                <Divider plain className="divider">
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
                <StyledDiv>
                    <Typography.Text>
                        {"Have an account already?"}
                    </Typography.Text>
                    <Button
                        type="link"
                        onClick={onSignInClick}
                        className="sign__in__button"
                    >
                        {"Sign In"}
                    </Button>
                </StyledDiv>
            </div>
        </>
    );
};

export default SignUpForm;
