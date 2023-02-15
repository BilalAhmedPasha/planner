import { Button, Divider, Form, Input, Typography } from "antd";
import styled from "styled-components";
import {
  UserOutlined,
  MailOutlined,
  LockOutlined,
  GoogleOutlined,
} from "@ant-design/icons";

const StyledFormItem = styled(Form.Item)`
  margin: 1.5rem 2rem;
`;

const SignUpForm = ({ handleGoogleSignIn, setShowSignIn }) => {
  const onFinish = (values) => {
     alert("Implement email sign up");
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const onSignInClick = () => {
    setShowSignIn(true);
  };

  return (
    <>
      <Form
        name="basic"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <StyledFormItem name="username">
          <Input
            size="large"
            prefix={<UserOutlined style={{ marginRight: "0.5rem" }} />}
            placeholder="Username (optional)"
            style={{ marginTop: "2rem" }}
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
            prefix={<MailOutlined style={{ marginRight: "0.5rem" }} />}
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
            {"Sign Up"}
          </Button>
        </StyledFormItem>
        <Divider plain style={{ padding: "0rem 2rem" }}>
          <Typography.Text type="secondary">{"Sign up with"}</Typography.Text>
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
      </Form>
      <div>
        <div style={{ textAlign: "center" }}>
          <Typography.Text>{"Have an account already?"}</Typography.Text>
          <Button type="link" onClick={onSignInClick}>
            {"Sign In"}
          </Button>
        </div>
      </div>
    </>
  );
};

export default SignUpForm;
