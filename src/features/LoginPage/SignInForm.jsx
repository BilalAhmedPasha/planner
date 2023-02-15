import { Alert, Button, Divider, Form, Input, Typography } from "antd";
import styled from "styled-components";
import { MailOutlined, LockOutlined, GoogleOutlined } from "@ant-design/icons";
import { UserAuth } from "../../context/AuthContext";
import { useEffect, useState } from "react";
import { errorMessages } from "../../constants/error.constants";

const StyledFormItem = styled(Form.Item)`
  margin: 1.5rem 2rem;
`;

const SignInForm = ({ handleGoogleSignIn, setShowSignIn }) => {
  const { signInUserWithEmailAndPassword, forgotPassword, error } = UserAuth();

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
          setErrorMessage(errorMessages[error.code]);
        });
    } else {
      setErrorMessage("Enter an email to reset password");
    }
  };

  const onSignUpClick = () => {
    setShowSignIn(false);
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
