import { Button, Divider, Form, Input, Typography } from "antd";
import styled from "styled-components";
import { MailOutlined, LockOutlined, GoogleOutlined } from "@ant-design/icons";

const StyledFormItem = styled(Form.Item)`
  margin: 1.5rem 2rem;
`;

const SignInForm = ({ handleGoogleSignIn, setShowSignIn }) => {
  const onFinish = (values) => {
    alert("Implement email login");
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const onSignUpClick = () => {
    setShowSignIn(false);
  };

  const onForgotPassword = () => {
    alert("Implement forgot password");
  };

  return (
    <Form
      name="basic"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
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
          prefix={<MailOutlined style={{ marginRight: "0.5rem" }} />}
          style={{ marginTop: "2rem" }}
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
          prefix={<LockOutlined style={{ marginRight: "0.5rem" }} />}
        />
      </StyledFormItem>
      <StyledFormItem>
        <Button type="primary" htmlType="submit" block>
          {"Sign In"}
        </Button>
        <Button
          type="link"
          onClick={onForgotPassword}
          style={{ padding: "0rem" }}
        >
          {"Forgot Password"}
        </Button>
      </StyledFormItem>

      <Divider plain style={{ padding: "0rem 2rem" }}>
        <Typography.Text type="secondary">{"Sign in with"}</Typography.Text>
      </Divider>
      <StyledFormItem>
        <Button
          type="default"
          onClick={handleGoogleSignIn}
          block
          icon={<GoogleOutlined />}
        >
          {"Google"}
        </Button>
      </StyledFormItem>
      <StyledFormItem>
        <Button type="link" block onClick={onSignUpClick}>
          {"Sign Up for Free"}
        </Button>
      </StyledFormItem>
    </Form>
  );
};

export default SignInForm;
