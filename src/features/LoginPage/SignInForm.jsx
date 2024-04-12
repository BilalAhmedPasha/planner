import { Alert, Button, Divider, Form, Input, Typography } from "antd";
import styled from "styled-components";
import {
  MailOutlined,
  LockOutlined,
  GoogleOutlined,
  GithubOutlined,
} from "@ant-design/icons";
import { UserAuth } from "../../context/AuthContext";
import { useState } from "react";
import { errorMessagesMap } from "../../constants/error.constants";

const StyledFormItem = styled(Form.Item)`
  margin: 1.5rem 2rem;
`;

const SignInForm = ({ setShowSignIn, errorMessage, setErrorMessage }) => {
  const {
    googleSignIn,
    githubSignIn,
    signInUserWithEmailAndPassword,
    forgotPassword,
  } = UserAuth();

  const onFinish = (values) => {
    const email = values.email;
    const password = values.password;
    if (email && password) {
      signInUserWithEmailAndPassword(email, password);
    }
  };

  const [form] = Form.useForm();

  const [passwordResetSuccessMessage, setPasswordResetSuccessMessage] =
    useState("");

  const onPasswordResetMessageClose = () => {
    setPasswordResetSuccessMessage("");
  };

  const onForgotPassword = () => {
    const email = form.getFieldValue("email");
    if (email) {
      forgotPassword(email)
        .then(() => {
          setPasswordResetSuccessMessage(
            "Password reset link is sent to your email"
          );
        })
        .catch((error) => {
          if (error) {
            setErrorMessage(errorMessagesMap[error.code]);
          }
        });
    } else {
      setErrorMessage("Enter an email to reset password");
    }
  };

  const onSignUpClick = () => {
    setShowSignIn(false);
  };

  const onErrorMessageClose = () => {
    setErrorMessage("");
  };

  return (
    <Form form={form} name="signInForm" onFinish={onFinish} autoComplete="off">
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
          prefix={<LockOutlined style={{ marginRight: "0.5rem" }} />}
          autoComplete="off"
        />
      </StyledFormItem>
      {passwordResetSuccessMessage?.length > 0 && (
        <Alert
          message={passwordResetSuccessMessage}
          type="success"
          showIcon
          style={{ margin: "1.5rem 2rem" }}
          closable
          afterClose={onPasswordResetMessageClose}
        />
      )}
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
      <StyledFormItem>
        <Button type="link" block onClick={onSignUpClick}>
          {"Sign Up for Free"}
        </Button>
      </StyledFormItem>
    </Form>
  );
};

export default SignInForm;
