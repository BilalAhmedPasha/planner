import { Button, Space, Typography } from "antd";
import { useEffect, useState } from "react";
import image from "../../images/backGround.jpg";
import { GoogleOutlined } from "@ant-design/icons";
import { UserAuth } from "../../context/AuthContext";
import { useHistory } from "react-router-dom";

const LoginPage = () => {
  const divStyle = {
    height: "100vh",
    backgroundImage: `url(${image})`,
    backgroundSize: "cover",
    overflow: "hidden",
  };

  const [welcomeText, setWelcomeText] = useState("");
  const fullWelcomeText = "Welcome!";
  const [welcomeIndex, setWelcomeIndex] = useState(0);

  useEffect(() => {
    if (welcomeIndex < fullWelcomeText.length) {
      setTimeout(() => {
        setWelcomeText(welcomeText + fullWelcomeText[welcomeIndex]);
        setWelcomeIndex(welcomeIndex + 1);
      }, 100);
    }
  }, [welcomeIndex, welcomeText]);

  const [loginText, selLoginText] = useState("");
  const fullLoginText = "Login to continue";
  const [loginIndex, setLoginIndex] = useState(0);

  useEffect(() => {
    if (
      loginIndex < fullLoginText.length &&
      welcomeIndex === fullWelcomeText.length
    ) {
      setTimeout(() => {
        selLoginText(loginText + fullLoginText[loginIndex]);
        setLoginIndex(loginIndex + 1);
      }, 50);
    }
  }, [loginIndex, loginText, welcomeIndex, fullWelcomeText]);

  const [showLoginButton, setShowLoginButton] = useState(0);

  useEffect(() => {
    if (loginIndex === fullLoginText.length) {
      setTimeout(() => {
        setShowLoginButton(1);
      }, 500);
    }
  }, [loginIndex, loginText]);

  const history = useHistory();
  const { googleSignIn, user } = UserAuth();
  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user !== null) {
      history.push("/tasks/inbox");
    }
  }, [history, user]);

  return (
    <div style={divStyle}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          height: "100%",
          paddingTop: "7%",
        }}
      >
        <Space direction="vertical" style={{ alignItems: "center" }}>
          <Typography.Text
            style={{
              fontFamily: "monospace",
              fontSize: "6vw",
            }}
          >
            {welcomeText}
          </Typography.Text>
          <Typography.Text
            style={{
              fontFamily: "monospace",
              fontSize: "3vw",
            }}
          >
            {loginText}
          </Typography.Text>
          <Button
            size="large"
            style={{
              opacity: showLoginButton,
              margin: "1rem",
              fontSize: "1vw",
              fontFamily: "monospace",
              fontWeight: "bold",
            }}
            type="dashed"
            icon={<GoogleOutlined />}
            onClick={handleGoogleSignIn}
          >
            {"Login with Google"}
          </Button>
        </Space>
      </div>
    </div>
  );
};

export default LoginPage;
