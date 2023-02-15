import { Alert, Button, Divider, Form, Input, Typography } from "antd";
import styled from "styled-components";
import {
  UserOutlined,
  MailOutlined,
  LockOutlined,
  GoogleOutlined,
} from "@ant-design/icons";
import { UserAuth } from "../../context/AuthContext";
import { useEffect, useState } from "react";
import { errorMessages } from "../../constants/error.constants";

const StyledFormItem = styled(Form.Item)`
  margin: 1.5rem 2rem;
`;

const SignUpForm = ({ handleGoogleSignIn, setShowSignIn }) => {
  const { registerUserWithEmailAndPassword, error } = UserAuth();

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

  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (error) {
      setErrorMessage(errorMessages[error.code]);
    }
  }, [error]);

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
            prefix={<UserOutlined style={{ marginRight: "0.5rem" }} />}
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
        <div style={{ textAlign: "center", alignItems: "center" }}>
          <Typography.Text>{"Have an account already?"}</Typography.Text>
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
